export interface TimelineMemory {
  id: string;
  date: string;
  title: string;
  text: string;
  image: string;
  buttonText?: string;
  hiddenMessage?: string;
  hasBathtubEasterEgg?: boolean;
  bathtubMessage?: string;
}

export interface PhotoItem {
  id: string;
  src: string;
  caption?: string;
  rotation?: number;
  aspectRatio?: 'portrait' | 'landscape' | 'square';
}

export interface StoryData {
  names: {
    boyfriend: string;
    nickname: string;
    girlfriend: string;
  };
  boot: {
    title: string;
    subtitle: string;
    steps: string[];
    systemReady: string;
    welcome: string;
    enterButton: string;
  };
  hero: {
    title: string;
    introLines: string[];
    startButton: string;
    mainImage: string;
  };
  music: {
    title: string;
    artist: string;
    src: string;
    cover: string;
    promptText: string;
    promptButton: string;
  };
  navigation: {
    label: string;
    targetId: string;
  }[];
  timeline: {
    sectionTitle: string;
    sectionSubtitle: string;
    memories: TimelineMemory[];
  };
  nimuPhotos: {
    sectionTitle: string;
    sectionSubtitle: string;
    photos: PhotoItem[];
  };
  usPhotos: {
    sectionTitle: string;
    sectionSubtitle: string;
    compileButton: string;
    buildSteps: string[];
    buildCompleteText: string;
    photos: PhotoItem[];
  };
  easterEggs: {
    console: {
      greeting: string;
      codeVariable: string;
    };
    keyboard: {
      triggerWords: string[];
      command: string;
      status: string;
      welcome: string;
      message: string;
    };
    heart: {
      clicksNeeded: number;
      message: string;
    };
  };
  emotionalTransition: {
    line1: string;
    line2: string;
  };
  loveLetter: {
    title: string;
    paragraphs: string[];
  };
  proposal: {
    introLines: string[];
    question: string;
    buttons: {
      yes1: string;
      yes2: string;
    };
  };
  success: {
    asciiBox: string;
    headline: string;
    congratulations: string;
    version: string;
    note: string;
  };
  finalScreen: {
    heading: string;
    nextMemoryLabel: string;
    loadingText: string;
    finale: string;
  };
}

export const storyData: StoryData = {
  names: {
    boyfriend: "Raj",
    nickname: "Nimu",
    girlfriend: "Me",
  },

  boot: {
    title: "nimu.exe",
    subtitle: "initializing...",
    steps: [
      "loading memories............. OK",
      "loading inside jokes........ OK",
      "loading embarrassing moments OK",
      "loading photographs......... OK",
      "loading music............... OK",
      "loading us.................. OK",
    ],
    systemReady: "SYSTEM READY",
    welcome: "> welcome, Nimu.",
    enterButton: "ENTER →",
  },

  hero: {
    title: "Hey Nimu… 💛",
    introLines: [
      "I made something for you.",
      "Not a project.",
      "Not an assignment.",
      "Something a little more important.",
    ],
    startButton: "START OUR STORY →",
    mainImage: "/images/main-us.jpg",
  },

  music: {
    title: "Our Song",
    artist: "Nimu × Me",
    src: "/audio/our-song.mp3",
    cover: "/images/song-cover.jpg",
    promptText: "I picked a song for you. 🎵",
    promptButton: "PLAY OUR SONG 💛",
  },

  navigation: [
    { label: "OUR STORY", targetId: "story" },
    { label: "NIMU", targetId: "nimu" },
    { label: "US", targetId: "us" },
    { label: "LETTER", targetId: "letter" },
    { label: "THE QUESTION", targetId: "question" },
  ],

  timeline: {
    sectionTitle: "Our little story 💛",
    sectionSubtitle: "A few moments that somehow became some of my favourite memories.",
    memories: [
      {
        id: "mem-01",
        date: "13 February",
        title: "The day we met",
        text: "I had no idea that it would turn out the way it did.\n\nI just wanted to meet you before you went home...\n\nbut somehow, it turned into something much more than that. 💛",
        image: "/images/memories/first-meeting.jpg",
      },
      {
        id: "mem-02",
        date: "1 March",
        title: "Our first hug, cuddle & kiss ❤️",
        text: "It was supposed to be a movie date...\n\nbut it turned into the first time we hugged, cuddled, and had our first kiss.\n\nAnd honestly...\n\nI'm really glad the movie wasn't the only thing memorable that day. 🫣",
        image: "/images/memories/first-hug.jpg",
      },
      {
        id: "mem-03",
        date: "13 March",
        title: "The Most Dangerous Trip — Alibagh 😂",
        text: "Well...\n\nI don't think I should write anything here.\n\nSome memories are better left between the two people who lived them. 😂\n\nBut I will never forget that beach.",
        image: "/images/memories/alibagh.jpg",
        buttonText: "YOU HAD TO BE THERE 😂",
        hiddenMessage: "Okay fine... that beach, the crazy waves, the sheer unpredictability, and laughing until our stomachs hurt. Absolutely unhinged, completely unforgettable. 🌊😂💛",
      },
      {
        id: "mem-04",
        date: "25 May",
        title: "Hanuman Tikdi",
        text: "Even though we were there with our friends, sitting together and seeing the night lights somehow made it special to me. 🌃💛",
        image: "/images/memories/hanuman-tikdi.jpg",
      },
      {
        id: "mem-05",
        date: "30 May",
        title: "My Birthday 🎂",
        text: "I know it was a stressful day for you and you got overwhelmed...\n\nbut I was completely at peace seeing you there and watching you take care of me.\n\nI'll always remember that. 💛",
        image: "/images/memories/birthday.jpg",
      },
      {
        id: "mem-06",
        date: "Special Day",
        title: "Symbiii Tekadi",
        text: "That day we planned on doing nothing...\n\nbut somehow we couldn't just keep our hands off each other. 😂❤️\n\nSo much for the “doing nothing” plan.",
        image: "/images/memories/symbiii.jpg",
      },
      {
        id: "mem-07",
        date: "23 August",
        title: "The day you got your first gift 🎁",
        text: "I had no idea that you'd never received a gift before and that it was your first time getting a gift...\n\nbut I loved seeing that version of you. 🥹💛",
        image: "/images/memories/first-gift.jpg",
      },
      {
        id: "mem-08",
        date: "17–18 September",
        title: "You & Me at your place 🏡",
        text: "Yes, the date was pushed forward.\n\nYes, my hormones were challenged A LOT before these two days. 😂\n\nBut you know what?\n\nThese two days are the best days of my life and I'll always remember them.\n\nAlso...\n\nnot gonna lie...\n\nI liked bathing toooo. 👀😂",
        image: "/images/memories/at-your-place.jpg",
        hasBathtubEasterEgg: true,
        bathtubMessage: "okay okay... you found that one. 😂",
      },
    ],
  },

  nimuPhotos: {
    sectionTitle: "Just Nimu 💛",
    sectionSubtitle: "Because apparently one picture of you was never going to be enough.",
    photos: [
      {
        id: "nimu-01",
        src: "/images/nimu/01.jpg",
        caption: "my favourite face",
        rotation: -2.5,
        aspectRatio: "portrait",
      },
      {
        id: "nimu-02",
        src: "/images/nimu/02.jpg",
        caption: "how are you this cute?",
        rotation: 2.2,
        aspectRatio: "square",
      },
      {
        id: "nimu-03",
        src: "/images/nimu/03.jpg",
        caption: "professional troublemaker",
        rotation: -1.8,
        aspectRatio: "portrait",
      },
      {
        id: "nimu-04",
        src: "/images/nimu/04.jpg",
        caption: "Nimu being Nimu",
        rotation: 3.1,
        aspectRatio: "square",
      },
      {
        id: "nimu-05",
        src: "/images/nimu/05.jpg",
        caption: "okay fine, you look good here",
        rotation: -2.8,
        aspectRatio: "portrait",
      },
      {
        id: "nimu-06",
        src: "/images/nimu/06.jpg",
        caption: "boyfriend material 🤌💛",
        rotation: 1.9,
        aspectRatio: "portrait",
      },
    ],
  },

  usPhotos: {
    sectionTitle: "Us 🫶",
    sectionSubtitle: "Just some of my favourite pictures of us.",
    compileButton: "COMPILE US 💛",
    buildSteps: [
      "resolving memories...",
      "optimizing inside jokes...",
      "linking heartbeats...",
      "building relationship...",
    ],
    buildCompleteText: "BUILD SUCCESSFUL\n\n❤️ us",
    photos: [
      { id: "us-01", src: "/images/us/01.jpg", caption: "Our smiles when we're together", rotation: -3 },
      { id: "us-02", src: "/images/us/02.jpg", caption: "Golden hour and you", rotation: 2.5 },
      { id: "us-03", src: "/images/us/03.jpg", caption: "Twin energy unlocked", rotation: -1.5 },
      { id: "us-04", src: "/images/us/04.jpg", caption: "My safe place in the whole world", rotation: 3.2 },
      { id: "us-05", src: "/images/us/05.jpg", caption: "Making every regular day memorable", rotation: -2.2 },
      { id: "us-06", src: "/images/us/06.jpg", caption: "You + Me forever", rotation: 1.8 },
      { id: "us-07", src: "/images/us/07.jpg", caption: "Soft moments I'll never forget", rotation: -2.7 },
      { id: "us-08", src: "/images/us/08.jpg", caption: "Looking forward to what comes next", rotation: 2.1 },
    ],
  },

  easterEggs: {
    console: {
      greeting: "💛 Hey Nimu.\n\nIf you're reading this...\n\nYes.\n\nI knew you'd open the console.\n\nI made this specifically for you. :)",
      codeVariable: 'const question = "Will you be my boyfriend?";',
    },
    keyboard: {
      triggerWords: ["sudo", "nimu", "dev"],
      command: "sudo access --nimu",
      status: "ACCESS GRANTED.",
      welcome: "welcome, boyfriend_candidate_01",
      message: "You found the secret.\n\nOf course you did.\n\nYou're a programmer. 🙄💛",
    },
    heart: {
      clicksNeeded: 7,
      message: "Okay Nimu...\n\nyou really clicked that THAT many times? 😂",
    },
  },

  emotionalTransition: {
    line1: "Okay Nimu...",
    line2: "Enough messing around.",
  },

  loveLetter: {
    title: "A little something I wanted to tell you 💛",
    paragraphs: [
      "Some memories become special because of what happened.",
      "But some become special because of who you experienced them with.",
      "And somewhere between our conversations, stupid jokes, random adventures, hugs, kisses, travelling, taking care of each other and all the little moments...",
      "you became someone incredibly special to me.",
      "I don't know exactly when it happened.",
      "I just know that now, when I think about some of my favourite moments, you're somehow there in almost all of them.",
      "And I want a lot more of those moments.",
      "With you. 💛",
    ],
  },

  proposal: {
    introLines: [
      "Nimu...",
      "We've already made so many memories.",
      "And I really want to know what the next chapter looks like.",
    ],
    question: "Will you be my boyfriend? 💛",
    buttons: {
      yes1: "YES, OBVIOUSLY 💛",
      yes2: "YESSSSS 😭",
    },
  },

  success: {
    asciiBox: `╔════════════════════════════╗\n║                            ║\n║       BUILD SUCCESSFUL     ║\n║                            ║\n║       ❤️ NIMU + ME ❤️      ║\n║                            ║\n║       STATUS: OFFICIAL     ║\n║                            ║\n╚════════════════════════════╝`,
    headline: "HE SAID YESSSSS 😭💛",
    congratulations: "Congratulations, Nimu.\n\nYou are officially my boyfriend.",
    version: "Version 1.0 deployed successfully.",
    note: "But don't worry...\n\nthere are still a lot of updates coming.",
  },

  finalScreen: {
    heading: "Our story isn't finished yet.",
    nextMemoryLabel: "Next memory:",
    loadingText: "Loading...",
    finale: "You + Me + whatever comes next. 💛",
  },
};
