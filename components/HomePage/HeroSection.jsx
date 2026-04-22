import React, { useState, useEffect, useMemo, useRef } from "react";
import { FaEthereum } from "react-icons/fa";
import { SiTether } from "react-icons/si";
import { IoWalletOutline } from "react-icons/io5";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { BsFillInfoCircleFill, BsCurrencyDollar } from "react-icons/bs";
import { RiUsdCircleFill } from "react-icons/ri";
import { CustomConnectButton } from "../index";
import { useWeb3 } from "../../context/Web3Provider";
import { ethers } from "ethers";

const TOKEN_NAME = process.env.NEXT_PUBLIC_TOKEN_NAME;
const TOKEN_SYMBOL = process.env.NEXT_PUBLIC_TOKEN_SYMBOL;
const TOKEN_SUPPLY = process.env.NEXT_PUBLIC_TOKEN_SUPPLY;
const PER_TOKEN_USD_PRICE = process.env.NEXT_PUBLIC_PER_TOKEN_USD_PRICE;
const NEXT_PER_TOKEN_USD_PRICE =
  process.env.NEXT_PUBLIC_NEXT_PER_TOKEN_USD_PRICE;
const CURRENCY = process.env.NEXT_PUBLIC_CURRENCY;
const BLOCKCHAIN = process.env.NEXT_PUBLIC_BLOCKCHAIN;

const HeroSection = ({ isDarkMode, setIsReferralPopupOpen }) => {
  const {
    account,
    isConnected,
    contractInfo,
    tokenBalances,
    buyToken,
    addTokenToMetaMask,
  } = useWeb3();

  const [selectedToken, setSelectedToken] = useState("POL");
  const [inputAmount, setInputAmount] = useState("0");
  const [tokenAmount, setTokenAmount] = useState("0");
  const [hasSufficientBalance, setHasSufficientBalance] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [hasAttemptedRegistration, setHasAttemptedRegistration] =
    useState(false);

  const canvasRef = useRef(null);
  const particlesRef = useRef([]);
  const animationRef = useRef(null);

  //Calculate progress percentage based on sold tokens vs total supply
  const calculateProgressPercentage = () => {
    //Check for required data
    if (!contractInfo?.totalSold || !contractInfo?.tbcBalance) {
      return 0;
    }

    //Conversion of string values to numbers
    const totalSold = parseFloat(contractInfo.totalSold);
    const tbcBalance = parseFloat(contractInfo.tbcBalance);

    //Calculate total supply (sold + available balance)
    const totalSupply = totalSold + tbcBalance;
    const percentage = (totalSold / totalSupply) * 100;

    return isNaN(percentage)
      ? 0
      : Math.min(parseFloat(percentage.toFixed(2)), 100);
  };

  //Price calculations to avoid recalculations
  const prices = useMemo(() => {
    const defaultEthPrice = contractInfo?.ethPrice;
    let ethPrice;

    try {
      if (contractInfo?.ethPrice) {
        if (
          typeof contractInfo.ethPrice === "object" &&
          contractInfo.ethPrice._isBigNumber
        ) {
          ethPrice = contractInfo.ethPrice;
        } else {
          ethPrice = ethers.parseEther(contractInfo.ethPrice.toString());
        }
      } else {
        ethPrice = ethers.parseEther(defaultEthPrice);
      }
    } catch (error) {
      console.error("Error parsing prices:", error);
      ethPrice = ethers.parseEther(defaultEthPrice);
    }

    return { ethPrice };
  }, [contractInfo]);

  //Loading as components mount
  useEffect(() => {
    setIsLoading(true);

    //Timeout to hide the loader after 3 seconds
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  //Enough balance
  useEffect(() => {
    if (!isConnected || !tokenBalances) {
      setHasSufficientBalance(false);
      return;
    }

    //Threshold
    const lowTokenSupply = parseFloat(tokenBalances?.tbcBalance || "0") < 20;

    if (lowTokenSupply) {
      setHasSufficientBalance(false);
      return;
    }

    const inputAmountFloat = parseFloat(inputAmount) || 0;
    let hasBalance = false;

    switch (selectedToken) {
      case "POL":
        const ethBalance = parseFloat(tokenBalances?.userEthBalance || "0");
        hasBalance = ethBalance >= inputAmountFloat && inputAmountFloat > 0;
        break;

      default:
        hasBalance = false;
    }

    setHasSufficientBalance(hasBalance);
  }, [isConnected, inputAmount, selectedToken, tokenBalances]);

  //Token amount based on input amount and selected token
  const calculateTokenAmount = (amount, token) => {
    if (isNaN(parseFloat(amount)) || parseFloat(amount) <= 0) return "0";

    let calculatedAmount;
    try {
      switch (token) {
        case "POL":
          //ETH Value to Tokens
          const amountInWei = ethers.parseEther(amount);
          const tokensPerEth = ethers.formatEther(prices.ethPrice);
          calculatedAmount = parseFloat(amount) / parseFloat(tokensPerEth);
          break;
        default:
          calculatedAmount = 0;
      }
    } catch (error) {
      console.error("Error calculating token amount:", error);
      calculatedAmount = 0;
    }

    return calculatedAmount.toFixed(2);
  };

  //Input amount changes
  const handleAmountChange = (value) => {
    setInputAmount(value);
    setTokenAmount(calculateTokenAmount(value, selectedToken));
  };

  //Token selection change
  const handleTokenSelection = (token) => {
    setSelectedToken(token);
    setTokenAmount(calculateTokenAmount(inputAmount, token));
  };

  //Execute Purchase
  const executePurchase = async () => {
    if (!isConnected) {
      alert("Please connect your wallet first!");
      return;
    }

    if (parseFloat(inputAmount) <= 0) {
      alert("Amount must be greater than 0");
      return;
    }

    if (!hasSufficientBalance) {
      if (parseFloat(tokenBalances?.fsxBalance || "0") < 20) {
        alert("Insufficient token supply. Please try again later.");
      } else {
        alert(`Insufficient ${selectedToken} balance`);
      }
      return;
    }

    try {
      let tx;
      console.log(`Buying with ${inputAmount} ${selectedToken}`);

      switch (selectedToken) {
        case "POL":
          tx = await buyToken(inputAmount);
          break;
        default:
          alert("Please select a token to purchase with");
          return;
      }

      console.log(tx);
      console.log(
        `Successfully purchased ${tokenAmount} ${TOKEN_SYMBOL} tokens!`,
      );

      //Reset input fields
      setInputAmount("0");
      setTokenAmounts("0");
    } catch (error) {
      console.error(`Error buying ${selectedToken}:`, error);
      alert("Transaction failed.Please try again!");
    }
  };

  //Get current balance
  const getCurrentBalance = () => {
    if (!tokenBalance) return "0";

    switch (selectedToken) {
      case "POL":
        return tokenBalances?.userEthBalance || 0;
        break;
      default:
        return "0";
    }
  };

  //Button state determination
  const getButtonMessage = () => {
    if (inputAmount === "0" || inputAmount === "") {
      return "ENTER AMOUNT";
    }
    if (parseFloat(tokenBalances?.tbcBalance || "0") < 20) {
      return "INSUFFICIENT TOKEN SUPPLY";
    }

    return hasSufficientBalance
      ? `BUY ${TOKEN_SYMBOL}`
      : `INSUFFICIENT ${selectedToken} BALANCE`;
  };

  //Get token icon
  const getTokenIcon = (token) => {
    switch (token) {
      case "POL":
        return <img scrc="./polygon.svg" className="w-5 h-5" alt="polygon" />;
        break;
      default:
        return null;
    }
  };

  //Theme variables
  const bgColor = isDarkMode ? "bg-[#0E0B12]" : "bg-[#F5F7FA]";
  const textColor = isDarkMode ? "text-white" : "text-gray-800";
  const secondaryTextColor = isDarkMode ? "text-gray-400" : "text-gray-600";
  const cardBg = isDarkMode ? "bg-[#13101A]" : "bg-white/95";
  const cardBorder = isDarkMode ? "border-gray-800/30" : "border-gray-100";
  const inputBg = isDarkMode
    ? "bg-gray-900/60 border-gray-800/50"
    : "bg-gray-100 border-gray-200/70";
  const primaryGradient = "from-fuchsia-500 to-purple-600";
  const primaryGradientHover = "from-fuchisa-600 to-purple-700";
  const accentColor = "text-[#7765F3]";

  //Token Button Styling

  //Update buttons
  const getTokenButtonStyle = (token) => {
    const isSelected = selectedToken === token;
    const baseClasses =
      "flex-1 flex items-center justify-center rounded-lg py-2.5 transition-all duration-300";

    if (isSelected) {
      let selectedColorClass;
      switch (token) {
        case "POL":
          selectedColorClass =
            "bg-gradient-to-r from-fuchsia-500 to-purple-600 hover:from-fuchsia-600 hover:to-purple-700 text-white";
          break;
        default:
          selectedColorClass = "";
      }
      return `${baseClasses} ${selectedColorClass} text-white shadow-lg`;
    }
    return `${baseClasses} ${isDarkMode ? "bg-gray-800/40 hover:bg-gray-800/60 text-gray-300" : "bg-gray-200 hover:bg-gray-300 text-gray-700"}`;
  };

  //Particle animation effect
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    const particleCount = 70;
    const baseColor = { r: 189, g: 38, b: 211 };

    //Full width
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = canvas.parentElement.offsetHeight;
    };

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    //Mouse Interactions
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseX = e.clientX - rect.left;
      mouseY = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", handleMouseMove);

    //Perspective settings
    const perspective = 400;
    const focalLength = 300;

    //3D Particles
    particlesRef.current = Array(particleCount)
      .fill()
      .map(() => ({
        x: Math.random() * canvas.width - canvas.width / 2,
        y: Math.random() * canvas.height - canvas.height / 2,
        z: Math.random() * 1000,
        size: Math.random() * 4 + 2,
        baseSize: Math.random() * 4 + 2,
        speedX: Math.random() * 0.5 - 0.25,
        speedY: Math.random() * 0.5 - 0.25,
        speedZ: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.3,
      }));

    //3D Animation
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      //Depth rendering
      const sortedParticles = [...particlesRef.current].sort(
        (a, b) => a.z - b.z,
      );

      //Updating and drawing particles
      sortedParticles.forEach((particle) => {
        //Mouse influence
        const mouseInfluenceX =
          (mouseX - canvas.width / 2 - particle.x) * 0.0001;
        const mouseInfluenceY =
          (mouseY - canvas.height / 2 - particle.y) * 0.0001;

        //Update position
        particle.x += particle.speedX + mouseInfluenceX;
        particle.y += particle.speedY + mouseInfluenceY;
        particle.z += particle.speedZ;

        if (particle.z < -focalLength) {
          particle.z = Math.random() * 1000;
          particle.x = Math.random() * canvas.width - canvas.width / 2;
          particle.y = Math.random() * canvas.height - canvas.height / 2;
        }

        //3D projection
        const scale = focalLength / (focalLength + particle.z);
        const x2d = particle.x * scale + canvas.width / 2;
        const y2d = particle.y * scale + canvas.height / 2;
        const scaledSize = particle.baseSize * scale;

        //Depth color
        const distance = 1 - Math.min(particle.z / 1000, 1);
        const opacity = particle.opacity * distance;

        //Color variation
        const colorVariation = Math.max(0.6, distance);
        const r = Math.floor(baseColor.r * colorVariation);
        const g = Math.floor(baseColor.g * colorVariation);
        const b = Math.floor(baseColor.b * colorVariation);

        //Draw particles
        ctx.beginPath();
        ctx.arc(x2d, y2d, scaledSize, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${opacity})`;
        ctx.fill();

        //Glow Effect
        if (distance > 0.8) {
          ctx.beginPath();
          ctx.arc(x2d, y2d, scaledSize * 1.5, 0, Math.PI * 2);
        }
      });

      animationRef.current = requestAnimationFrame(animate);
    };
    animate();

    //Cleanup
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener("resize", resizeCanvas);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [isDarkMode]);

  return (
    <div className={`relative mt-12 w-full overflow-hidden ${bgColor}`}>
      {/* Background with glowing animation pattern */}
      <div className="absolute inset-0 z-0">
        {/* Gradient overlay */}
        <div
          className={`absolute inset-0 ${
            isDarkMode
              ? "bg-gradient-to-b from-[#0E0B12] via-transparent to-[#0E0B12]/80"
              : "bg-gradient-to-b from-[#f3f3f7]/80 via-transparent to-[#f3f3f7]"
          }`}
        ></div>
        <canvas
          ref={canvasRef}
          className="absolute top-0 left-0 w-full h-full pointer-events-none z-10"
          style={{ zIndex: 1 }}
        />
        {/* Animated glowing grid pattern */}
        <div className="absolute inset-0 grid-pattern"></div>

        {/* Moving light effects */}
        <div className="absolute inset-0 light-rays">
          <div className="light-ray ray1"></div>
          <div className="light-ray ray2"></div>
          <div className="light-ray ray3"></div>
        </div>
      </div>
      {/* Main content */}
      <div className="container mx-auto px-4 py-28 md:py-32 relative z-10">
        <div
          className="flex flex-col md:flex-row items-center justify-between
        gap-12 md:gap-16"
        >
          {/* Left side content - Text and graphics */}
          <div
            className="w-full md:w-1/2 flex flex-col items-center
          md:items-start text-center md:text-left"
          >
            {/* Header Content */}
            <div
              className="inline-block p-2 px-4 rounded-full bg-gradient-to-r
            from-teal-400/0 to-indigo-500/10 mb-6"
            >
              <p
                className="text-sm font-medium bg-clip-text text-transparent
              bg-gradient-to-r from-fuchsia-500 to-purple-600 animate-gradient-x"
              >
                Presale Now Live.
              </p>
            </div>

            <h1
              className={`text-4xl md:text-5xl lg:text-6xl font-bold ${textColor}
            mb-4`}
            >
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r 
              from-fuchsia-500 to-purple-600 animate-gradient-x"
              >
                {TOKEN_NAME}
              </span>
            </h1>

            <h2 className="text-2xl md:text-3xl font-bold mb-6">
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r 
              from-fuchisa-500 to-purple-600 animate-gradient-x"
              >
                Token
              </span>
              <span
                className="bg-clip-text text-transparent bg-gradient-to-r
              from-indigo-500 to-purple-600"
              >
                {" "}
              </span>
              <span className={textColor}>Stage 1</span>
            </h2>
            <p
              className={`${secondaryTextColor} text-base md:text-lg max-w-md
            mb-8 leading-relaxed`}
            >
              Revolutionizing agriculture through decentralized innovation. Join
              the future of blockchain technology today.
            </p>

            {/* Feature highlights */}
            <div className="flex flex-wrap gap-4 mb-8">
              <div
                className={`px-4 py-2 rounded-full ${
                  isDarkMode ? "bg-teal-500/10" : "bg-teal-100"
                } ${
                  isDarkMode ? "text-fuchsia-500" : "text-teal-700"
                } text-sm font-medium flex items-center`}
              >
                Limited Presale
              </div>
              <div
                className={`px-4 py-2 rounded-full ${
                  isDarkMode ? "bg-indigo-500/10" : "bg-indigo-100"
                } ${
                  isDarkMode ? "text-indigo-300" : "text-indigo-700"
                } text-sm font-medium flex items-center`}
              >
                Exclusive Benefits
              </div>
            </div>

            {/* Background decorative elements */}
          </div>
        </div>
      </div>
    </div>
  );
};
