import type { Section, Question } from "./types"


const questions = [
  {
    id: 301,
    question: "Which actor voiced Bowser in 'The Super Mario Bros. Movie' (2023)?",
    answers: ["Jack Black", "Seth Rogen", "Chris Pratt", "Jason Momoa"],
    correctAnswer: "Jack Black",
  },
  {
    id: 302,
    question: "Which singer's 2023 album is titled 'Did You Know That There's a Tunnel Under Ocean Blvd'?",
    answers: ["Lana Del Rey", "Billie Eilish", "Grimes", "FKA Twigs"],
    correctAnswer: "Lana Del Rey",
  },
  {
    id: 303,
    question: "Which TV show holds the record for most Emmy wins of all time?",
    answers: ["Game of Thrones", "Saturday Night Live", "Breaking Bad", "The Simpsons"],
    correctAnswer: "Saturday Night Live",
  },
  {
    id: 304,
    question: "Who played Elvis Presley in the 2022 biopic 'Elvis'?",
    answers: ["Austin Butler", "Miles Teller", "Ansel Elgort", "Timothée Chalamet"],
    correctAnswer: "Austin Butler",
  },
  {
    id: 305,
    question: "Which K-pop girl group released the 2022 hit 'Pink Venom'?",
    answers: ["BLACKPINK", "TWICE", "NewJeans", "Red Velvet"],
    correctAnswer: "BLACKPINK",
  },
  {
    id: 306,
    question: "What is the real name of rapper Doja Cat?",
    answers: ["Amala Dlamini", "Dana Owens", "Belcalis Almanzar", "Melissa Jefferson"],
    correctAnswer: "Amala Dlamini",
  },
  {
    id: 307,
    question: "Which film won the Golden Lion at the Venice Film Festival in 2023?",
    answers: ["Poor Things", "The Whale", "The Zone of Interest", "Anatomy of a Fall"],
    correctAnswer: "Poor Things",
  },
  {
    id: 308,
    question: "Which country won the 2023 Rugby World Cup?",
    answers: ["South Africa", "New Zealand", "France", "Ireland"],
    correctAnswer: "South Africa",
  },
  {
    id: 309,
    question: "Who was the first woman to score in a Formula 1 Grand Prix?",
    answers: ["Lella Lombardi", "Susie Wolff", "Maria Teresa de Filippis", "Danica Patrick"],
    correctAnswer: "Lella Lombardi",
  },
  {
    id: 310,
    question: "Which tennis Grand Slam is played on clay courts?",
    answers: ["Australian Open", "Wimbledon", "US Open", "French Open"],
    correctAnswer: "French Open",
  },
  {
    id: 311,
    question: "Who holds the record for the most goals scored in a single FIFA World Cup tournament?",
    answers: ["Just Fontaine", "Miroslav Klose", "Ronaldo", "Kylian Mbappé"],
    correctAnswer: "Just Fontaine",
  },
  {
    id: 312,
    question: "Which country hosted the first ever Olympic Games?",
    answers: ["Greece", "France", "United Kingdom", "Germany"],
    correctAnswer: "Greece",
  },
  {
    id: 313,
    question: "Which cricket team won the inaugural ICC World Test Championship in 2021?",
    answers: ["India", "Australia", "England", "New Zealand"],
    correctAnswer: "New Zealand",
  },
  {
    id: 314,
    question: "Who won the 2023 Tour de France Femmes?",
    answers: ["Annemiek van Vleuten", "Demi Vollering", "Elisa Longo Borghini", "Marianne Vos"],
    correctAnswer: "Demi Vollering",
  },
  {
    id: 315,
    question: "Which country is home to the highest number of active volcanoes?",
    answers: ["Indonesia", "Japan", "Iceland", "Italy"],
    correctAnswer: "Indonesia",
  },
  {
    id: 316,
    question: "What is the capital of Eritrea?",
    answers: ["Asmara", "Kampala", "Addis Ababa", "Khartoum"],
    correctAnswer: "Asmara",
  },
  {
    id: 317,
    question: "Which is the longest river entirely in Europe?",
    answers: ["Volga", "Danube", "Rhine", "Dniester"],
    correctAnswer: "Volga",
  },
  {
    id: 318,
    question: "What is the official language of Bhutan?",
    answers: ["Dzongkha", "Nepali", "Hindi", "Tibetan"],
    correctAnswer: "Dzongkha",
  },
  {
    id: 319,
    question: "Mount Vinson is the highest peak on which continent?",
    answers: ["Antarctica", "Australia", "South America", "Asia"],
    correctAnswer: "Antarctica",
  },
  {
    id: 320,
    question: "Which African country is the world’s largest producer of cocoa?",
    answers: ["Ivory Coast", "Ghana", "Nigeria", "Cameroon"],
    correctAnswer: "Ivory Coast",
  },
  {
    id: 321,
    question: "What is the name of the desert that spans much of southern Mongolia and northern China?",
    answers: ["Gobi", "Taklamakan", "Karakum", "Thar"],
    correctAnswer: "Gobi",
  },
  {
    id: 322,
    question: "Which element has the highest melting point?",
    answers: ["Tungsten", "Carbon", "Iron", "Platinum"],
    correctAnswer: "Tungsten",
  },
  {
    id: 323,
    question: "Which British author created the 'Discworld' series?",
    answers: ["Terry Pratchett", "Douglas Adams", "J.K. Rowling", "Neil Gaiman"],
    correctAnswer: "Terry Pratchett",
  },
  {
    id: 324,
    question: "Which philosopher wrote 'Being and Time'?",
    answers: ["Martin Heidegger", "Friedrich Nietzsche", "Immanuel Kant", "Jean-Paul Sartre"],
    correctAnswer: "Martin Heidegger",
  },
  {
    id: 325,
    question: "What is the term for a word that is its own antonym?",
    answers: ["Contronym", "Palindrome", "Anagram", "Homonym"],
    correctAnswer: "Contronym",
  },
  {
    id: 326,
    question: "What was the first synthetic plastic ever created?",
    answers: ["Bakelite", "Nylon", "PVC", "Celluloid"],
    correctAnswer: "Bakelite",
  },
  {
    id: 327,
    question: "Which metal is liquid at room temperature?",
    answers: ["Mercury", "Gallium", "Cesium", "All of the above"],
    correctAnswer: "All of the above",
  },
  {
    id: 328,
    question: "Which ancient civilization built Machu Picchu?",
    answers: ["Inca", "Aztec", "Maya", "Olmec"],
    correctAnswer: "Inca",
  },
  {
    id: 329,
    question: "What is the name of the protein that carries oxygen in the blood?",
    answers: ["Hemoglobin", "Myosin", "Insulin", "Keratin"],
    correctAnswer: "Hemoglobin",
  },
  {
    id: 330,
    question: "In computing, what does GPU stand for?",
    answers: ["Graphics Processing Unit", "General Processing Unit", "Graphical Protocol Utility", "Grid Processing Unit"],
    correctAnswer: "Graphics Processing Unit",
  },
  {
    id: 331,
    question: "Which ocean has the deepest point on Earth?",
    answers: ["Pacific", "Atlantic", "Indian", "Southern"],
    correctAnswer: "Pacific",
  },
  {
    id: 332,
    question: "What is the name of the world's first cloned mammal?",
    answers: ["Dolly", "Polly", "Molly", "Bessie"],
    correctAnswer: "Dolly",
  },
  {
    id: 333,
    question: "In what year did the Berlin Wall fall?",
    answers: ["1989", "1991", "1987", "1993"],
    correctAnswer: "1989",
  },
  {
    id: 334,
    question: "Which mathematician is considered the 'father of computer science'?",
    answers: ["Alan Turing", "John von Neumann", "Charles Babbage", "Isaac Newton"],
    correctAnswer: "Alan Turing",
  },
  {
    id: 335,
    question: "Which gas makes up about 78% of Earth's atmosphere?",
    answers: ["Nitrogen", "Oxygen", "Carbon Dioxide", "Argon"],
    correctAnswer: "Nitrogen",
  },
  {
    id: 336,
    question: "Which artist painted 'The Persistence of Memory'?",
    answers: ["Salvador Dalí", "Pablo Picasso", "Joan Miró", "René Magritte"],
    correctAnswer: "Salvador Dalí",
  },
  {
    id: 337,
    question: "Which constellation contains the star Betelgeuse?",
    answers: ["Orion", "Cassiopeia", "Leo", "Ursa Major"],
    correctAnswer: "Orion",
  },
  {
    id: 338,
    question: "What is the rarest blood type?",
    answers: ["AB negative", "O negative", "A positive", "B positive"],
    correctAnswer: "AB negative",
  },
  {
    id: 339,
    question: "Which planet has the most moons?",
    answers: ["Saturn", "Jupiter", "Uranus", "Neptune"],
    correctAnswer: "Saturn",
  },
  {
    id: 340,
    question: "What is the mathematical term for a six-sided polygon?",
    answers: ["Hexagon", "Heptagon", "Pentagon", "Octagon"],
    correctAnswer: "Hexagon",
  },
  {
    id: 341,
    question: "What is the term for animals that are active during twilight?",
    answers: ["Crepuscular", "Nocturnal", "Diurnal", "Matutinal"],
    correctAnswer: "Crepuscular",
  },
  {
    id: 342,
    question: "Which country invented paper?",
    answers: ["China", "Egypt", "India", "Greece"],
    correctAnswer: "China",
  },
  {
    id: 343,
    question: "What is the SI unit of electrical resistance?",
    answers: ["Ohm", "Ampere", "Volt", "Watt"],
    correctAnswer: "Ohm",
  },
  {
    id: 344,
    question: "Which classical composer became deaf later in life?",
    answers: ["Ludwig van Beethoven", "Wolfgang Amadeus Mozart", "Johann Sebastian Bach", "Franz Schubert"],
    correctAnswer: "Ludwig van Beethoven",
  },
  {
    id: 345,
    question: "What is the largest internal organ in the human body?",
    answers: ["Liver", "Brain", "Lungs", "Heart"],
    correctAnswer: "Liver",
  }
]


export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getRandomQuestions(array: any[]) {
  shuffleArray(array);
  return array.slice(0, 2);
}


export function generateQuestions(): Question[] {
  return getRandomQuestions(questions).map(q => {
    const scrambled = [...q.answers];
    shuffleArray(scrambled);

    return {
      ...q,
      answers: scrambled
    }
  });

}

// Function to generate a new question of similar difficulty
export function generateSimilarQuestion(
  gameQuestions: Question[]): Question {
  const currentIds = gameQuestions.map(question => question.id);
  const alternativeQuestions = questions
    .filter(question => currentIds.includes(question.id) === false);

  shuffleArray(alternativeQuestions);

  return alternativeQuestions.slice(0, 1)[0];
}
