import type { SeedQuestion } from "./types"

// Famous crimes: notorious criminals and serial cases, plus modern high-profile cases —
// corporate and cyber fraud, major heists, sports corruption and landmark trials.
// Web-researched with a source note per question. Two accuracy rules were applied throughout:
// only people actually CONVICTED are named as perpetrators, and only CONCLUDED cases are
// used, so live appeals can't turn an answer false. Focus is on investigation, capture and
// verdict rather than graphic detail.

export const crime: SeedQuestion[] = [
  // --- notorious criminals and serial cases (9 easy / 8 medium / 8 hard) ---
  // --- easy (9) ---
  {
    question: "In which US state was serial killer Ted Bundy executed in the electric chair in 1989?",
    answers: ["Florida", "Washington", "Utah", "Colorado"],
    correctAnswer: "Florida",
    difficulty: "easy",
    source: "Britannica, 'Ted Bundy': executed at Florida State Prison, Starke, 24 January 1989.",
  },
  {
    question: "Which cult leader was convicted in 1971 over the Tate-LaBianca murders in California?",
    answers: ["Charles Manson", "Jim Jones", "David Koresh", "Marshall Applewhite"],
    correctAnswer: "Charles Manson",
    difficulty: "easy",
    source: "Britannica, 'Charles Manson': jury returned guilty verdicts on 25 January 1971.",
  },
  {
    question: "Which US city's police arrested serial killer Jeffrey Dahmer in July 1991?",
    answers: ["Milwaukee", "Detroit", "Cleveland", "Chicago"],
    correctAnswer: "Milwaukee",
    difficulty: "easy",
    source: "Britannica, 'Jeffrey Dahmer': arrested in Milwaukee 1991; convicted 15 February 1992.",
  },
  {
    question: "Peter Sutcliffe, convicted of murder at the Old Bailey in 1981, was known by which nickname?",
    answers: ["The Yorkshire Ripper", "The Black Panther", "The Camden Ripper", "The Suffolk Strangler"],
    correctAnswer: "The Yorkshire Ripper",
    difficulty: "easy",
    source: "BBC News obituary and ITV News: Sutcliffe, the 'Yorkshire Ripper', convicted May 1981.",
  },
  {
    question: "Harold Shipman, convicted of 15 murders in 2000, worked in which profession?",
    answers: ["Family doctor", "Nurse", "Pharmacist", "Undertaker"],
    correctAnswer: "Family doctor",
    difficulty: "easy",
    source: "Britannica, 'Harold Shipman': GP in Hyde, Greater Manchester; convicted 31 January 2000.",
  },
  {
    question: "Which nickname was given to John Wayne Gacy, who performed as Pogo at children's parties?",
    answers: ["The Killer Clown", "The Night Stalker", "The Green River Killer", "The Hillside Strangler"],
    correctAnswer: "The Killer Clown",
    difficulty: "easy",
    source: "Britannica, 'John Wayne Gacy': 'Killer Clown', convicted 12 March 1980 in Illinois.",
  },
  {
    question: "Which New York killer of 1976-77 signed letters sent to the press as 'Son of Sam'?",
    answers: ["David Berkowitz", "Richard Speck", "Joel Rifkin", "Albert DeSalvo"],
    correctAnswer: "David Berkowitz",
    difficulty: "easy",
    source: "History.com and EBSCO: Berkowitz arrested in Yonkers, 10 August 1977, after a parking ticket.",
  },
  {
    question: "Police searches in the 1966 Moors murders case centred on which moor near Manchester?",
    answers: ["Saddleworth Moor", "Ilkley Moor", "Bodmin Moor", "Dartmoor"],
    correctAnswer: "Saddleworth Moor",
    difficulty: "easy",
    source: "BBC News; Brady and Hindley convicted at Chester Assizes, 6 May 1966; graves on Saddleworth Moor.",
  },
  {
    question: "Which Wisconsin killer, arrested in 1957, inspired the character Norman Bates in Psycho?",
    answers: ["Ed Gein", "Albert Fish", "Carl Panzram", "Richard Speck"],
    correctAnswer: "Ed Gein",
    difficulty: "easy",
    source: "CrimeReads/Wikipedia: Gein of Plainfield, Wisconsin; found guilty but legally insane, 1968.",
  },

  // --- medium (8) ---
  {
    question: "Colin Pitchfork's 1988 conviction was the world's first murder conviction secured by what?",
    answers: ["DNA profiling", "Fingerprint analysis", "Bite-mark comparison", "Blood-spatter analysis"],
    correctAnswer: "DNA profiling",
    difficulty: "medium",
    source: "ITV News; Alec Jeffreys' DNA fingerprinting, Leicestershire; Pitchfork sentenced January 1988.",
  },
  {
    question: "Andrei Chikatilo, convicted in 1992, committed most of his crimes around which Russian city?",
    answers: ["Rostov-on-Don", "Novosibirsk", "Volgograd", "Vladivostok"],
    correctAnswer: "Rostov-on-Don",
    difficulty: "medium",
    source: "UPI Archives; the 'Rostov Ripper' found guilty on 52 counts, 15 October 1992.",
  },
  {
    question: "A 1983 call-out to clear blocked drains at a Muswell Hill flat led to whose arrest?",
    answers: ["Dennis Nilsen", "Peter Tobin", "John Christie", "Donald Neilson"],
    correctAnswer: "Dennis Nilsen",
    difficulty: "medium",
    source: "BBC News / MurderMap: Nilsen arrested 9 February 1983 at 23 Cranley Gardens; convicted 1983.",
  },
  {
    question: "Metadata on a floppy disk sent to a TV station led to which killer's arrest in 2005?",
    answers: ["Dennis Rader", "Gary Ridgway", "Robert Hansen", "Rodney Alcala"],
    correctAnswer: "Dennis Rader",
    difficulty: "medium",
    source: "Wichita KSAS-TV disk metadata named 'Dennis'/Christ Lutheran Church; Rader pleaded guilty June 2005.",
  },
  {
    question: "Ivan Milat's Australian 'backpacker murders' investigation centred on which state forest?",
    answers: ["Belanglo State Forest", "Ku-ring-gai Chase", "Daintree Forest", "Otway Forest"],
    correctAnswer: "Belanglo State Forest",
    difficulty: "medium",
    source: "Belanglo State Forest, New South Wales; Milat convicted 27 July 1996.",
  },
  {
    question: "Which nickname did the press give Richard Ramirez, convicted in Los Angeles in 1989?",
    answers: ["The Night Stalker", "The Freeway Killer", "The Skid Row Slasher", "The Trailside Killer"],
    correctAnswer: "The Night Stalker",
    difficulty: "medium",
    source: "UPI Archives, 20 September 1989: 'Night Stalker' convicted of 13 murders in California.",
  },
  {
    question: "The unsolved 1947 Los Angeles murder of Elizabeth Short is known by which nickname?",
    answers: ["The Black Dahlia", "The Blue Dahlia", "The Red Lipstick Murder", "The White Orchid"],
    correctAnswer: "The Black Dahlia",
    difficulty: "medium",
    source: "FBI history pages: the 'Black Dahlia' case, Los Angeles, January 1947, never solved.",
  },
  {
    question: "Which killer of 1970s backpackers across Asia was nicknamed 'The Serpent'?",
    answers: ["Charles Sobhraj", "Andrew Cunanan", "Jack Unterweger", "Pedro Rodrigues Filho"],
    correctAnswer: "Charles Sobhraj",
    difficulty: "medium",
    source: "Al Jazeera / CBS News: Sobhraj, 'The Serpent', convicted in Nepal in 2004.",
  },

  // --- hard (8) ---
  {
    question: "The Golden State Killer was identified in 2018 using which then-novel investigative technique?",
    answers: ["Forensic genetic genealogy", "Bite-mark comparison", "Voice-print analysis", "Isotope hair testing"],
    correctAnswer: "Forensic genetic genealogy",
    difficulty: "hard",
    source: "NPR/Forbes: GEDmatch family-tree work identified Joseph DeAngelo; he pleaded guilty in 2020.",
  },
  {
    question: "Dr Crippen's 1910 arrest aboard a liner was the first ever aided by which technology?",
    answers: ["Wireless telegraph", "The telephone", "Aerial photography", "The polygraph"],
    correctAnswer: "Wireless telegraph",
    difficulty: "hard",
    source: "Britannica / Atlas Obscura: Captain Kendall's wireless message from the SS Montrose, July 1910.",
  },
  {
    question: "Britain's first murder conviction on fingerprint evidence came in which 1905 case?",
    answers: ["The Stratton brothers", "The Brides in the Bath", "The Camden Town murder", "The Crippen case"],
    correctAnswer: "The Stratton brothers",
    difficulty: "hard",
    source: "Old Bailey trial opened 5 May 1905; Alfred and Albert Stratton convicted of the Deptford murder.",
  },
  {
    question: "Peter Kurten, tried and executed in Germany in 1931, was known by which nickname?",
    answers: ["The Vampire of Dusseldorf", "The Butcher of Hanover", "The Beast of Bremen", "The Monster of Munich"],
    correctAnswer: "The Vampire of Dusseldorf",
    difficulty: "hard",
    source: "Britannica, 'Peter Kurten': convicted April 1931, guillotined at Cologne, 2 July 1931.",
  },
  {
    question: "Which Colombian killer, arrested in 1999, was nicknamed 'La Bestia', or 'The Beast'?",
    answers: ["Luis Garavito", "Pedro Lopez", "Daniel Camargo", "Juana Barraza"],
    correctAnswer: "Luis Garavito",
    difficulty: "hard",
    source: "Britannica, 'Luis Garavito': apprehended 22 April 1999, confessed October 1999, died 2023.",
  },
  {
    question: "Whose 1995 published manifesto led his own brother to recognise the writing and alert the FBI?",
    answers: ["Ted Kaczynski", "Eric Rudolph", "Timothy McVeigh", "Terry Nichols"],
    correctAnswer: "Ted Kaczynski",
    difficulty: "hard",
    source: "FBI 'Unabomber' case file: David Kaczynski's tip, February 1996; guilty plea 22 January 1998.",
  },
  {
    question: "Which Frenchman, guillotined in 1922, lured victims through lonely-hearts newspaper adverts?",
    answers: ["Henri Desire Landru", "Marcel Petiot", "Joseph Vacher", "Eugene Weidmann"],
    correctAnswer: "Henri Desire Landru",
    difficulty: "hard",
    source: "France 24: Landru, the 'Bluebeard of Gambais', convicted 1921, guillotined 25 February 1922.",
  },
  {
    question: "Whose testimony to prosecutor Giovanni Falcone underpinned Sicily's 1986 Maxi Trial?",
    answers: ["Tommaso Buscetta", "Salvatore Riina", "Bernardo Provenzano", "Luciano Liggio"],
    correctAnswer: "Tommaso Buscetta",
    difficulty: "hard",
    source: "Mob Museum / Maxi Trial records: Buscetta turned pentito in 1984; 338 of 475 convicted, 1987.",
  },

  // --- modern high-profile cases (9 easy / 8 medium / 8 hard) ---
  // --- easy (9) ---
  {
    question: "Elizabeth Holmes was convicted in 2022 of defrauding investors in which blood-testing startup?",
    answers: ["Theranos", "23andMe", "Illumina", "Verily"],
    correctAnswer: "Theranos",
    difficulty: "easy",
    source: "US v. Holmes; four counts of investor wire fraud, Jan 2022; affirmed by the Ninth Circuit, Feb 2025.",
  },
  {
    question: "Which carmaker pleaded guilty in the US in 2017 over software that cheated diesel emissions tests?",
    answers: ["Volkswagen", "Toyota", "Renault", "Ford"],
    correctAnswer: "Volkswagen",
    difficulty: "easy",
    source: "DOJ press release: Volkswagen AG pleaded guilty to three felony counts, 10 March 2017.",
  },
  {
    question: "Ross Ulbricht was convicted in 2015 of creating which dark web marketplace, shut down in 2013?",
    answers: ["Silk Road", "AlphaBay", "Hansa", "Dream Market"],
    correctAnswer: "Silk Road",
    difficulty: "easy",
    source: "FBI/SDNY: Ulbricht found guilty on all seven counts, 5 February 2015; site seized October 2013.",
  },
  {
    question: "Which cyclist was stripped of seven Tour de France titles in 2012 after a doping investigation?",
    answers: ["Lance Armstrong", "Alberto Contador", "Jan Ullrich", "Miguel Indurain"],
    correctAnswer: "Lance Armstrong",
    difficulty: "easy",
    source: "BBC: UCI accepted the USADA report and stripped Armstrong of his 1999-2005 titles, 22 October 2012.",
  },
  {
    question: "Which former NFL star was acquitted of two murders by a Los Angeles jury in October 1995?",
    answers: ["O. J. Simpson", "Joe Namath", "Dan Marino", "Walter Payton"],
    correctAnswer: "O. J. Simpson",
    difficulty: "easy",
    source: "Britannica, 'O.J. Simpson trial': not-guilty verdict returned 3 October 1995.",
  },
  {
    question: "US prosecutors indicted officials of which world sports body for racketeering in May 2015?",
    answers: ["FIFA", "The IOC", "UEFA", "World Athletics"],
    correctAnswer: "FIFA",
    difficulty: "easy",
    source: "DOJ: 47-count racketeering indictment unsealed 27 May 2015; arrests at a Zurich hotel.",
  },
  {
    question: "Which cryptocurrency exchange founded by Sam Bankman-Fried filed for bankruptcy in 2022?",
    answers: ["FTX", "Coinbase", "Binance", "Kraken"],
    correctAnswer: "FTX",
    difficulty: "easy",
    source: "CNBC: FTX and Alameda Research filed for Chapter 11 bankruptcy, 11 November 2022.",
  },
  {
    question: "In which city was Kim Kardashian robbed of jewellery at gunpoint in October 2016?",
    answers: ["Paris", "Milan", "New York", "London"],
    correctAnswer: "Paris",
    difficulty: "easy",
    source: "PBS/NBC: robbery at a private residence in the 8th arrondissement of Paris, 3 October 2016.",
  },
  {
    question: "Julian Assange founded which website that published leaked US military and diplomatic files?",
    answers: ["WikiLeaks", "Cryptome", "The Intercept", "Pastebin"],
    correctAnswer: "WikiLeaks",
    difficulty: "easy",
    source: "Britannica, 'WikiLeaks': founded 2006 by Assange; war logs and diplomatic cables published 2010.",
  },

  // --- medium (8) ---
  {
    question: "Which British bank collapsed in 1995 after unauthorised trading by Nick Leeson in Singapore?",
    answers: ["Barings", "Coutts", "Midland Bank", "Lloyds"],
    correctAnswer: "Barings",
    difficulty: "medium",
    source: "Britannica, 'Bankruptcy of Barings Bank'; Leeson jailed in Singapore for six and a half years, Dec 1995.",
  },
  {
    question: "Which German payments company collapsed in 2020 after admitting 1.9bn euros did not exist?",
    answers: ["Wirecard", "SAP", "Klarna", "Adyen"],
    correctAnswer: "Wirecard",
    difficulty: "medium",
    source: "CNBC: Wirecard said the missing 1.9bn euros likely never existed, 22 June; insolvency filed 25 June 2020.",
  },
  {
    question: "In July 2020 hackers hijacked celebrity accounts on which platform to promote a Bitcoin scam?",
    answers: ["Twitter", "Facebook", "Instagram", "LinkedIn"],
    correctAnswer: "Twitter",
    difficulty: "medium",
    source: "Graham Ivan Clark pleaded guilty in Florida and was sentenced to three years, March 2021.",
  },
  {
    question: "Which country's National Health Service was badly disrupted by the 2017 WannaCry attack?",
    answers: ["United Kingdom", "Canada", "Ireland", "Australia"],
    correctAnswer: "United Kingdom",
    difficulty: "medium",
    source: "UK National Audit Office report: WannaCry hit NHS England on 12 May 2017; 19,000 appointments cancelled.",
  },
  {
    question: "In 2003 thieves emptied more than 100 vault boxes in the diamond district of which city?",
    answers: ["Antwerp", "Amsterdam", "Geneva", "Tel Aviv"],
    correctAnswer: "Antwerp",
    difficulty: "medium",
    source: "Antwerp World Diamond Centre vault raid, 15-16 Feb 2003; Leonardo Notarbartolo jailed for 10 years.",
  },
  {
    question: "Jewels were stolen from the Green Vault museum in 2019 in which German city?",
    answers: ["Dresden", "Munich", "Hamburg", "Cologne"],
    correctAnswer: "Dresden",
    difficulty: "medium",
    source: "CNN: Gruenes Gewoelbe burglary 25 Nov 2019; five men convicted by a Dresden court, 16 May 2023.",
  },
  {
    question: "Which US Army soldier was convicted by court-martial in 2013 of leaking files to WikiLeaks?",
    answers: ["Chelsea Manning", "Edward Snowden", "Reality Winner", "Daniel Hale"],
    correctAnswer: "Chelsea Manning",
    difficulty: "medium",
    source: "Britannica: convicted 30 July 2013 of Espionage Act offences, acquitted of aiding the enemy.",
  },
  {
    question: "Which South Korean president was removed from office in 2017 and later convicted of corruption?",
    answers: ["Park Geun-hye", "Moon Jae-in", "Lee Myung-bak", "Roh Moo-hyun"],
    correctAnswer: "Park Geun-hye",
    difficulty: "medium",
    source: "Britannica: Constitutional Court removed Park March 2017; Supreme Court upheld her sentence Jan 2021.",
  },

  // --- hard (8) ---
  {
    question: "Which bank pleaded guilty in the US in 2022 over money laundering through its Estonian branch?",
    answers: ["Danske Bank", "Swedbank", "Nordea", "SEB"],
    correctAnswer: "Danske Bank",
    difficulty: "hard",
    source: "DOJ: Danske Bank pleaded guilty to bank fraud conspiracy and forfeited $2.06bn, 13 December 2022.",
  },
  {
    question: "Which former Malaysian prime minister was jailed in 2022 in a case linked to the 1MDB scandal?",
    answers: ["Najib Razak", "Mahathir Mohamad", "Abdullah Badawi", "Anwar Ibrahim"],
    correctAnswer: "Najib Razak",
    difficulty: "hard",
    source: "Federal Court of Malaysia upheld the SRC International conviction and 12-year term, 23 August 2022.",
  },
  {
    question: "Which French bank lost 4.9bn euros in 2008 through hidden trades by Jerome Kerviel?",
    answers: ["Societe Generale", "BNP Paribas", "Credit Agricole", "Natixis"],
    correctAnswer: "Societe Generale",
    difficulty: "hard",
    source: "Cour de cassation upheld Kerviel's criminal conviction and three-year sentence, March 2014.",
  },
  {
    question: "Bernard Ebbers was convicted in 2005 over an $11bn accounting fraud at which telecoms firm?",
    answers: ["WorldCom", "Global Crossing", "Qwest", "Nortel"],
    correctAnswer: "WorldCom",
    difficulty: "hard",
    source: "Convicted of securities fraud March 2005, sentenced to 25 years; Second Circuit affirmed in 2006.",
  },
  {
    question: "A US couple pleaded guilty in 2023 to laundering Bitcoin stolen from which exchange in 2016?",
    answers: ["Bitfinex", "Mt. Gox", "Coincheck", "Bitstamp"],
    correctAnswer: "Bitfinex",
    difficulty: "hard",
    source: "DOJ: Lichtenstein and Morgan pleaded guilty to money laundering conspiracy, August 2023.",
  },
  {
    question: "Three Pakistani cricketers were jailed in 2011 for bowling deliberate no-balls at which ground?",
    answers: ["Lord's", "The Oval", "Headingley", "Edgbaston"],
    correctAnswer: "Lord's",
    difficulty: "hard",
    source: "BBC: Southwark Crown Court jailed Butt, Asif and Amir, Nov 2011, over the Aug 2010 Lord's Test.",
  },
  {
    question: "Which CIA officer pleaded guilty in 1994 to spying for the Soviet Union and then Russia?",
    answers: ["Aldrich Ames", "Robert Hanssen", "Jonathan Pollard", "Ana Montes"],
    correctAnswer: "Aldrich Ames",
    difficulty: "hard",
    source: "FBI famous cases: Ames pleaded guilty 28 April 1994 and received a life sentence.",
  },
  {
    question: "Charles Taylor, convicted of war crimes in 2012, had been the president of which country?",
    answers: ["Liberia", "Sierra Leone", "Ivory Coast", "Ghana"],
    correctAnswer: "Liberia",
    difficulty: "hard",
    source: "Special Court for Sierra Leone convicted Taylor April 2012; appeal chamber upheld it Sept 2013.",
  },
]
