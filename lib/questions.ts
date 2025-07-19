import type { Question } from "./types"

const similarQuestions = [
  // Sri Lanka (9)
  { id: 2091, question: "Which Sri Lankan mountain is sacred to multiple religions and known for the 'Sri Pada' footprint?", answers: ["Knuckles", "Hanthana", "Pidurutalagala", "Adam's Peak"], correctAnswer: "Adam's Peak" },
  { id: 2092, question: "Which famous Sri Lankan beach town is known for stilt fishing?", answers: ["Mirissa", "Trincomalee", "Unawatuna", "Weligama"], correctAnswer: "Weligama" },
  { id: 2093, question: "The 'Yala' national park is best known for its population of which animal?", answers: ["Elephants", "Leopards", "Sloth Bears", "Crocodiles"], correctAnswer: "Leopards" },
  { id: 2094, question: "Which ancient Sri Lankan king is credited with building Sigiriya?", answers: ["Parakramabahu I", "Kashyapa I", "Vijayabahu I", "Dutugemunu"], correctAnswer: "Kashyapa I" },
  { id: 2095, question: "Which popular pilgrimage destination is on an island in the Jaffna Peninsula?", answers: ["Nallur", "Nagadeepa", "Delft Island", "Kadurugoda"], correctAnswer: "Nagadeepa" },
  { id: 2096, question: "What is the name of the tea-growing region often called 'Little England'?", answers: ["Ella", "Badulla", "Hatton", "Nuwara Eliya"], correctAnswer: "Nuwara Eliya" },
  { id: 2097, question: "Which Sri Lankan leader was assassinated by a suicide bomber in 1993?", answers: ["J. R. Jayewardene", "Ranasinghe Premadasa", "S. W. R. D. Bandaranaike", "Gamini Dissanayake"], correctAnswer: "Ranasinghe Premadasa" },
  { id: 2098, question: "What is the name of the annual Buddhist procession held in Kandy?", answers: ["Vesak", "Perahera", "Poson", "Esala Perahera"], correctAnswer: "Esala Perahera" },
  { id: 2099, question: "What is the term for the traditional Sri Lankan drum used in Kandyan dance?", answers: ["Udukkai", "Geta Beraya", "Thammattama", "Mridangam"], correctAnswer: "Geta Beraya" },

  // New Zealand (6)
  { id: 2100, question: "Which New Zealand wine region is famous for Sauvignon Blanc?", answers: ["Hawke’s Bay", "Central Otago", "Marlborough", "Wairarapa"], correctAnswer: "Marlborough" },
  { id: 2101, question: "Which New Zealand volcano erupted in 2019 causing multiple fatalities?", answers: ["Mount Ruapehu", "White Island", "Mount Ngauruhoe", "Mount Taranaki"], correctAnswer: "White Island" },
  { id: 2102, question: "Which New Zealand city is nicknamed 'The Garden City'?", answers: ["Auckland", "Wellington", "Christchurch", "Dunedin"], correctAnswer: "Christchurch" },
  { id: 2103, question: "Which New Zealander won the Nobel Prize in Chemistry in 1908?", answers: ["Alan MacDiarmid", "Ernest Rutherford", "Maurice Wilkins", "William Pickering"], correctAnswer: "Ernest Rutherford" },
  { id: 2104, question: "The All Blacks perform which traditional war dance before matches?", answers: ["Māori Haka", "Poi", "Kapa Haka", "Kī-o-Rahi"], correctAnswer: "Māori Haka" },
  { id: 2105, question: "Lake Taupō is situated in which island of New Zealand?", answers: ["South Island", "North Island", "Stewart Island", "Waiheke Island"], correctAnswer: "North Island" },

  // General Knowledge (15)
  { id: 2106, question: "What is the chemical symbol for gold?", answers: ["Au", "Ag", "Gd", "Go"], correctAnswer: "Au" },
  { id: 2107, question: "Which planet has the most moons?", answers: ["Earth", "Jupiter", "Saturn", "Uranus"], correctAnswer: "Saturn" },
  { id: 2108, question: "Which literary work is the origin of the phrase 'Big Brother is watching you'?", answers: ["Brave New World", "1984", "Animal Farm", "Fahrenheit 451"], correctAnswer: "1984" },
  { id: 2109, question: "Which Greek god is associated with the sun?", answers: ["Zeus", "Apollo", "Ares", "Hermes"], correctAnswer: "Apollo" },
  { id: 2110, question: "Which natural number has no Roman numeral?", answers: ["0", "1", "50", "100"], correctAnswer: "0" },
  { id: 2111, question: "Which is the largest desert in the world?", answers: ["Sahara", "Gobi", "Antarctic", "Arabian"], correctAnswer: "Antarctic" },
  { id: 2112, question: "Which philosopher wrote 'The Republic'?", answers: ["Socrates", "Aristotle", "Plato", "Descartes"], correctAnswer: "Plato" },
  { id: 2113, question: "Which artist painted 'The School of Athens'?", answers: ["Raphael", "Michelangelo", "Da Vinci", "Botticelli"], correctAnswer: "Raphael" },
  { id: 2114, question: "Which gas makes up most of the Earth’s atmosphere?", answers: ["Oxygen", "Nitrogen", "Carbon Dioxide", "Hydrogen"], correctAnswer: "Nitrogen" },
  { id: 2115, question: "What is the term for animals that eat both plants and meat?", answers: ["Herbivores", "Carnivores", "Omnivores", "Insectivores"], correctAnswer: "Omnivores" },
  { id: 2116, question: "Which African nation has the most pyramids?", answers: ["Egypt", "Sudan", "Ethiopia", "Libya"], correctAnswer: "Sudan" },
  { id: 2117, question: "Which European city is home to the famous 'Blue Mosque'?", answers: ["Istanbul", "Athens", "Rome", "Barcelona"], correctAnswer: "Istanbul" },
  { id: 2118, question: "How many strings does a standard violin have?", answers: ["4", "5", "6", "7"], correctAnswer: "4" },
  { id: 2119, question: "What is the capital of Kazakhstan?", answers: ["Astana", "Almaty", "Tashkent", "Bishkek"], correctAnswer: "Astana" },
  { id: 2120, question: "Which element is a liquid at room temperature?", answers: ["Mercury", "Bromine", "Gallium", "Radon"], correctAnswer: "Mercury" }
];


const questions = [
  // Sri Lanka (9)
  { id: 2061, question: "Which ancient Sri Lankan city was the capital during King Dutugemunu's reign?", answers: ["Polonnaruwa", "Anuradhapura", "Kandy", "Kurunegala"], correctAnswer: "Anuradhapura" },
  { id: 2062, question: "Which Sri Lankan lake is man-made and located in Colombo?", answers: ["Beira Lake", "Kandy Lake", "Gregory Lake", "Parakrama Samudra"], correctAnswer: "Beira Lake" },
  { id: 2063, question: "The 'Mahavamsa' chronicles the history of which country?", answers: ["India", "Nepal", "Sri Lanka", "Bhutan"], correctAnswer: "Sri Lanka" },
  { id: 2064, question: "Which ethnic group forms the majority in Sri Lanka?", answers: ["Tamils", "Sinhalese", "Moors", "Burghers"], correctAnswer: "Sinhalese" },
  { id: 2065, question: "Which city is known as the cultural capital of Sri Lanka?", answers: ["Jaffna", "Kandy", "Colombo", "Galle"], correctAnswer: "Kandy" },
  { id: 2066, question: "Which major river flows through the Mahaweli Development Scheme?", answers: ["Kelani", "Mahaweli", "Kalu", "Walawe"], correctAnswer: "Mahaweli" },
  { id: 2067, question: "Which fort in southern Sri Lanka is a UNESCO World Heritage Site?", answers: ["Jaffna Fort", "Galle Fort", "Trincomalee Fort", "Matara Fort"], correctAnswer: "Galle Fort" },
  { id: 2068, question: "Which major Tamil festival is widely celebrated in Sri Lanka?", answers: ["Vesak", "Esala Perahera", "Thai Pongal", "Navam Perahera"], correctAnswer: "Thai Pongal" },
  { id: 2069, question: "Who was the first executive president of Sri Lanka?", answers: ["Sirimavo Bandaranaike", "Chandrika Kumaratunga", "J. R. Jayewardene", "Ranasinghe Premadasa"], correctAnswer: "J. R. Jayewardene" },

  // New Zealand (6)
  { id: 2070, question: "What is the Māori name for New Zealand?", answers: ["Aotearoa", "Tāmaki Makaurau", "Te Ika-a-Māui", "Ngāti Awa"], correctAnswer: "Aotearoa" },
  { id: 2071, question: "Which national park in New Zealand features the Franz Josef Glacier?", answers: ["Fiordland", "Tongariro", "Westland Tai Poutini", "Aoraki/Mount Cook"], correctAnswer: "Westland Tai Poutini" },
  { id: 2072, question: "Who was New Zealand's longest-serving Prime Minister?", answers: ["Robert Muldoon", "Helen Clark", "Richard Seddon", "Jacinda Ardern"], correctAnswer: "Richard Seddon" },
  { id: 2073, question: "Which river is New Zealand's longest?", answers: ["Waikato", "Clutha", "Wanganui", "Rangitikei"], correctAnswer: "Waikato" },
  { id: 2074, question: "The Treaty of Waitangi was signed in which year?", answers: ["1830", "1840", "1850", "1860"], correctAnswer: "1840" },
  { id: 2075, question: "Which mountain is the highest in New Zealand?", answers: ["Mount Ruapehu", "Mount Taranaki", "Aoraki / Mount Cook", "Mount Tongariro"], correctAnswer: "Aoraki / Mount Cook" },

  // General Knowledge (15)
  { id: 2076, question: "Which gas is commonly used in fluorescent lights?", answers: ["Argon", "Neon", "Krypton", "Helium"], correctAnswer: "Neon" },
  { id: 2077, question: "Which country is home to the ancient city of Petra?", answers: ["Jordan", "Egypt", "Syria", "Iraq"], correctAnswer: "Jordan" },
  { id: 2078, question: "What is the world’s largest living structure?", answers: ["Amazon Rainforest", "Great Barrier Reef", "Siberian Taiga", "Baikal Lake"], correctAnswer: "Great Barrier Reef" },
  { id: 2079, question: "Which famous scientist discovered penicillin?", answers: ["Alexander Fleming", "Louis Pasteur", "Marie Curie", "Edward Jenner"], correctAnswer: "Alexander Fleming" },
  { id: 2080, question: "What is the only even prime number?", answers: ["0", "2", "4", "6"], correctAnswer: "2" },
  { id: 2081, question: "Which novel begins with the line 'Call me Ishmael'?", answers: ["Moby Dick", "The Old Man and the Sea", "Treasure Island", "Heart of Darkness"], correctAnswer: "Moby Dick" },
  { id: 2082, question: "Which country consumes the most chocolate per capita?", answers: ["Belgium", "Switzerland", "Germany", "USA"], correctAnswer: "Switzerland" },
  { id: 2083, question: "Which mathematical constant is approximately equal to 2.718?", answers: ["Pi", "Euler's Number", "Phi", "Gamma"], correctAnswer: "Euler's Number" },
  { id: 2084, question: "In which year did the Berlin Wall fall?", answers: ["1987", "1988", "1989", "1990"], correctAnswer: "1989" },
  { id: 2085, question: "Which part of the human body produces insulin?", answers: ["Liver", "Pancreas", "Kidney", "Spleen"], correctAnswer: "Pancreas" },
  { id: 2086, question: "Which Shakespeare character says 'All the world's a stage'?", answers: ["Macbeth", "Hamlet", "Jaques", "Prospero"], correctAnswer: "Jaques" },
  { id: 2087, question: "Which ocean is the deepest?", answers: ["Atlantic", "Pacific", "Indian", "Southern"], correctAnswer: "Pacific" },
  { id: 2088, question: "How many players are there in a standard volleyball team?", answers: ["5", "6", "7", "8"], correctAnswer: "6" },
  { id: 2089, question: "Which instrument measures air pressure?", answers: ["Thermometer", "Barometer", "Hygrometer", "Anemometer"], correctAnswer: "Barometer" },
  { id: 2090, question: "Which famous artist cut off part of his own ear?", answers: ["Van Gogh", "Picasso", "Dali", "Monet"], correctAnswer: "Van Gogh" }
];




let usedSimilarQuestions: number[] = [];

export function shuffleArray(array: any[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

export function getRandomQuestions(array: any[]) {
  shuffleArray(array);
  return array.slice(0, 30);
}


export function generateQuestions(): Question[] {
  usedSimilarQuestions = [];

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
  const questionsToUse = similarQuestions.filter(question => usedSimilarQuestions.includes(question.id) === false)

  shuffleArray(questionsToUse);
  const question = questionsToUse.slice(0, 1)[0];

  usedSimilarQuestions.push(question.id);

  return question;
}
