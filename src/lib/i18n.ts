export type Lang = "en" | "ta";

export const dict = {
  en: {
    nav: {
      home: "Home",
      history: "History",
      mass: "Mass & Festivals",
      festivals: "Festivals",
      gallery: "Gallery",
      contact: "Contact",
    },
    hero: {
      visit: "Plan Your Visit",
      explore: "Explore Our Story",
    },
    home: {
      patronessLabel: "Our Patroness",
      patronessTitle: "Vadakankulam Matha",
      patronessSubtitle: "Mother of Good Health",
      patronessP1:
        "For centuries, the small village of Vadakankulam in the Tirunelveli district has been home to one of South India's most cherished Marian shrines. Our Lady of Good Health — known to her devotees as Vadakankulam Matha — has watched over generations of the faithful, drawing pilgrims from every corner of Tamil Nadu and beyond.",
      patronessP2:
        "The image of Our Blessed Mother, draped in royal red and gold and crowned with stars, embodies the love and reverence of countless families who have placed their joys, sorrows, and silent prayers before her. Each year during her September feast, the village transforms into a sea of light and song, as thousands gather to honour the Mother who has never refused a sincere prayer.",
      patronessQuote: "Pray for us, O Holy Mother of God.",

      aboutLabel: "Our Heritage",
      aboutTitle: "A Legacy of Faith & Devotion",
      aboutSubtitle: "Three centuries of unwavering grace",
      aboutP1:
        "Vadakankulam Matha Church stands as a beacon of spirituality and community in the heart of Vadakankulam. Founded in 1685 by the Jesuit missionary St. John de Britto, this sacred place has been a home for the faithful, a shelter for the weary, and a testament to unwavering devotion for over three hundred years.",
      aboutP2:
        "Dedicated to the Holy Family and lovingly known as Vadavai Matha, every corner of this holy ground echoes with prayers, hymns, and the warmth of a community bound together by love and faith — a heritage so deep the first Bishop of Thoothukudi called it 'Little Rome.'",
      aboutQuote:
        "A home for the faithful, a shelter for the weary, a sanctuary for every soul.",

      verseLabel: "A Word of Peace",
      verse:
        "Come to me, all you who are weary and burdened, and I will give you rest.",
      verseRef: "Matthew 11:28",

      welcomeLabel: "Welcome",
      welcomeTitle: "A Sanctuary of Stillness",
      welcomeBody:
        "Vadakankulam Matha Church has stood as a quiet refuge for generations of devotees — a place to pause, to pray, and to be at peace. Whether you come in faith, in seeking, or in sorrow, you are welcome here.",

      showcaseLabel: "Sacred Moments",
      showcaseTitle: "Where Light Meets Devotion",
      showcaseBody:
        "Every candle lit, every silent prayer, every shaft of morning light — together they form the rhythm of our parish life.",

      festivalsLabel: "Sacred Calendar",
      festivalsTitle: "Festivals & Feasts",
      festivalsBody:
        "From the Annual Feast of Our Lady to Christmas Vigil, our community gathers throughout the year in joy, song, and shared faith.",
      festivalsCta: "View Festivals",

      massLabel: "Daily Worship",
      massTitle: "Mass & Services",
      massCta: "Full Schedule",

      galleryLabel: "Glimpses",
      galleryTitle: "A Visual Journey",
      galleryCta: "Open Gallery",

      visitLabel: "Visit Us",
      visitTitle: "You Are Always Welcome",
      visitBody:
        "Step inside whenever you wish. Our doors, like our hearts, remain open.",
      visitCta: "Find Directions",
    },
    history: {
      label: "Our Heritage",
      title: "A Story Carried by Generations",
      intro:
        "For over three centuries — since St. John de Britto raised his first thatched chapel in 1685 — Vadakankulam Matha has been a quiet witness to the faith of countless families, festivals, and silent prayers offered before Our Blessed Mother.",
      timeline: [
        {
          year: "1685",
          title: "Foundation by St. John de Britto",
          body: "The Jesuit missionary known in Tamil as Arulanandar raises a small thatched chapel and dedicates it to the Holy Family. Within a year he baptises over two hundred souls — the first Christian community of Vadakankulam is born.",
        },
        {
          year: "1744",
          title: "Baptism of St. Devasahayam",
          body: "Devasahayam Pillai, a Tamil convert from Travancore, is baptised at this parish by Rev. Fr. Puthery. He would later give his life for the faith and, in 2022, be canonised as the first Indian-born layman saint.",
        },
        {
          year: "1803",
          title: "The Apparition",
          body: "On a day kept in living memory, the statue of Our Lady of Assumption is said to have extended her hands towards the faithful — a sign of grace that drew Marian devotion to Vadavai for generations to come.",
        },
        {
          year: "1872",
          title: "The Stone Church",
          body: "After the foundation stone was laid on 9 August 1855, the present stone church is solemnly blessed on 29 June 1872 by Bishop Kanos of Madurai — built to welcome the growing pilgrim community.",
        },
        {
          year: "1926",
          title: "Little Rome",
          body: "The first Bishop of Thoothukudi confers the title of 'Little Rome' on Vadakankulam, in recognition of the unbroken faith of its people and the spiritual heritage of the parish.",
        },
        {
          year: "1993",
          title: "Declared a Shrine",
          body: "The Church formally raises Vadavai Matha to the status of a shrine — confirming its long-standing role as a centre of pilgrimage and Marian devotion in South India.",
        },
      ],
    },
    festivals: {
      label: "Sacred Calendar",
      title: "Festivals & Feasts",
      intro:
        "The year of our parish is woven from celebrations both grand and intimate — moments when the community gathers in worship and joy.",
      featuredLabel: "The Annual Feast",
      featured: {
        name: "Feast of Our Lady of the Assumption",
        date: "August 6 – 15",
        body: "The grandest celebration of the year — ten days of Masses, novena and procession honouring Our Lady, drawing pilgrims from across the region to the great feast day on the fifteenth.",
        schedule: [
          { when: "August 6 · Day 1", detail: "Flag Hoisting — 6:00 PM" },
          { when: "August 6 – 14 · Days 1–9", detail: "Tamil Masses — 5:00 AM, 6:15 AM & 7:15 AM" },
          { when: "August 14 · Day 9", detail: "Malayalam Mass — 4:00 PM" },
          { when: "August 15 · Feast Day", detail: "Bishop's Mass — 5:00 AM · English Mass" },
        ],
      },
      yearLabel: "Feasts Through the Year",
      list: [
        {
          name: "St. Sebastian Church Feast",
          date: "January 11 – 20",
          body: "Ten days of devotion at the chapel of the soldier-martyr St. Sebastian.",
        },
        {
          name: "Presentation of the Blessed Virgin Mary",
          date: "January 31 – February 2",
          body: "A three-day feast recalling the presentation of the child Mary in the Temple — Our Lady of the Presentation, known in Tamil as Kannikai Matha.",
        },
        {
          name: "St. John de Britto Feast",
          date: "February 3 – 4",
          body: "Honouring Arulanandar, the Jesuit martyr who founded our parish in 1685.",
        },
        {
          name: "Our Lady of Lourdes",
          date: "February 5 – 11",
          body: "Honouring the apparition of Our Lady at Lourdes, with special prayer for the sick.",
        },
        {
          name: "St. Anthony's Church Feast",
          date: "June 1 – 13",
          body: "Thirteen days leading to the feast of St. Anthony of Padua, helper of the poor.",
        },
        {
          name: "St. George Church Feast",
          date: "June 18 – 27",
          body: "Ten days of devotion at the church of St. George, soldier and martyr.",
        },
        {
          name: "Our Lady of Velankanni Church Feast",
          date: "August 30 – September 8",
          body: "A novena to Our Lady of Good Health of Velankanni, ending on her birthday.",
        },
        {
          name: "St. Michael Church Feast",
          date: "September 20 – 29",
          body: "Honouring St. Michael the Archangel at Michaelpalayam, defender of the faithful.",
        },
      ],
      marianLabel: "Special Marian Days",
      marian: [
        {
          name: "Nativity of Our Lady",
          date: "September 8",
          body: "The birthday of the Blessed Mother, kept with joy across the parish.",
        },
        {
          name: "The Apparition of Our Lady",
          date: "October 23",
          body: "Commemorating the Matha Kaatchi — the day Our Lady's statue is remembered to have extended her hands towards the faithful.",
        },
      ],
    },
    saints: {
      label: "The Saints of Vadavai",
      title: "Saints of Our Parish",
      intro:
        "From the missionary who founded our chapel to the layman saint baptised at our font, this soil has been blessed by holy lives. Their feasts still draw our community in song and procession.",
      list: [
        {
          name: "St. John de Britto",
          feast: "Feast — February 4",
          epithet: "Arulanandar, Our Founder",
          body: "The Portuguese Jesuit known in Tamil as Arulanandar built our first thatched chapel in 1685 and dedicated it to the Holy Family. He baptised over two hundred souls here before his martyrdom in 1693.",
        },
        {
          name: "St. Devasahayam Pillai",
          feast: "Feast — January 14",
          epithet: "First Indian Layman Saint",
          body: "A Tamil convert who received baptism at this very parish in 1744. Martyred for his faith in 1752, he was canonised in 2022 — the first Catholic layman of Indian birth raised to sainthood.",
          slug: "devasahayam-pillai",
        },
        {
          name: "St. Sebastian",
          feast: "Feast — January 20",
          epithet: "Soldier and Martyr",
          body: "A Roman officer who chose Christ over the empire and gave his life for his faith. His chapel within our parish stands as a witness to all who have served both king and Kingdom.",
        },
        {
          name: "St. Michael the Archangel",
          feast: "Feast — September 29",
          epithet: "Defender of the Faithful",
          body: "Captain of the heavenly host and shield against evil. The church at Michaelpalayam, raised in 1910, carries his patronage and the quiet prayers of generations who have sought his protection.",
        },
      ],
    },
    saintDevasahayam: {
      back: "Saints of Our Parish",
      label: "Saint of Our Parish",
      name: "St. Devasahayam Pillai",
      epithet: "Devasahayam — “God is my help”",
      intro:
        "A nobleman and soldier of Travancore who was baptised at our parish font, and who gave his life for Christ. In 2022 he became the first Catholic layman of Indian birth raised to the altars.",
      feast: "Feast — 14 January",
      canonised: "Canonised 15 May 2022 by Pope Francis",
      quote: "O Jesus, it is for love of you that I suffer.",
      sections: [
        {
          heading: "A Soldier of the King",
          body: "He was born Neelakanta Pillai, a nobleman of the Nair caste in the kingdom of Travancore. Gifted in mind and bearing, he rose to high office at the court of King Marthanda Varma and was entrusted with command in his armies. Yet a run of misfortunes left him searching for a deeper consolation than rank and favour could give.",
        },
        {
          heading: "Baptised at Our Font",
          body: "In his sorrow he confided in a European officer of the king's service, Eustachius De Lannoy, a devout Christian, who spoke to him of the one true God. The words fell on his soul like a heavenly balm. De Lannoy sent him to the Jesuit Father Bouttari, then in charge of the Christians of Vadakkankulam, who baptised him in 1744 and gave him the name Devasahayam — “God is my help,” which answers to the name Lazarus. His wife and many of his kin soon followed him into the faith.",
        },
        {
          heading: "Arrest and Trial",
          body: "Father Bouttari was then building the church at Vadakkankulam. When Devasahayam sought royal permission to cut timber for it, a powerful brahmin used the occasion to demand he renounce his faith. The convert refused, and through intrigue and false accusation his enemies obtained a royal warrant for his arrest. Brought before the king, he would not deny Christ, and so a sentence of death was pronounced against him.",
        },
        {
          heading: "The Long Martyrdom",
          body: "For three years he was made to suffer. Paraded village to village mounted on a buffalo with his hands bound, beaten with thorn-studded rods, his wounds rubbed with ground pepper — he answered only, “It is for love of Jesus that I suffer.” Given sea-water in his thirst, he drank it and found it sweet. Chained for months to a tree in the wilderness, he was sustained by the Eucharist carried to him, and the place became a pilgrimage as the faithful flocked to him and miracles were reported through his prayer.",
        },
        {
          heading: "Crowned in Glory",
          body: "On 14 January 1752 the soldiers led him out and shot him, and he fell pronouncing the names of Jesus and Mary. His body was buried in the church of St Francis Xavier at Kottar. On 15 May 2022 Pope Francis declared him a saint — Devasahayam Pillai, the first Catholic layman of Indian birth to be canonised.",
        },
      ],
      relicsHeading: "Kept at Vadakkankulam",
      relicsBody:
        "Our parish treasures a living bond with the martyr: the church of Vadakkankulam preserves a part of the garment he wore and the very chains with which he was bound. It was for the building of this church that his final ordeal began.",
    },
    gallery: {
      label: "Visual Journey",
      title: "Glimpses of Grace",
      intro:
        "Photographs of light, devotion, and stillness — moments captured in and around the parish.",
    },
    mass: {
      label: "Worship & Celebrations",
      title: "Mass & Festivals",
      intro:
        "All are welcome to pray with us. Here you will find our weekly Mass times, our monthly devotions, and the feasts our parish keeps through the year.",
      weeklyLabel: "Weekly Worship",
      cards: [
        {
          title: "Daily Mass",
          subtitle: "Monday – Saturday",
          times: ["5:00 AM", "6:10 AM"],
        },
        {
          title: "Sunday Mass",
          subtitle: "Every Sunday",
          times: ["5:00 AM", "7:00 AM", "9:30 AM"],
        },
        {
          title: "Evening Devotion",
          subtitle: "Daily",
          times: [
            "6:30 PM — Holy Rosary",
            "7:00 PM — Benediction",
            "Sundays — begins 5:30 PM",
          ],
        },
      ],
      devotionsLabel: "Other Language Masses & Monthly Devotions",
      devotionsNote:
        "Held once each month. Times may shift on feast days — please confirm with the parish office.",
      devotions: [
        { when: "First Sunday", time: "5:00 PM", service: "English Mass" },
        { when: "First Monday", time: "11:00 AM", service: "Malayalam Mass" },
        { when: "First Friday", time: "3:00 PM", service: "Divine Mercy Devotion" },
        { when: "First Saturday", time: "10:00 AM", service: "Tamil Mass" },
        { when: "First Saturday", time: "6:30 PM", service: "Marian Procession & Adoration" },
        { when: "Second Friday", time: "6:30 PM", service: "St. Devasahayam Procession & Adoration" },
        { when: "Last Friday", time: "6:30 PM", service: "Our Lady of Help (Sahaya Matha) Church" },
      ],
    },
    contact: {
      label: "Reach Us",
      title: "Visit & Connect",
      intro: "We would love to hear from you. Reach out, drop in, or simply pray with us.",
      address: "Vadakankulam Matha Church, Vadakankulam, Tamil Nadu, India",
      phone: "+91 00000 00000",
      email: "info@vadavaimatha.org",
      formName: "Your Name",
      formEmail: "Your Email",
      formMessage: "Your Message",
      formSubmit: "Send Message",
      directions: "Get Directions",
    },
    footer: {
      tagline: "A sanctuary of faith, prayer and community.",
      explore: "Explore",
      visit: "Visit",
      connect: "Connect",
      rights: "All rights reserved.",
    },
  },
  ta: {
    nav: {
      home: "முகப்பு",
      history: "வரலாறு",
      mass: "திருப்பலி & திருவிழா",
      festivals: "திருவிழாக்கள்",
      gallery: "புகைப்படங்கள்",
      contact: "தொடர்பு",
    },
    hero: {
      visit: "வருகை திட்டமிடுங்கள்",
      explore: "எங்கள் கதை",
    },
    home: {
      patronessLabel: "எங்கள் பாதுகாவலி",
      patronessTitle: "வடகக்குளம் மாதா",
      patronessSubtitle: "ஆரோக்கிய மாதா",
      patronessP1:
        "நூற்றாண்டுகளாக, திருநெல்வேலி மாவட்டத்திலுள்ள வடகக்குளம் என்னும் சிற்றூர், தென்னிந்தியாவின் மிகவும் அன்பான மாதா திருத்தலங்களில் ஒன்றாகத் திகழ்ந்து வருகிறது. ஆரோக்கிய மாதா — பக்தர்களால் வடகக்குளம் மாதா என்று அழைக்கப்படுபவள் — தலைமுறை தலைமுறையாக விசுவாசிகளைக் காத்து வருகிறாள், தமிழகம் முழுவதிலும் இருந்து யாத்திரிகர்களை ஈர்த்து வருகிறாள்.",
      patronessP2:
        "அரசு செம்மை, தங்கம், நட்சத்திரக் கிரீடம் அணிந்த அன்னையின் திருஉரு, தங்கள் மகிழ்ச்சிகளையும் துயரங்களையும் அமைதியான ஜெபங்களையும் அவள் முன் வைத்த எண்ணற்ற குடும்பங்களின் அன்பையும் பக்தியையும் உருவகப்படுத்துகிறது. ஒவ்வொரு செப்டம்பரில் நடைபெறும் அவளது திருவிழாவின் போது, கிராமம் ஒளியின், பாடலின் கடலாக மாறுகிறது — உண்மையான ஜெபத்தை ஒருபோதும் மறுக்காத அன்னையை வணங்க ஆயிரக்கணக்கானோர் ஒன்றுகூடுகின்றனர்.",
      patronessQuote: "தேவனின் பரிசுத்த தாயே, எங்களுக்காக வேண்டிக் கொள்ளுங்கள்.",

      aboutLabel: "எங்கள் பாரம்பரியம்",
      aboutTitle: "நம்பிக்கையும் பக்தியும் கொண்ட ஒரு பாரம்பரியம்",
      aboutSubtitle: "மூன்று நூற்றாண்டுகளுக்கு மேலாக நிலையான அருள்",
      aboutP1:
        "வடகாங்குளம் மாதா திருச்சபை, வடகாங்குளத்தின் இதயத்தில் ஆன்மிகத்தின், சமூகத்தின் ஒளிக்கம்பமாகத் திகழ்கிறது. 1685-ல் இயேசுசபை அப்போஸ்தலர் புனித அருளானந்தரால் நிறுவப்பட்ட இந்தத் திருஸ்தலம், மூன்று நூற்றாண்டுகளுக்கும் மேலாக விசுவாசிகளுக்கான வீடாகவும், சோர்வுற்றோருக்கான புகலிடமாகவும், அசையாத பக்திக்கான சாட்சியாகவும் நின்றுள்ளது.",
      aboutP2:
        "புனித குடும்பத்திற்கு அர்ப்பணிக்கப்பட்ட எங்கள் ஆலயம் வடவை மாதா என அன்போடு அழைக்கப்படுகிறது. இந்தப் புனிதப் பூமியின் ஒவ்வொரு மூலையிலும் ஜெபங்கள், கீதங்கள், அன்பினாலும் விசுவாசத்தினாலும் இணைந்த சமூகத்தின் கதகதப்பு எதிரொலிக்கிறது — தூத்துக்குடியின் முதல் ஆயரால் 'சின்ன ரோம்' என அழைக்கப்பட்ட அளவுக்கு ஆழமான மரபு.",
      aboutQuote:
        "விசுவாசிகளுக்கான வீடு, சோர்வுற்றோருக்கான புகலிடம், ஒவ்வொரு உள்ளத்திற்கும் ஒரு புகலிடம்.",

      verseLabel: "அமைதியின் வார்த்தை",
      verse:
        "உழைத்து சுமைசுமக்கிற யாவரும் என்னிடத்தில் வாருங்கள்; நான் உங்களுக்கு இளைப்பாறுதல் தருவேன்.",
      verseRef: "மத்தேயு 11:28",

      welcomeLabel: "வருக",
      welcomeTitle: "அமைதியின் புகலிடம்",
      welcomeBody:
        "வடகாங்குளம் மாதா திருச்சபை, தலைமுறை தலைமுறையாக பக்தர்களின் அமைதியான புகலிடமாக நின்றுள்ளது — இடைவெளி கொள்ள, ஜெபிக்க, அமைதியாக இருக்க ஓரிடம். நம்பிக்கையோடு, தேடலோடு அல்லது துன்பத்தோடு நீங்கள் வந்தாலும், இங்கே வரவேற்கப்படுகிறீர்கள்.",

      showcaseLabel: "புனிதமான தருணங்கள்",
      showcaseTitle: "ஒளி, பக்தியில் கலக்கும் இடம்",
      showcaseBody:
        "ஏற்றப்பட்ட ஒவ்வொரு திரியும், அமைதியான ஒவ்வொரு ஜெபமும், காலை வெளிச்சத்தின் ஒவ்வொரு கதிரும் — எங்கள் ஆலய வாழ்க்கையின் ஓசையை உருவாக்குகிறது.",

      festivalsLabel: "புனித நாட்காட்டி",
      festivalsTitle: "திருவிழாக்களும் கொண்டாட்டங்களும்",
      festivalsBody:
        "மாதாவின் ஆண்டு திருவிழாவிலிருந்து கிறிஸ்துமஸ் இரவு வரை, ஆண்டு முழுவதும் எங்கள் சமூகம் மகிழ்ச்சியோடும், பாடலோடும், நம்பிக்கையோடும் ஒன்றுகூடுகிறது.",
      festivalsCta: "திருவிழாக்களைப் பார்க்க",

      massLabel: "தினசரி வழிபாடு",
      massTitle: "திருப்பலி நேரங்கள்",
      massCta: "முழு அட்டவணை",

      galleryLabel: "காட்சிகள்",
      galleryTitle: "காட்சி பயணம்",
      galleryCta: "புகைப்படங்கள்",

      visitLabel: "வருகை",
      visitTitle: "எப்போதும் வரவேற்கப்படுகிறீர்கள்",
      visitBody:
        "எப்போது வேண்டுமானாலும் உள்ளே வாருங்கள். எங்கள் கதவுகள், எங்கள் இதயங்களைப் போலவே, திறந்தே இருக்கின்றன.",
      visitCta: "வழிகாட்டியைப் பெறுக",
    },
    history: {
      label: "எங்கள் பாரம்பரியம்",
      title: "தலைமுறைகளால் சுமக்கப்பட்ட கதை",
      intro:
        "மூன்று நூற்றாண்டுகளுக்கு மேலாக — 1685-ல் புனித அருளானந்தர் தனது முதல் கூரை வேய்ந்த கோயிலை அமைத்தது முதல் — வடகக்குளம் மாதா எண்ணற்ற குடும்பங்களின் விசுவாசத்திற்கும், திருவிழாக்களுக்கும், மாதாவின் முன் சமர்ப்பிக்கப்பட்ட அமைதியான ஜெபங்களுக்கும் சாட்சியாக நின்று வருகிறது.",
      timeline: [
        {
          year: "1685",
          title: "புனித அருளானந்தர் நிறுவியது",
          body: "தமிழில் அருளானந்தர் என அறியப்படும் இயேசுசபை அப்போஸ்தலர் இங்கு ஒரு சிறிய கூரை வேய்ந்த கோயிலை அமைத்து புனித குடும்பத்திற்கு அர்ப்பணித்தார். ஓராண்டுக்குள் இரு நூற்றுக்கும் மேற்பட்டோருக்கு திருமுழுக்கு அளித்தார் — வடகக்குளத்தின் முதல் கிறிஸ்தவ சமூகம் இவ்வாறு பிறந்தது.",
        },
        {
          year: "1744",
          title: "புனித தேவசகாயம் திருமுழுக்கு",
          body: "திருவிதாங்கூர் தமிழ் கிறிஸ்தவரான தேவசகாயம் பிள்ளை இந்த ஆலயத்தில் அருட்தந்தை பத்தேரியால் திருமுழுக்கு பெற்றார். பின்னர் தனது விசுவாசத்திற்காக உயிர் கொடுத்து, 2022-ல் இந்திய பிறப்பின் முதல் இல்லறப் புனிதராக அறிவிக்கப்பட்டார்.",
        },
        {
          year: "1803",
          title: "மாதாவின் காட்சி",
          body: "என்றும் நினைவில் நிலைத்திருக்கும் ஒரு நாளில், விண்ணேற்பு மாதாவின் திருஉரு பக்தர்களை நோக்கி தனது கைகளை நீட்டியதாக கூறப்படுகிறது — தலைமுறை தலைமுறையாக வடவையின் மாதா பக்தியை ஈர்த்த ஓர் அருளின் அடையாளம்.",
        },
        {
          year: "1872",
          title: "கல் ஆலயம்",
          body: "1855 ஆகஸ்ட் 9-ல் அடிக்கல் நாட்டப்பட்ட பின், தற்போதைய கல் ஆலயம் 1872 ஜூன் 29-ல் மதுரை ஆயர் கானோஸ் அவர்களால் ஆசீர்வதிக்கப்பட்டது — வளர்ந்து வரும் யாத்திரிகர் சமூகத்தை வரவேற்க கட்டப்பட்டது.",
        },
        {
          year: "1926",
          title: "சின்ன ரோம்",
          body: "தூத்துக்குடியின் முதல் ஆயர் வடகக்குளத்திற்கு 'சின்ன ரோம்' என்ற பெயரை அளித்தார் — மக்களின் இடைவிடாத விசுவாசத்தையும் ஆலயத்தின் ஆன்மிக மரபையும் அங்கீகரித்து.",
        },
        {
          year: "1993",
          title: "புனிதத்தலமாக அறிவிப்பு",
          body: "வடவை மாதா ஆலயம் முறையாக புனிதத்தலம் (Shrine) எனத் தரம் உயர்த்தப்பட்டது — தென்னிந்தியாவின் மாதா பக்தி மையமாக நீண்டகாலமாக நிலைபெற்றிருந்த தனது பாத்திரத்தை உறுதிப்படுத்தியது.",
        },
      ],
    },
    festivals: {
      label: "புனித நாட்காட்டி",
      title: "திருவிழாக்களும் கொண்டாட்டங்களும்",
      intro:
        "எங்கள் ஆலயத்தின் ஆண்டு பெரிய மற்றும் சிறிய கொண்டாட்டங்களால் நெய்யப்பட்டது — சமூகம் வழிபாட்டிலும் மகிழ்ச்சியிலும் ஒன்றுகூடும் தருணங்கள்.",
      featuredLabel: "ஆண்டு திருவிழா",
      featured: {
        name: "விண்ணேற்பு மாதா திருவிழா",
        date: "ஆகஸ்ட் 6 – 15",
        body: "ஆண்டின் மிகப்பெரிய கொண்டாட்டம் — பத்து நாட்கள் திருப்பலி, நவநாள் ஜெபம், ஊர்வலம் மூலம் மாதாவைக் கௌரவிக்கிறோம்; பதினைந்தாம் நாள் பெருந்திருவிழாவிற்கு பல்வேறு பகுதிகளிலிருந்தும் யாத்திரிகர்கள் வருகின்றனர்.",
        schedule: [
          { when: "ஆகஸ்ட் 6 · 1ஆம் நாள்", detail: "கொடியேற்றம் — மாலை 6:00" },
          { when: "ஆகஸ்ட் 6 – 14 · 1–9 நாட்கள்", detail: "தமிழ் திருப்பலி — காலை 5:00, 6:15 & 7:15" },
          { when: "ஆகஸ்ட் 14 · 9ஆம் நாள்", detail: "மலையாளம் திருப்பலி — மாலை 4:00" },
          { when: "ஆகஸ்ட் 15 · திருவிழா நாள்", detail: "ஆயர் திருப்பலி — காலை 5:00 · ஆங்கிலம் திருப்பலி" },
        ],
      },
      yearLabel: "ஆண்டு முழுவதும் திருவிழாக்கள்",
      list: [
        {
          name: "புனித செபஸ்தியார் ஆலய திருவிழா",
          date: "ஜனவரி 11 – 20",
          body: "வீர இரத்தசாட்சி புனித செபஸ்தியாரின் சிற்றாலயத்தில் பத்து நாட்கள் பக்தி முயற்சி.",
        },
        {
          name: "காணிக்கை மாதா திருவிழா",
          date: "ஜனவரி 31 – பிப்ரவரி 2",
          body: "குழந்தை மரியாளை ஆலயத்தில் காணிக்கையாக ஒப்படைத்ததை நினைவுகூரும் மூன்று நாள் திருவிழா — காணிக்கை மாதா.",
        },
        {
          name: "புனித அருளானந்தர் திருவிழா",
          date: "பிப்ரவரி 3 – 4",
          body: "1685-ல் எங்கள் ஆலயத்தை நிறுவிய இயேசுசபை இரத்தசாட்சி அருளானந்தரைக் கௌரவித்து.",
        },
        {
          name: "லூர்து மாதா திருவிழா",
          date: "பிப்ரவரி 5 – 11",
          body: "லூர்தில் தோன்றிய மாதாவைக் கௌரவித்து, நோயாளர்களுக்காக சிறப்பு ஜெபம்.",
        },
        {
          name: "புனித அந்தோணியார் ஆலய திருவிழா",
          date: "ஜூன் 1 – 13",
          body: "ஏழைகளின் துணைவரான புனித அந்தோணியாரின் திருவிழாவை நோக்கிய பதின்மூன்று நாட்கள்.",
        },
        {
          name: "புனித ஜார்ஜ் ஆலய திருவிழா",
          date: "ஜூன் 18 – 27",
          body: "வீர இரத்தசாட்சி புனித ஜார்ஜின் ஆலயத்தில் பத்து நாட்கள் பக்தி முயற்சி.",
        },
        {
          name: "வேளாங்கண்ணி மாதா ஆலய திருவிழா",
          date: "ஆகஸ்ட் 30 – செப்டம்பர் 8",
          body: "ஆரோக்கிய மாதா வேளாங்கண்ணிக்கு நவநாள் ஜெபம், அவளது பிறந்தநாளில் நிறைவடைகிறது.",
        },
        {
          name: "புனித மிக்கேல் ஆலய திருவிழா",
          date: "செப்டம்பர் 20 – 29",
          body: "விசுவாசிகளின் பாதுகாவலர் புனித மிக்கேல் வானதூதரை மிக்கேல்பாளையத்தில் கௌரவித்து.",
        },
      ],
      marianLabel: "சிறப்பு மாதா நாட்கள்",
      marian: [
        {
          name: "மாதா பிறந்தநாள்",
          date: "செப்டம்பர் 8",
          body: "அன்னை மரியாளின் பிறந்தநாள், ஆலயம் முழுவதும் மகிழ்ச்சியோடு கொண்டாடப்படுகிறது.",
        },
        {
          name: "மாதா காட்சி அற்புதம்",
          date: "அக்டோபர் 23",
          body: "மாதா காட்சி — மாதாவின் திருஉரு பக்தர்களை நோக்கி தனது கைகளை நீட்டியதாக நினைவுகூரப்படும் நாள்.",
        },
      ],
    },
    saints: {
      label: "வடவை மாதாவின் புனிதர்கள்",
      title: "எங்கள் ஆலய புனிதர்கள்",
      intro:
        "எங்கள் கோயிலை நிறுவிய அப்போஸ்தலர் முதல், எங்கள் தீர்த்தத்தில் திருமுழுக்கு பெற்ற இல்லறப் புனிதர் வரை — இந்த மண் புனித வாழ்க்களால் ஆசீர்வதிக்கப்பட்டது. அவர்களின் திருவிழாக்கள் இன்றும் எங்கள் சமூகத்தை பாடலிலும் ஊர்வலத்திலும் ஒன்றுசேர்க்கின்றன.",
      list: [
        {
          name: "புனித அருளானந்தர்",
          feast: "திருவிழா — பிப்ரவரி 4",
          epithet: "எங்கள் ஆலய நிறுவனர்",
          body: "தமிழில் அருளானந்தர் என அறியப்படும் போர்த்துகீசிய இயேசுசபை அருட்தந்தை. 1685-ல் இங்கு முதல் கோயிலை அமைத்து புனித குடும்பத்திற்கு அர்ப்பணித்தார். 1693-ல் இரத்தசாட்சியாக மரிப்பதற்கு முன் இரு நூற்றுக்கும் மேற்பட்டோருக்கு திருமுழுக்கு அளித்தார்.",
        },
        {
          name: "புனித தேவசகாயம் பிள்ளை",
          feast: "திருவிழா — ஜனவரி 14",
          epithet: "இந்தியாவின் முதல் இல்லறப் புனிதர்",
          body: "1744-ல் எங்கள் ஆலயத்தில் திருமுழுக்கு பெற்ற தமிழ் கிறிஸ்தவர். 1752-ல் தனது விசுவாசத்திற்காக இரத்தசாட்சியாக மரித்தார். 2022-ல் புனிதராக அறிவிக்கப்பட்டார் — புனிதர் பட்டத்திற்கு உயர்த்தப்பட்ட இந்திய பிறப்பின் முதல் இல்லறக் கத்தோலிக்கர்.",
          slug: "devasahayam-pillai",
        },
        {
          name: "புனித செபஸ்தியார்",
          feast: "திருவிழா — ஜனவரி 20",
          epithet: "வீரரும் இரத்தசாட்சியும்",
          body: "ரோமப் பேரரசை விட கிறிஸ்துவை தேர்ந்தெடுத்து, தனது விசுவாசத்திற்காக உயிர் கொடுத்த ரோம வீரர். எங்கள் ஆலயத்திற்குள் இருக்கும் அவரது சிற்றாலயம், அரசனுக்கும் இறையரசுக்கும் சேவை செய்தவர்களின் தைரியத்திற்கு சாட்சியாகத் திகழ்கிறது.",
        },
        {
          name: "புனித மிக்கேல் வானதூதர்",
          feast: "திருவிழா — செப்டம்பர் 29",
          epithet: "விசுவாசிகளின் பாதுகாவலர்",
          body: "வானக சேனையின் தலைவர், தீமைக்கு எதிரான கேடயம். 1910-ல் கட்டப்பட்ட மிக்கேல்பாளையம் ஆலயம் அவரது பாதுகாப்பையும், அவரது அரணைத் தேடிய தலைமுறைகளின் அமைதியான ஜெபங்களையும் சுமக்கிறது.",
        },
      ],
    },
    saintDevasahayam: {
      back: "எங்கள் ஆலய புனிதர்கள்",
      label: "எங்கள் ஆலய புனிதர்",
      name: "புனித தேவசகாயம் பிள்ளை",
      epithet: "தேவசகாயம் — “கடவுளே என் துணை”",
      intro:
        "திருவிதாங்கூரின் பிரபுவும் வீரருமான இவர், எங்கள் ஆலயத் தீர்த்தத்தில் திருமுழுக்கு பெற்று, கிறிஸ்துவுக்காக தன் உயிரை அர்ப்பணித்தார். 2022-ல் இந்தியப் பிறப்பின் முதல் இல்லறக் கத்தோலிக்கராக பீடத்திற்கு உயர்த்தப்பட்டார்.",
      feast: "திருவிழா — ஜனவரி 14",
      canonised: "திருத்தந்தை பிரான்சிஸ் அவர்களால் 15 மே 2022-ல் புனிதராக அறிவிக்கப்பட்டார்",
      quote: "ஓ இயேசுவே, உம்மீதுள்ள அன்பினாலேயே நான் துன்பப்படுகிறேன்.",
      sections: [
        {
          heading: "அரசனின் வீரன்",
          body: "திருவிதாங்கூர் அரசில் நாயர் குலத்தைச் சேர்ந்த பிரபுவாக நீலகண்ட பிள்ளை என்ற பெயரில் பிறந்தார். அறிவிலும் ஆளுமையிலும் சிறந்த இவர், மார்த்தாண்ட வர்மா மன்னரின் அரசவையில் உயர் பதவிக்கு உயர்ந்து, படைகளின் தளபதிப் பொறுப்பையும் ஏற்றார். எனினும் தொடர்ந்து வந்த துன்பங்கள், பதவியும் சலுகையும் தர முடியாத ஆழ்ந்த ஆறுதலை அவர் தேட வைத்தன.",
        },
        {
          heading: "எங்கள் தீர்த்தத்தில் திருமுழுக்கு",
          body: "தன் துயரத்தில், அரசப் பணியில் இருந்த ஐரோப்பிய அதிகாரியும் பக்தியுள்ள கிறிஸ்தவருமான யூஸ்தாகியுஸ் தெ லானோய் அவர்களிடம் மனம் திறந்தார்; அவர் ஒரே மெய்க் கடவுளைப் பற்றி பேசினார். அந்த வார்த்தைகள் இவரது உள்ளத்தில் வான ஆறுதலாக இறங்கின. தெ லானோய், அப்போது வடகாங்குளம் கிறிஸ்தவர்களின் பொறுப்பில் இருந்த இயேசுசபை அருட்தந்தை பூத்தாரியிடம் இவரை அனுப்பினார். அவர் 1744-ல் இவருக்கு திருமுழுக்கு அளித்து, “கடவுளே என் துணை” எனப் பொருள்படும் தேவசகாயம் என்ற பெயரை — லாசர் என்னும் பெயருக்கு இணையாக — சூட்டினார். விரைவில் இவரது மனைவியும் உறவினர்கள் பலரும் விசுவாசத்தில் இணைந்தனர்.",
        },
        {
          heading: "கைது மற்றும் விசாரணை",
          body: "அருட்தந்தை பூத்தாரி அப்போது வடகாங்குளம் ஆலயத்தைக் கட்டிக்கொண்டிருந்தார். அதற்குத் தேவையான மரத்தை வெட்ட அரச அனுமதியை தேவசகாயம் கோரியபோது, செல்வாக்குமிக்க ஒரு பிராமணர் அதை ஒரு வாய்ப்பாக்கி அவரை விசுவாசத்தைக் கைவிடச் சொன்னார். அவர் மறுத்தார்; சூழ்ச்சியாலும் பொய்க் குற்றச்சாட்டாலும் அவரை கைது செய்ய அரச ஆணை பிறந்தது. மன்னர் முன் நிறுத்தப்பட்டபோதும் அவர் கிறிஸ்துவை மறுக்க மறுத்தார்; எனவே அவருக்கு மரண தண்டனை விதிக்கப்பட்டது.",
        },
        {
          heading: "நீண்ட இரத்தசாட்சியம்",
          body: "மூன்று ஆண்டுகள் அவர் துன்பப்படுத்தப்பட்டார். கைகள் கட்டப்பட்டு எருமை மீது ஏற்றப்பட்டு ஊர் ஊராக அலைக்கழிக்கப்பட்டார்; முள் பதித்த சாட்டையால் அடிக்கப்பட்டு, காயங்களில் அரைத்த மிளகு தேய்க்கப்பட்டது — ஆனால் அவர், “இயேசுவின் அன்பினாலேயே நான் துன்பப்படுகிறேன்” என்றே பதிலளித்தார். தாகத்தில் கடல் நீர் கொடுக்கப்பட்டபோது, அதைக் குடித்து அது இனிமையாக இருந்ததைக் கண்டார். பாலைவனத்தில் ஒரு மரத்தில் மாதக்கணக்கில் சங்கிலியால் கட்டப்பட்டிருந்தபோது, அவருக்குக் கொண்டுவரப்பட்ட நற்கருணையால் வலுவூட்டப்பட்டார்; விசுவாசிகள் திரண்டு வர, அவரது ஜெபத்தால் அற்புதங்கள் நிகழ்ந்ததாகச் சொல்லப்பட்டு, அந்த இடம் ஒரு புனிதப் பயணத் தலமாயிற்று.",
        },
        {
          heading: "மகிமையில் முடிசூட்டப்பட்டார்",
          body: "1752 ஜனவரி 14-ல் வீரர்கள் அவரை வெளியே அழைத்துச் சென்று சுட்டனர்; இயேசு, மரியா என்ற இனிய நாமங்களை உச்சரித்தபடி அவர் வீழ்ந்தார். அவரது உடல் கோட்டாறில் உள்ள புனித பிரான்சிஸ் சேவியர் ஆலயத்தில் அடக்கம் செய்யப்பட்டது. 2022 மே 15-ல் திருத்தந்தை பிரான்சிஸ் அவரை புனிதராக அறிவித்தார் — இந்தியப் பிறப்பின் முதல் இல்லறக் கத்தோலிக்க புனிதர் தேவசகாயம் பிள்ளை.",
        },
      ],
      relicsHeading: "வடகாங்குளத்தில் பாதுகாக்கப்படுபவை",
      relicsBody:
        "இந்த இரத்தசாட்சியுடன் எங்கள் ஆலயத்திற்கு உயிருள்ள தொடர்பு உண்டு: அவர் அணிந்த ஆடையின் ஒரு பகுதியையும், அவர் கட்டப்பட்ட அதே சங்கிலிகளையும் வடகாங்குளம் ஆலயம் பாதுகாத்து வைத்துள்ளது. இந்த ஆலயத்தைக் கட்டுவதற்காகவே அவரது இறுதி வேதனை தொடங்கியது.",
    },
    gallery: {
      label: "காட்சி பயணம்",
      title: "அருளின் காட்சிகள்",
      intro:
        "ஒளி, பக்தி, அமைதியின் புகைப்படங்கள் — ஆலயத்திலும் சுற்றுப்புறத்திலும் பதிவு செய்யப்பட்ட தருணங்கள்.",
    },
    mass: {
      label: "வழிபாடும் கொண்டாட்டங்களும்",
      title: "திருப்பலி & திருவிழா",
      intro:
        "எல்லோரும் எங்களோடு ஜெபிக்க வரவேற்கப்படுகிறீர்கள். கீழே எங்கள் வாரந்தோறும் திருப்பலி நேரங்கள், மாதந்தோறும் நடைபெறும் பக்தி முயற்சிகள், மற்றும் ஆண்டு முழுவதும் எங்கள் ஆலயம் கொண்டாடும் திருவிழாக்கள் இடம்பெற்றுள்ளன.",
      weeklyLabel: "வாரந்தோறும் வழிபாடு",
      cards: [
        {
          title: "தினசரி திருப்பலி",
          subtitle: "திங்கள் – சனி",
          times: ["காலை 5:00", "காலை 6:10"],
        },
        {
          title: "ஞாயிறு திருப்பலி",
          subtitle: "ஒவ்வொரு ஞாயிறும்",
          times: ["காலை 5:00", "காலை 7:00", "காலை 9:30"],
        },
        {
          title: "மாலை வழிபாடு",
          subtitle: "தினமும்",
          times: [
            "மாலை 6:30 — ஜெபமாலை",
            "மாலை 7:00 — ஆசீர்வாதம்",
            "ஞாயிறு — மாலை 5:30 முதல்",
          ],
        },
      ],
      devotionsLabel: "பிற மொழி திருப்பலிகளும் மாதந்தோறும் பக்தி முயற்சிகளும்",
      devotionsNote:
        "மாதம் ஒருமுறை நடைபெறுகிறது. திருவிழா நாட்களில் நேரம் மாறக்கூடும் — ஆலய அலுவலகத்தில் உறுதிப்படுத்திக் கொள்ளவும்.",
      devotions: [
        { when: "முதல் ஞாயிறு", time: "மாலை 5:00", service: "ஆங்கிலம் திருப்பலி" },
        { when: "முதல் திங்கள்", time: "காலை 11:00", service: "மலையாளம் திருப்பலி" },
        { when: "முதல் வெள்ளி", time: "மதியம் 3:00", service: "திவ்விய கருணை வழிபாடு" },
        { when: "முதல் சனி", time: "காலை 10:00", service: "தமிழ் திருப்பலி" },
        { when: "முதல் சனி", time: "மாலை 6:30", service: "மாதா ஊர்வலம் & ஆராதனை" },
        { when: "இரண்டாம் வெள்ளி", time: "மாலை 6:30", service: "புனித தேவசகாயம் ஊர்வலம் & ஆராதனை" },
        { when: "கடைசி வெள்ளி", time: "மாலை 6:30", service: "சகாய மாதா ஆலயம்" },
      ],
    },
    contact: {
      label: "எங்களை அணுகுங்கள்",
      title: "வருகை மற்றும் தொடர்பு",
      intro:
        "உங்களிடமிருந்து கேட்க விரும்புகிறோம். தொடர்பு கொள்ளுங்கள், வாருங்கள், அல்லது எங்களோடு ஜெபியுங்கள்.",
      address: "வடகாங்குளம் மாதா திருச்சபை, வடகாங்குளம், தமிழ்நாடு, இந்தியா",
      phone: "+91 00000 00000",
      email: "info@vadavaimatha.org",
      formName: "உங்கள் பெயர்",
      formEmail: "உங்கள் மின்னஞ்சல்",
      formMessage: "உங்கள் செய்தி",
      formSubmit: "செய்தி அனுப்பு",
      directions: "வழிகாட்டியைப் பெறுக",
    },
    footer: {
      tagline: "நம்பிக்கை, ஜெபம், சமூகத்தின் புகலிடம்.",
      explore: "பார்வை",
      visit: "வருகை",
      connect: "தொடர்பு",
      rights: "அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.",
    },
  },
} as const;

export type Dict = typeof dict.en;
