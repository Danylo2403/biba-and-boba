import React, { useRef, useState } from "react";
import "./style.css";

export default function App() {
  const heartRef = useRef(null);
  const messagesContainer = useRef(null);

  const [clickCount, setClickCount] = useState(0);
  const [specialShown, setSpecialShown] = useState(false);
  const [princessShown, setPrincessShown] = useState(false);

  const heartColors = [
    "#ff4b5c",
    "#ff66b3",
    "#ff9ecd",
    "#ff6b81",
    "#ff99cc",
    "#f368e0",
    "#ff3f34",
    "#ff5e78",
    "#ff7fa8",
    "#18dcff",
  ];

  const phrases = [
    "Ты моё солнце ☀️",
    "Ты - смысл моих дней 💕",
    "С тобой всё прекрасно 🌸",
    "Моё сердце только твоё ❤️",
    "Ты - чудо, о котором я мечтал 💫",
    "Моя вселенная начинается с тебя 🌎",
    "Ты делаешь мир ярче 🌈",
    "Я скучаю, даже когда рядом 🥺",
    "Ты - мой дом 🏡",
    "Я люблю тебя сильнее с каждым днём 💖",
  ];

  // створення випадкової фрази на екрані
  const createRandomPhrase = () => {
    const phrase = document.createElement("div");
    phrase.className = "floating-text";
    phrase.innerText = phrases[Math.floor(Math.random() * phrases.length)];
    phrase.style.left = Math.random() * 80 + "%";
    phrase.style.top = Math.random() * 80 + "%";
    phrase.style.fontSize = Math.random() * 12 + 18 + "px";
    messagesContainer.current.appendChild(phrase);
    setTimeout(() => phrase.remove(), 4000);
  };

  // спеціальний великий напис у центрі
  const showSpecialText = (text) => {
    const special = document.createElement("div");
    special.className = "special-text";
    special.innerText = text;
    document.body.appendChild(special);

    setTimeout(() => special.classList.add("show"), 50);
    setTimeout(() => special.classList.add("hide"), 2500);
    setTimeout(() => special.remove(), 4000);
  };

  // зміна кольору серця
  const changeHeartColor = () => {
    const heart = heartRef.current;
    const color1 = heartColors[Math.floor(Math.random() * heartColors.length)];
    const color2 = heartColors[Math.floor(Math.random() * heartColors.length)];
    heart.style.setProperty("--heart-color1", color1);
    heart.style.setProperty("--heart-color2", color2);
    heart.style.filter = `drop-shadow(0 0 40px ${color1}80)`;
    heart.style.transition = "filter 0.6s ease";
  };

  // головна функція натискання
  const handleClick = () => {
    const heart = heartRef.current;
    const newCount = clickCount + 1; // нове значення одразу
    setClickCount(newCount);

    // анімація натискання
    heart.style.transform = "scale(1.25)";
    setTimeout(() => (heart.style.transform = "scale(1)"), 200);

    changeHeartColor();

    // створення бульбашок 💗
    for (let i = 0; i < 10; i++) {
      const bubble = document.createElement("div");
      bubble.className = "bubble";
      const color = heartColors[Math.floor(Math.random() * heartColors.length)];
      bubble.style.background = color;
      bubble.style.boxShadow = `0 0 20px ${color}aa`;
      const angle = Math.random() * Math.PI * 2;
      const radius = 100 + Math.random() * 60;
      const x = Math.cos(angle) * radius + "px";
      const y = Math.sin(angle) * radius + "px";
      const x2 = Math.cos(angle) * (radius + 30) + "px";
      const y2 = Math.sin(angle) * (radius + 30) + "px";
      bubble.style.setProperty("--x", x);
      bubble.style.setProperty("--y", y);
      bubble.style.setProperty("--x2", x2);
      bubble.style.setProperty("--y2", y2);
      const rect = heart.getBoundingClientRect();
      bubble.style.left = rect.left + rect.width / 2 + "px";
      bubble.style.top = rect.top + rect.height / 2 + "px";
      document.body.appendChild(bubble);
      setTimeout(() => bubble.remove(), 1600);
    }

    // показ особливих текстів у певні моменти
    if (newCount === 5 && !specialShown) {
      setSpecialShown(true);
      showSpecialText("Моя принцесса 👑 моя жизнь 💗");
    } else if (newCount === 10 && !princessShown) {
      setPrincessShown(true);
      showSpecialText("Я тебя очень сильно люблю, бусинка 💖");
    } else {
      createRandomPhrase();
    }
  };

  return (
    <div className="stage" id="stage">
      <div className="messages" ref={messagesContainer}>
        <div className="msg m1">Я тебя ♥️ люблю</div>
        <div className="msg m2">Ты моё счастье 💖</div>
        <div className="msg m3">Люблю тебя навсегда 💞</div>
        <div className="msg m4 small">Ты - моё солнце ☀️</div>
        <div className="msg m5 small">Ты мой смысл 💕</div>
        <div className="msg m6 small">Ты самая красивая 🌸</div>
        <div className="msg m7 small">Ты - моё всё 💫</div>
        <div className="msg m8 small">Ты у меня одна 💌</div>
        <div className="msg m9 small">Ты в моём сердце 💓</div>
        <div className="msg m10 small">Я без тебя не могу 🥺</div>
        <div className="msg m11 small">Моя нежность 💗</div>
        <div className="msg m12 small">Ты - мечта, ставшая реальностью ✨</div>
        <div className="msg m13 small">Моё сокровище 💎</div>
      </div>

      <div
        className="heart"
        ref={heartRef}
        title="Нажми на меня ❤️"
        onClick={handleClick}
      ></div>

      <div className="caption">
        Для тебя — просто открой сердце и улыбнись 💌
      </div>

      <div className="particles" id="particles"></div>
      <div className="final-msg" id="finalMsg"></div>
    </div>
  );
}
