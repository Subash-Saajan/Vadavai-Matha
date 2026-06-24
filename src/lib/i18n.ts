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
      patronessTitle: "Our Lady of Assumption",
      patronessSubtitle: "Paraloga Matha",
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
      overlineLabel: `The Story of Little Rome`,
      overview: `For more than three centuries the story of Vadakkankulam has been written under the roof of one church and around the love of one Mother. From a Christian woman's roadside cross in a southern forest to the unique two-nave "Little Rome" where Our Lady once wept, this is the living history of the Holy Family Shrine, Vadavai Matha.`,
      eras: [
        {
          id: `clearing-in-the-forest`,
          span: `1542–1693`,
          heading: `A Clearing in the Forest`,
          blurb: `Out of St Francis Xavier's coastal mission and St John de Britto's daring inland journeys, a Christian settlement took root around one devout woman's roadside cross in a southern forest.`,
          dots: [
            {
              year: `1542–1545`,
              title: `St Francis Xavier on the Pearl Fishery Coast`,
              body: `When St Francis Xavier landed among the Parava pearl-divers of the Tirunelveli coast around 1542, he baptised some twenty thousand souls in barely two years and lit the flame of faith across the deep south. Vadakkankulam, set inland in the forest, would grow as a later branch of that great coastal Christianity.`,
            },
            {
              year: `c.1680`,
              title: `Santhaayi Ammaiyar settles the forest clearing`,
              body: `Around 1680 a devout Christian woman, Santhaayi (Sandhai) Ammaiyar, came with her family from Thoppuvilai and made her home in what was then only forest, full of bushes, trees and pits. So deep was her love of Our Lady that she raised a little roadside Crusadi, a cross-shrine, opposite her door, and a Christian settlement began to gather around her faith.`,
            },
            {
              year: `c.1680`,
              title: `A wayside cross on the kingdoms' road`,
              body: `Vadakkankulam, "the northern tank," lay on the forest path between Travancore and the Pandyan country, a natural halting place for travellers and seekers of the faith. While gathering cotton in the fields, Santhaayi met a priest on horseback and begged him to bless her house and her Crusadi, by parish tradition St John de Britto himself.`,
            },
            {
              year: `1685`,
              title: `The thatched Holy Family chapel`,
              body: `Around 1684 St John de Britto, known to Tamils as Arulanandar, penetrated as far south as Vadakkankulam, and in 1685 he raised a small thatched chapel in the clearing and consecrated it to the Holy Family. From that humble roof of branches the parish took the name it still bears, and the colonial gazetteer remembers this as the place of the Jesuits' first converts among the Shanar (Nadar) people.`,
            },
            {
              year: `1686`,
              title: `About two hundred baptised`,
              body: `Returning to the young mission, de Britto gathered the people and baptised some two hundred of them into the Catholic Church, the first great harvest of Vadakkankulam. A village born of one woman's roadside cross had become a true Christian community.`,
            },
            {
              year: `1693`,
              title: `Martyrdom of St John de Britto at Oriyur`,
              body: `On 4 February 1693 the founder of the Vadakkankulam mission was beheaded for the faith at Oriyur in the Marava country, aged forty-five. Canonised in 1947, Arulanandar is honoured here as the parish's founding saint, his blood the seed from which the community grew.`,
            },
          ],
        },
        {
          id: `first-inland-parish`,
          span: `1698–1740`,
          heading: `The First Inland Parish`,
          blurb: `Under its own pastors and the Society of Jesus, the forest clearing flourished into the senior interior congregation of the whole southern mission.`,
          dots: [
            {
              year: `1698`,
              title: `The first parish priests`,
              body: `From around 1698 Vadakkankulam received its own dedicated pastors, and from this point the forest clearing was a true parish shepherded by an unbroken line of priests. It was growing into the first major inland Catholic parish within the lands of what is now the Diocese of Thoothukudi.`,
            },
            {
              year: `1712–1713`,
              title: `A remarkable harvest of souls`,
              body: `In just two years around 1712–13 nearly eight hundred adults were baptised at Vadakkankulam, besides many children, as the inland mission flourished. What had begun with two hundred under a thatched roof was now one of the great Christian communities of the southern frontier.`,
            },
            {
              year: `1714`,
              title: `A Jesuit residence on the frontier`,
              body: `By 1714 the flourishing congregation was recognised among the senior interior stations of the Society of Jesus and established as a Jesuit residence in its own right. Bishop Caldwell's history credits Fr Brandolini with founding the congregation here, marking Vadakkankulam as the first great inland parish of the region.`,
            },
          ],
        },
        {
          id: `statue-and-the-saint`,
          span: `1741–1775`,
          heading: `The Statue and the Saint`,
          blurb: `The golden age of Fr Buttari: a Marian statue carried ashore from the sea, the baptism of a future saint, and the first stone church rising in the form of a cross.`,
          dots: [
            {
              year: `1742–43`,
              title: `The statue arrives from the sea`,
              body: `In the years 1742–43 a wooden box stencilled "To Vadakankulam, From Portugal" and holding carved images of Our Lady was carried by the sea currents and cast ashore at Kootapuli. Fishermen brought it to the parish priest, Fr John Baptist Buttari, who kept one image for Vadakkankulam, gave a second to Kamanayakkanpatti and the third into the Bishop's care. The statue kept here, Our Lady of the Assumption, is the very image that would one day weep.`,
            },
            {
              year: `1745`,
              title: `St Devasahayam baptised here`,
              body: `On 14 May 1745, after nine months of instruction, Fr Buttari baptised Neelakanta Pillai, a Nair officer from the court of Travancore, in the Holy Family Church, giving him the name Devasahayam ("God is my help"); his godfather was the catechist Gnanaprakasam Pillai. The Holy See itself confirms Vadakkankulam as the place of this baptism, the single best-documented fact in the parish's whole history.`,
            },
            {
              year: `1749`,
              title: `Foundation of the first stone church`,
              body: `In 1749 Fr Buttari held the kankol (foundation-stone) festival for a larger, lasting church of stone and mortar, for the Catholic community had grown too great for de Britto's old thatched shelter. It was the beginning of the first stone church here, whose bell, half a century later, would summon the village to the weeping of Our Lady.`,
            },
            {
              year: `1752`,
              title: `The cross-shaped church completed`,
              body: `In 1752 the stone church was finished, built in the form of a cross and facing east toward the rising sun, the work begun by Fr Buttari and carried to completion by Fr Clement Thomassini. In Thomassini's time the great Feast of the Assumption took root here as the parish's principal festival, the celebration that endures to this day.`,
            },
            {
              year: `1752`,
              title: `Martyrdom of St Devasahayam Pillai`,
              body: `After three years of cruel suffering, paraded on a buffalo, scourged and chained for months to a tree in the wilderness, Devasahayam was shot at Kattadimalai near the Aralvaimozhi pass on 14 January 1752, dying with the names of Jesus and Mary on his lips. His head-turban relic is treasured at Vadakkankulam to this day, and his wife, baptised Gnanapoo Theresa, lies buried in the parish cemetery.`,
            },
            {
              year: `1773–1775`,
              title: `The Jesuits suppressed; the old mission ends`,
              body: `In 1773 Pope Clement XIV suppressed the Society of Jesus throughout the world, and the care of Vadakkankulam began to pass to Pondicherry and Goan priests. The last of the old Jesuit fathers, Fr Thomassini, died at Vadakkankulam in 1775, closing the chapter of the Old Madurai Mission for the parish.`,
            },
          ],
        },
        {
          id: `the-weeping-madonna`,
          span: `1775–1838`,
          heading: `The Weeping Madonna`,
          blurb: `Through sixty-three quiet years without a resident Jesuit, the parish kept the faith on its own, and on one October Friday in 1803 Our Lady wept above the altar before the gathered village.`,
          dots: [
            {
              year: `1775–1838`,
              title: `Sixty-three years without a resident father`,
              body: `For more than sixty years after the Suppression no resident Jesuit shepherded Vadakkankulam; the flock was tended only by visiting priests from Pondicherry and Goa, and the parish kept the faith largely on its own. Of this whole quiet stretch the chronicler Besse wrote that only one event survived "with all guarantees of its authenticity": the wonder of 1803.`,
            },
            {
              year: `1803`,
              title: `The weeping of Our Lady, 23 October 1803`,
              body: `On a Friday forenoon, about 11:20, in the Tamil year 979, month of Aippasi, a man named Savarimuthu Pillai knelt before the statue of Our Lady of the Assumption above the altar. As he prayed a cloud-like veil gathered over her face, her eyes rose to heaven and filled with tears, the tears ran down her coral-like cheeks, and her folded hands slowly opened and reached outward, the moment the parish has cherished ever since.`,
            },
            {
              year: `1803`,
              title: `The whole village came and wept`,
              body: `The catechist Madurendira Annaviyar climbed to the altar and wiped the tears, but they would not stop; then the church bell was rung and the whole village hurried in at that unusual hour. Gazing on the marvel, the people wept and sang the old penitential chants, "Parce Domine, parce populo tuo" ("Spare, O Lord, spare Your people"), until at last the statue returned to its ordinary look.`,
            },
            {
              year: `1803`,
              title: `The witnesses who saw and affirmed`,
              body: `The wonder was seen by many eyes: the catechists Zacharias, Vyagappar and Yagappar Pillai, and the European laywoman Henriette Bilderbeck, who examined the statue closely and affirmed all three signs, the clouding face, the tears, and the opening hands. That same day the parish priest, Fr John Louis Cardoza, with another priest and Henriette, declared it an extraordinary marvel, a treasured local tradition the parish has guarded faithfully ever since.`,
            },
          ],
        },
        {
          id: `great-two-nave-church`,
          span: `1838–1872`,
          heading: `The Great Two-Nave Church`,
          blurb: `When the French Jesuits returned, the old stone chapel gave way to a church "probably without equal in the world": the unique open-compass church of two converging naves meeting at one altar.`,
          dots: [
            {
              year: `1838`,
              title: `The French Jesuits return`,
              body: `After more than sixty years without a resident Jesuit, the restored Society of Jesus came down into the southern mission and Vadakkankulam returned to Jesuit care. On their very first visit the new French fathers found the people seated apart by caste in the old chapel, a wound the parish would spend a century learning to heal.`,
            },
            {
              year: `1855`,
              title: `The foundation stone of the great church`,
              body: `On 9 August 1855 Bishop Alexis Canoz of Madurai blessed the foundation stone of the present Holy Family Church. Cut into that stone was the bold motto of the whole design: "Templum sit duplex, ara sed una" — let the temple be twofold, but the altar one; may both castes be of one faith and one mind.`,
            },
            {
              year: `1855–1872`,
              title: `Fr Joseph Grégoire, apostle of Vadakkankulam`,
              body: `For some seventeen patient years the work was driven by Fr Joseph Grégoire SJ, whom the chroniclers called "the apostle of Vadakenkoulam," the man who gave this community a church one historian called "probably without equal in the world." The Jesuit lay-brother Joseph Bergenthal engineered its twenty-four self-supporting arches, turned in lime and palm-toddy mortar without cement, iron, or a single wooden beam to hold them.`,
            },
            {
              year: `1861`,
              title: `Two bells cast in Lyon`,
              body: `The parish's twin bells were cast in 1861 at the Burdin foundry of Lyon in France, the gift of a benefactor named Casimir Grégoire. Packed in crates, they came by sea to Madras and up through Tirunelveli, and were finally hung in the new tower in 1872, their joined ringing giving, the people still say, a sweetness of sound heard nowhere else in this land.`,
            },
            {
              year: `1872`,
              title: `The unique two-nave church blessed`,
              body: `In 1872 Bishop Canoz blessed the finished Holy Family Church, the one true "open-compass" church, built as two separate naves splayed apart at the doors and converging like a wide V to meet at a single shared sanctuary. Two octagonal towers ninety-two feet high crown the white façade, and within, the vaults and pillars were painted in natural plant dyes and gold-gilding whose colours, a century and a half on, the parish marvels to find still unfaded.`,
            },
          ],
        },
        {
          id: `little-rome`,
          span: `1891–1944`,
          heading: `Little Rome`,
          blurb: `A festival chariot, a long journey toward unity across the two naves, the new Diocese of Tuticorin, and the loving title that became the village's second name.`,
          dots: [
            {
              year: `1891`,
              title: `The festival chariot is built`,
              body: `In 1891 the parish built its great festival chariot, a thirty-five-foot ther of jackfruit, teak and neem, carved by local "Vadavai" sculptors, to bear Our Lady through the streets at the Assumption. To this day the chariot procession draws roughly a hundred thousand pilgrims, many crossing over from Kerala, in the small hours of 15 August.`,
            },
            {
              year: `c.1910`,
              title: `The partition wall comes down`,
              body: `In the church Fr Grégoire had built with two separate naves, a wall once kept the castes from even seeing one another at worship. About 1910 Fr Adrien Caussanel, the fierce, ascetic priest who lived on milk and bananas for eighteen years, demolished that partition so that for the first time all castes stood and sang together as one people. It was a true act of reconciliation, a turning toward the unity the parish bears as its name today.`,
            },
            {
              year: `1923`,
              title: `The Diocese of Tuticorin is born`,
              body: `On 12 June 1923 the Diocese of Tuticorin was erected, and Vadakkankulam passed from the old Diocese of Trichinopoly into the new diocese of the Fishery Coast. The parish was raised to the dignity of a deanery, and its care passed from the Jesuit fathers into the hands of diocesan clergy under the first bishop, Most Rev. Dr Francis Tiburtius Roche, SJ.`,
            },
            {
              year: `1926`,
              title: `"Little Rome" — Chinna Romapuri`,
              body: `In 1926, struck by the grandeur of the Holy Family Church, the first Bishop of Tuticorin, Most Rev. Dr Francis Tiburtius Roche, SJ, lovingly named Vadakkankulam "Chinna Romapuri," Little Rome. The title has been the village's proud second name ever since, drawing pilgrims who come to see a church likened to the great basilica of Rome.`,
            },
            {
              year: `1944`,
              title: `Birthplace of the Rosarians in India`,
              body: `At the Fatima Giri Ashram on the rocky hill above the village, the Servant of God Antony Susainather founded the first Indian monastery of the Rosarian congregation in 1944. From this hilltop house of prayer the Rosarian Fathers spread through India, and alongside the Servite Sisters and the Bethany Sisters they remain woven into parish life today.`,
            },
          ],
        },
        {
          id: `shrine-and-the-saint`,
          span: `1993–present`,
          heading: `The Shrine and the Saint`,
          blurb: `Declared a shrine, crowned with a new flag-mast, and rejoicing at the canonisation of the saint baptised within its walls, Little Rome lives on as a thriving Marian pilgrimage town.`,
          dots: [
            {
              year: `1993`,
              title: `Declared a Shrine`,
              body: `On 6 August 1993 Bishop S.T. Amalanathar of Tuticorin consecrated the Holy Family Church and proclaimed it a sacred shrine, the Shrine of Our Lady of Assumption. With the honour came a monthly First-Saturday devotion of novena and adoration that pilgrims keep to this day.`,
            },
            {
              year: `2014`,
              title: `The festival chariot newly designed`,
              body: `In 2014 the parish had the great festival ther of the Assumption newly designed, carrying forward a chariot tradition that reaches back to the thirty-five-foot car first built by local Vadavai sculptors in 1891. In the same years the Calvary chapel of the Apparition shrine was completed and statues of St Devasahayam and St Arulanandar were set up.`,
            },
            {
              year: `2021`,
              title: `The flag-mast blessed`,
              body: `On 6 August 2021, the opening day of the Assumption feast, Bishop A. Stephen of Tuticorin blessed the parish's new flag-mast (kodimaram), from which the festival flag is hoisted to inaugurate the ten-day celebration. Its blessing crowned a season of renovation as the shrine prepared for its 150th-anniversary year.`,
            },
            {
              year: `2022`,
              title: `St Devasahayam Pillai, the first Indian lay saint`,
              body: `On 15 May 2022 Pope Francis canonised Devasahayam Pillai, who had been baptised in this very church on 14 May 1745, the first Indian layman ever raised to the altars. The whole parish rejoiced, for his head-turban relic is treasured here and exposed in a glass case each 15 August, and that year the parish also marked the 150th anniversary of the great church's blessing.`,
            },
            {
              year: `present day`,
              title: `Little Rome today`,
              body: `Vadakkankulam today is a remarkably literate, overwhelmingly Catholic town of some 10,500 parishioners in around 4,000 families, organised through Basic Christian Communities. The great August Perunkoor feast still draws close to a lakh of pilgrims for the chariot procession in the small hours of 15 August, and the parish keeps its faithful close through the monthly magazine Vadavai Matha Malar and its own live broadcasts.`,
            },
          ],
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
        "A nobleman and soldier of Travancore who was baptised at our parish font and gave his life for Christ. In 2022 he became the first Catholic layman of Indian birth raised to the altars — and our church still keeps the chains he wore.",
      feast: "Feast — 14 January",
      canonised: "Canonised 15 May 2022 by Pope Francis",
      facts: [
        { label: "Birth name", value: "Neelakanta Pillai" },
        { label: "Rank", value: "Nobleman and officer at the court of King Marthanda Varma of Travancore" },
        { label: "Baptised", value: "1744, by Fr Jean-Baptiste Bouttari, S.J. — at the parish of Vadakkankulam" },
        { label: "Martyred", value: "14 January 1752, at Aralvaimozhi (Kattadimalai), Travancore" },
        { label: "Buried", value: "Church of St Francis Xavier, Kottar (Nagercoil)" },
        { label: "Canonised", value: "15 May 2022, St Peter's Square, Rome — by Pope Francis" },
      ],
      quote: "O Jesus, it is for love of you that I suffer.",
      quoteAttribution: "— the martyr to his torturers, recorded in Le Maduré (Auguste Jean, S.J., 1894)",
      sections: [
        {
          heading: "A Soldier of the King",
          body: "He was born Neelakanta Pillai, a nobleman in the kingdom of Travancore. Gifted in mind and bearing, he rose to high office at the court of King Marthanda Varma and was entrusted with command in his armies, even being given charge of one of the royal fortresses. Yet, as the older chroniclers put it, “God reserved him for higher destinies” — a run of reverses plunged him into a sorrow that rank and royal favour could not heal.",
        },
        {
          heading: "The Friendship That Changed Everything",
          body: "In his trouble he confided in a fellow officer of the king's service, Eustachius De Lannoy — a European commander entrusted with one of Travancore's strongest fortresses, and, the sources say, “a most excellent Christian.” De Lannoy spoke to him of the imperishable goods promised to those who serve the one true God. The words fell on his soul, the old account remembers, “like a heavenly balm.” Convinced of the falseness of his old worship, Neelakanta declared himself ready for baptism.",
        },
        {
          heading: "Baptised at Our Font",
          body: "De Lannoy sent him to the Jesuit Father Bouttari, at that hour the parish priest of the Christians of Vadakkankulam. The Father, foreseeing the storm that would follow, urged caution: the convert would face the wrath of his own kinsmen, the hostility of the brahmins all-powerful at court, the certain loss of his royal office. The young man answered that having found the true God, he would never abandon him, “though it cost him every advantage of this world, and even life itself.” Fr Bouttari baptised him in 1744 and gave him the name Devasahayam — “God is my help,” the Tamil for Lazarus. His wife was soon baptised; then other relatives; even officers of the army he had once commanded.",
        },
        {
          heading: "The Quarrel Over Timber for Our Church",
          body: "Fr Bouttari was at that very time building the church at Vadakkankulam. Short of wood for it, he asked Devasahayam to obtain royal permission to cut timber from the king's forests. Devasahayam went to a brahmin who had long been his friend, of great credit at court — but the brahmin seized the meeting to demand that he renounce Christ. The dispute that followed the brahmin lost; humiliated, he swore: “Either I will make you renounce your religion, or you will pay for it with your head.” The convert replied in kind. So it was — in seeking timber for our own church — that the storm broke over him.",
        },
        {
          heading: "Arrest, Sentence, and an Averted Death",
          body: "Through intrigue and slander the brahmin obtained from the king a warrant of arrest. Devasahayam surrendered without resistance, asking only to bid farewell to his friend De Lannoy: “Courage,” the captain told him, “the moment has come to prove you are a worthy soldier of Jesus Christ.” A missionary was secretly brought to hear his confession. Brought before the king he confessed Christ, and was sentenced to death — yet the idol-priests, having consulted the auguries, declared the execution would bring calamity on the kingdom; the superstitious king revoked the order, “to the great regret of the convert, who feared for a moment that God did not judge him worthy of the crown of martyrdom.”",
        },
        {
          heading: "Paraded, Beaten, Given Sea-Water",
          body: "Unwilling now to kill him but bent on breaking him, the king ordered him paraded village to village across the kingdom, hands bound behind his back, mounted on a buffalo, with the crowd urged to abuse him. He took it, the chronicle says, as a share in the humiliations of his Saviour. Then came the torture: beaten with rods set with thorns until his body was one wound, ground pepper rubbed into the lacerations. He answered only: “O Jesus, it is for love of you that I suffer” — and sometimes added, “and for the expiation of my sins.” When his torturers ground the corrosive powder into his face, he told them not to spare his eyes — “for in my youth they were instruments of sin.” One day, marched over the burning sands by the sea and tormented by thirst, he begged for water; his guards gave him sea-water. He drank it with confidence — and found it fresh and without any bitterness.",
        },
        {
          heading: "Seven Months Chained to a Tree",
          body: "Returned to Trivandram and shut in a dungeon, he drew such crowds — Christians and curious pagans alike, whom he never failed to teach — that the king ordered him taken at night to a desert place three leagues away and chained to a tree, unable to take a step or even to stand. For seven months he stayed so, exposed to sun and storm. At last his guards, moved to pity, lengthened the chain and raised a thatch above him. He used his small liberty to write to De Lannoy, telling him the place of his captivity and asking for a priest who would bring him “the Bread of the strong.” De Lannoy obeyed faithfully; the Eucharist came to him in the wilderness. Word of his hiding-place spread; the desert became a pilgrimage. Christians and pagans poured in daily; miracles were reported through his prayer. This lasted, the old book says, for two years.",
        },
        {
          heading: "The Final Night",
          body: "Unable to silence the multitude, the king at last cast off his superstition and pronounced the sentence of death. Soldiers came in the middle of the night and told him only that he was being moved to another prison — but, illumined from above, he answered: “Why do you dissimulate? I know where you are taking me; let us go without delay.” Arriving at the place of execution he asked a few moments to pray; then, rising: “I have done my duty; it is for you to do yours.” Three musket shots were fired into him. He fell pronouncing the names of Jesus and Mary, and a second volley consummated his martyrdom. So died, after three years of cruel suffering, this Christian hero — on 14 January 1752, at Aralvaimozhi. His body was carried to Kottar and buried in the church of St Francis Xavier. On 15 May 2022 Pope Francis declared him a saint.",
        },
      ],
      bond: {
        label: "Our Parish Bond",
        title: "Why Vadakkankulam Holds Him as Its Own",
        intro:
          "Devasahayam is venerated across India, but his story is woven through our parish at every turn. The font that received him, the church that was being built when he was arrested, and the relics still kept here — all belong to Vadakkankulam.",
        pillars: [
          {
            heading: "Baptised at our font, 1744",
            body: "It was here at Vadakkankulam that the Jesuit Father Jean-Baptiste Bouttari, then parish priest, poured the water of baptism on Neelakanta Pillai and gave him the name Devasahayam — “God is my help,” the Tamil for Lazarus.",
          },
          {
            heading: "Arrested for the timber of our church",
            body: "Fr Bouttari was building the church at Vadakkankulam. The whole ordeal began when Devasahayam, seeking timber from the royal forests for that very building, was confronted by the brahmin who would later destroy him. The martyrdom and our church are bound together at their root.",
          },
          {
            heading: "His chains kept here",
            body: "From his death in 1752 to today, the church of Vadakkankulam has treasured a part of the garment he wore at his martyrdom and the very chains with which he was bound. (Auguste Jean, S.J., Le Maduré, 1894.)",
          },
          {
            heading: "Two Jesuits, one church",
            body: "Fr Bouttari (1707–1757), who baptised him, began the church and is remembered at Vadakkankulam “in benediction.” After Fr Bouttari was sent to heal another troubled mission at Aour, Fr Clément Tomassini finished the church he had begun — so beloved by the people that they named their children after him, and even pagans invoked him in drought.",
          },
        ],
      },
      sources: {
        heading: "Sources",
        body: "Compiled principally from Auguste Jean, S.J., Le Maduré: l'ancienne et la nouvelle mission, Vol. I (Paris, 1894), pp. 196–203, and from the Notice sur le P. J.-B. Bouttari in Joseph Bertrand, S.J., La Mission du Maduré, Vol. IV (Paris, 1847), pp. 385–420. Both works are preserved in the parish's Maduré Mission library.",
      },
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
      patronessTitle: "பரலோக மாதா",
      patronessSubtitle: "விண்ணேற்பு மாதா",
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
      overlineLabel: `சின்ன ரோமாபுரியின் கதை`,
      overview: `மூன்று நூற்றாண்டுகளுக்கும் மேலாக வடக்கன்குளத்தின் கதை ஒரே ஆலயத்தின் கூரையின் கீழும், ஒரே அன்னையின் அன்பைச் சுற்றியும் எழுதப்பட்டு வந்துள்ளது. தென்னக காட்டிலே ஒரு கிறிஸ்தவப் பெண்மணியின் சாலையோரச் சிலுவையிலிருந்து, பரலோக மாதா ஒருகாலத்தில் கண்ணீர் சிந்திய தனித்துவமான இரட்டை மண்டப "சின்ன ரோமாபுரி" வரை — இதுவே திருக்குடும்ப திருத்தலமாகிய வடவை மாதாவின் வாழும் வரலாறு.`,
      eras: [
        {
          id: `clearing-in-the-forest`,
          span: `1542–1693`,
          heading: `காட்டில் ஒரு வெளிமனை`,
          blurb: `புனித பிரான்சிஸ் சவேரியாரின் கடற்கரை பணியிலிருந்தும், புனித அருளானந்தரின் துணிவுமிக்க உள்நாட்டுப் பயணங்களிலிருந்தும், தென்னக காட்டிலே ஒரு பக்திமிக்கப் பெண்மணியின் சாலையோரச் சிலுவையைச் சுற்றி ஒரு கிறிஸ்தவக் குடியிருப்பு வேரூன்றியது.`,
          dots: [
            {
              year: `1542–1545`,
              title: `முத்துக்குளிக்கும் கடற்கரையில் புனித பிரான்சிஸ் சவேரியார்`,
              body: `புனித பிரான்சிஸ் சவேரியார் சுமார் 1542-ஆம் ஆண்டில் திருநெல்வேலி கடற்கரையின் பரவ முத்துக்குளிப்போர் நடுவே வந்திறங்கியபோது, இரண்டே ஆண்டுகளில் சுமார் இருபதாயிரம் ஆன்மாக்களுக்கு திருமுழுக்கு அளித்து, தென்னகம் முழுவதும் விசுவாசத்தின் தீபத்தை ஏற்றினார். காட்டிற்குள் உள்நாட்டில் அமைந்திருந்த வடக்கன்குளம், அந்த மாபெரும் கடற்கரை கிறிஸ்தவத்தின் பிற்கால கிளையாக வளர்ந்தது.`,
            },
            {
              year: `c.1680`,
              title: `சாந்தாயி அம்மையார் காட்டு வெளிமனையில் குடியேறுகிறார்`,
              body: `சுமார் 1680-ஆம் ஆண்டில், சாந்தாயி (சந்தை) அம்மையார் என்ற பக்திமிக்க கிறிஸ்தவப் பெண்மணி தம் குடும்பத்துடன் தோப்புவிளையிலிருந்து வந்து, அப்போது வெறும் புதர்களும் மரங்களும் குழிகளும் நிறைந்த காடாக மட்டுமே இருந்த இடத்தில் தம் வீட்டை அமைத்தார். மாதாவின் மீது அவருக்கு இருந்த அன்பு எவ்வளவு ஆழமானது என்றால், தம் வீட்டு வாசலுக்கு எதிரே ஒரு சிறிய சாலையோர குருசடி எனும் சிலுவைத் திருக்கோயிலை எழுப்பினார்; அவருடைய விசுவாசத்தைச் சுற்றி ஒரு கிறிஸ்தவக் குடியிருப்பு திரளத் தொடங்கியது.`,
            },
            {
              year: `c.1680`,
              title: `அரசுகளின் பாதையில் ஒரு சாலையோரச் சிலுவை`,
              body: `"வடக்கேயுள்ள குளம்" எனப் பொருள்படும் வடக்கன்குளம், திருவிதாங்கூருக்கும் பாண்டிய நாட்டுக்கும் இடையேயான காட்டுப் பாதையில் அமைந்திருந்தது; வழிப்போக்கர்களுக்கும் விசுவாசத்தை நாடி வருவோருக்கும் இயல்பான தங்குமிடமாக அது இருந்தது. வயல்களில் பருத்தி பறித்துக் கொண்டிருந்தபோது, குதிரையில் வந்த ஓர் அருட்தந்தையை சாந்தாயி சந்தித்து, தம் வீட்டையும் தம் குருசடியையும் ஆசீர்வதிக்கும்படி அவரைக் கெஞ்சினார்; பங்கு மரபின்படி அவர் புனித அருளானந்தரே ஆவார்.`,
            },
            {
              year: `1685`,
              title: `ஓலை வேய்ந்த திருக்குடும்ப சிற்றாலயம்`,
              body: `சுமார் 1684-ஆம் ஆண்டில், தமிழர்களால் அருளானந்தர் என அறியப்பட்ட புனித அருளானந்தர் தெற்கே வடக்கன்குளம் வரை வந்து சேர்ந்தார்; 1685-ஆம் ஆண்டில் அந்த வெளிமனையில் ஒரு சிறிய ஓலை வேய்ந்த சிற்றாலயத்தை எழுப்பி, அதைத் திருக்குடும்பத்திற்கு அர்ப்பணித்தார். கிளைகளால் அமைந்த அந்த எளிய கூரையிலிருந்தே, இன்றும் தாங்கி நிற்கும் பெயரை இந்தப் பங்கு பெற்றது; சாணார் (நாடார்) மக்களிடையே இயேசு சபையினரின் முதல் மனமாற்றம் நிகழ்ந்த இடமாக காலனிய அரசிதழ் இதை நினைவுகூர்கிறது.`,
            },
            {
              year: `1686`,
              title: `சுமார் இருநூறு பேருக்கு திருமுழுக்கு`,
              body: `இளம் பணிக்களத்திற்குத் திரும்பிய அருளானந்தர், மக்களை ஒன்றுதிரட்டி அவர்களில் சுமார் இருநூறு பேருக்கு கத்தோலிக்க திருச்சபையில் திருமுழுக்கு அளித்தார் — இதுவே வடக்கன்குளத்தின் முதல் மாபெரும் அறுவடை. ஒரு பெண்மணியின் சாலையோரச் சிலுவையிலிருந்து பிறந்த ஒரு கிராமம் உண்மையான கிறிஸ்தவ சமூகமாக மாறியிருந்தது.`,
            },
            {
              year: `1693`,
              title: `ஓரியூரில் புனித அருளானந்தரின் இரத்தசாட்சியம்`,
              body: `1693-ஆம் ஆண்டு பிப்ரவரி 4-ஆம் நாள், வடக்கன்குளப் பணிக்களத்தை நிறுவியவர் தம் நாற்பத்தைந்தாம் வயதில், மறவ நாட்டிலுள்ள ஓரியூரில் விசுவாசத்திற்காகத் தலை துண்டிக்கப்பட்டார். 1947-ஆம் ஆண்டில் புனிதராக அறிவிக்கப்பட்ட அருளானந்தர், இப்பங்கின் நிறுவனப் புனிதராக இங்கே போற்றப்படுகிறார்; அவருடைய இரத்தமே இச்சமூகம் வளர்ந்த விதையாயிற்று.`,
            },
          ],
        },
        {
          id: `first-inland-parish`,
          span: `1698–1740`,
          heading: `முதல் உள்நாட்டுப் பங்கு`,
          blurb: `தனக்கேயுரிய ஆயர்களின் கீழும், இயேசு சபையின் கீழும், அந்தக் காட்டு வெளிமனை தென்னக பணிக்களம் முழுவதிலும் மூத்த உள்நாட்டுச் சபையாக செழித்தோங்கியது.`,
          dots: [
            {
              year: `1698`,
              title: `முதல் பங்குத் தந்தையர்`,
              body: `சுமார் 1698-ஆம் ஆண்டிலிருந்து வடக்கன்குளம் தனக்கேயுரிய அர்ப்பணிப்பு மிக்க ஆயர்களைப் பெற்றது; இக்காலத்திலிருந்து அந்தக் காட்டு வெளிமனை, தடையின்றி தொடரும் அருட்தந்தையர் வரிசையால் மேய்க்கப்படும் உண்மையான பங்காக இருந்தது. இன்றைய தூத்துக்குடி மறைமாவட்டத்தின் நிலப்பகுதிக்குள் முதல் முக்கிய உள்நாட்டு கத்தோலிக்க பங்காக அது வளர்ந்து வந்தது.`,
            },
            {
              year: `1712–1713`,
              title: `ஆன்மாக்களின் வியத்தகு அறுவடை`,
              body: `சுமார் 1712–13-இல், உள்நாட்டுப் பணிக்களம் செழித்தோங்கியபோது, வெறும் இரண்டே ஆண்டுகளில் வடக்கன்குளத்தில் ஏறக்குறைய எண்ணூறு பெரியோர்களுக்கும், அத்துடன் பல குழந்தைகளுக்கும் திருமுழுக்கு அளிக்கப்பட்டது. ஓலைக் கூரையின் கீழ் இருநூறு பேருடன் தொடங்கியது, இப்போது தென்னக எல்லைப்புறத்தின் மாபெரும் கிறிஸ்தவ சமூகங்களில் ஒன்றாக ஆகியிருந்தது.`,
            },
            {
              year: `1714`,
              title: `எல்லைப்புறத்தில் ஓர் இயேசு சபை இல்லம்`,
              body: `1714-ஆம் ஆண்டளவில், செழித்தோங்கிய அந்தச் சபை, இயேசு சபையின் மூத்த உள்நாட்டு நிலையங்களில் ஒன்றாக அங்கீகரிக்கப்பட்டு, தனக்கேயுரிய இயேசு சபை இல்லமாக நிறுவப்பட்டது. ஆயர் கால்டுவெல்லின் வரலாறு, இங்கே இச்சபையை நிறுவியவராக அருட்தந்தை பிராண்டோலினியைப் போற்றுகிறது; இது வடக்கன்குளத்தை இப்பகுதியின் முதல் மாபெரும் உள்நாட்டுப் பங்காகக் குறிக்கிறது.`,
            },
          ],
        },
        {
          id: `statue-and-the-saint`,
          span: `1741–1775`,
          heading: `திருவுருவமும் புனிதரும்`,
          blurb: `அருட்தந்தை புத்தாரியின் பொற்காலம்: கடலிலிருந்து கரைக்குக் கொண்டுவரப்பட்ட மாதாவின் திருவுருவம், வருங்கால புனிதர் ஒருவரின் திருமுழுக்கு, மற்றும் சிலுவை வடிவில் எழுந்த முதல் கற்களால் ஆன ஆலயம்.`,
          dots: [
            {
              year: `1742–43`,
              title: `கடலிலிருந்து திருவுருவம் வந்து சேர்கிறது`,
              body: `1742–43-ஆம் ஆண்டுகளில், "வடக்கன்குளத்திற்கு, போர்த்துகலிலிருந்து" என எழுதப்பட்ட, மாதாவின் செதுக்கப்பட்ட திருவுருவங்களைக் கொண்ட ஒரு மரப்பெட்டி, கடல் நீரோட்டங்களால் கொண்டுவரப்பட்டு கூட்டப்புளியில் கரையேறியது. மீனவர்கள் அதைப் பங்குத் தந்தை அருட்தந்தை ஜான் பாப்டிஸ்ட் புத்தாரியிடம் கொண்டுவந்தனர்; அவர் ஒரு திருவுருவத்தை வடக்கன்குளத்திற்காக வைத்துக்கொண்டு, இரண்டாவதை காமநாயக்கன்பட்டிக்கும், மூன்றாவதை ஆயரின் பராமரிப்பிற்கும் அளித்தார். இங்கே வைக்கப்பட்ட விண்ணேற்பு மாதாவின் திருவுருவமே, ஒருநாள் கண்ணீர் சிந்தப்போகும் அதே திருவுருவம் ஆகும்.`,
            },
            {
              year: `1745`,
              title: `புனித தேவசகாயம் பிள்ளை இங்கே திருமுழுக்குப் பெறுகிறார்`,
              body: `1745-ஆம் ஆண்டு மே 14-ஆம் நாள், ஒன்பது மாத மறைக்கல்விக்குப் பின், அருட்தந்தை புத்தாரி, திருவிதாங்கூர் அரசவையின் நாயர் அதிகாரியான நீலகண்ட பிள்ளைக்கு திருக்குடும்ப ஆலயத்தில் திருமுழுக்கு அளித்து, அவருக்கு தேவசகாயம் ("இறைவனே என் துணை") என்ற பெயரிட்டார்; அவருடைய ஞானத்தந்தை மறைக்கல்வியாளர் ஞானப்பிரகாசம் பிள்ளை ஆவார். இந்தத் திருமுழுக்கு நடைபெற்ற இடமாக வடக்கன்குளத்தைத் திருப்பீடமே உறுதிப்படுத்துகிறது — இப்பங்கின் வரலாறு முழுவதிலும் மிகச் சிறப்பாக ஆவணப்படுத்தப்பட்ட ஒரே செய்தி இதுவே.`,
            },
            {
              year: `1749`,
              title: `முதல் கல் ஆலயத்தின் அடிக்கல்`,
              body: `1749-ஆம் ஆண்டில், கத்தோலிக்க சமூகம் அருளானந்தரின் பழைய ஓலைக் கூரைக்கு அடங்காத அளவிற்கு பெருகியதால், அருட்தந்தை புத்தாரி, கல்லும் சாந்தும் கொண்ட பெரிய, நிலையான ஆலயத்திற்காக கங்கோல் (அடிக்கல்) திருவிழாவை நடத்தினார். இங்கே முதல் கல் ஆலயத்தின் தொடக்கம் அதுவே; அதன் மணி, அரை நூற்றாண்டுக்குப் பின், மாதாவின் கண்ணீர்க் காட்சிக்கு கிராமத்தை அழைக்கப்போகிறது.`,
            },
            {
              year: `1752`,
              title: `சிலுவை வடிவ ஆலயம் நிறைவுபெறுகிறது`,
              body: `1752-ஆம் ஆண்டில், சிலுவை வடிவில் கட்டப்பட்டு, உதயச் சூரியனை நோக்கி கிழக்கு திசையில் முகம் கொண்ட அந்தக் கல் ஆலயம் நிறைவுபெற்றது; அருட்தந்தை புத்தாரி தொடங்கிய இப்பணியை அருட்தந்தை கிளமெண்ட் தோமசினி நிறைவேற்றினார். தோமசினியின் காலத்தில், மாபெரும் விண்ணேற்பு மாதா திருவிழா இங்கே இப்பங்கின் முதன்மை திருவிழாவாக வேரூன்றியது; அந்தக் கொண்டாட்டம் இன்றுவரை நிலைத்து நிற்கிறது.`,
            },
            {
              year: `1752`,
              title: `புனித தேவசகாயம் பிள்ளையின் இரத்தசாட்சியம்`,
              body: `எருமை மீது ஊர்வலமாக இழுத்துச் செல்லப்பட்டு, சாட்டையால் அடிக்கப்பட்டு, காட்டில் ஒரு மரத்தில் பல மாதங்கள் சங்கிலியால் பிணைக்கப்பட்டு, மூன்றாண்டுகள் கொடிய துன்பத்திற்குப் பின், 1752-ஆம் ஆண்டு ஜனவரி 14-ஆம் நாள், ஆரல்வாய்மொழி கணவாய் அருகே காட்டாடிமலையில் தேவசகாயம் சுட்டுக் கொல்லப்பட்டார்; இயேசு மரியாவின் திருப்பெயர்களை தம் உதடுகளில் தாங்கி உயிர்நீத்தார். அவருடைய தலைப்பாகை திருவஞ்சம் இன்றுவரை வடக்கன்குளத்தில் போற்றிப் பாதுகாக்கப்படுகிறது; ஞானப்பூ தெரேசா எனத் திருமுழுக்குப் பெற்ற அவருடைய மனைவி, பங்கின் கல்லறையில் அடக்கம் செய்யப்பட்டுள்ளார்.`,
            },
            {
              year: `1773–1775`,
              title: `இயேசு சபை ஒடுக்கப்படுகிறது; பழைய பணிக்களம் முடிகிறது`,
              body: `1773-ஆம் ஆண்டில், திருத்தந்தை பதினான்காம் கிளமெண்ட் உலகெங்கும் இயேசு சபையை ஒடுக்கினார்; வடக்கன்குளத்தின் பராமரிப்பு புதுச்சேரி மற்றும் கோவா அருட்தந்தையரிடம் செல்லத் தொடங்கியது. பழைய இயேசு சபை தந்தையரில் கடைசியாக, அருட்தந்தை தோமசினி 1775-ஆம் ஆண்டில் வடக்கன்குளத்தில் இறந்தார்; இது இப்பங்கைப் பொறுத்தவரை பழைய மதுரை மிஷனின் அத்தியாயத்தை நிறைவு செய்தது.`,
            },
          ],
        },
        {
          id: `the-weeping-madonna`,
          span: `1775–1838`,
          heading: `கண்ணீர் சிந்திய அன்னை`,
          blurb: `இயேசு சபை தந்தை வசிக்காத அறுபத்து மூன்று அமைதியான ஆண்டுகளிலும், இப்பங்கு தானாகவே விசுவாசத்தைக் காத்துவந்தது; 1803-ஆம் ஆண்டு அக்டோபர் வெள்ளிக்கிழமை ஒன்றில், திரண்டிருந்த கிராமத்தின் முன்னிலையில் பீடத்திற்கு மேலே பரலோக மாதா கண்ணீர் சிந்தினார்.`,
          dots: [
            {
              year: `1775–1838`,
              title: `வசிக்கும் தந்தை இல்லாத அறுபத்து மூன்று ஆண்டுகள்`,
              body: `ஒடுக்கத்திற்குப் பின் அறுபது ஆண்டுகளுக்கும் மேலாக, வசிக்கும் இயேசு சபை தந்தை எவரும் வடக்கன்குளத்தை மேய்க்கவில்லை; புதுச்சேரியிலிருந்தும் கோவாவிலிருந்தும் வந்து செல்லும் அருட்தந்தையரால் மட்டுமே மந்தை பேணப்பட்டது, இப்பங்கு பெருமளவு தானாகவே விசுவாசத்தைக் காத்துவந்தது. இந்த அமைதியான முழுக் காலகட்டத்தைப் பற்றி, "அதன் நம்பகத்தன்மைக்கான அனைத்து உத்தரவாதங்களுடன்" ஒரே ஒரு நிகழ்வு மட்டுமே நிலைத்திருந்தது என வரலாற்றாசிரியர் பெஸ்ஸே எழுதினார்: அதுவே 1803-ஆம் ஆண்டின் அதிசயம்.`,
            },
            {
              year: `1803`,
              title: `மாதாவின் கண்ணீர்க் காட்சி, 1803 அக்டோபர் 23`,
              body: `தமிழ் வருடம் 979, ஐப்பசி மாதம், ஒரு வெள்ளிக்கிழமை முற்பகல் சுமார் 11:20 மணியளவில், சவரிமுத்து பிள்ளை என்பவர் பீடத்திற்கு மேலேயிருந்த விண்ணேற்பு மாதாவின் திருவுருவத்தின் முன்பு முழங்காலிட்டார். அவர் செபித்துக்கொண்டிருந்தபோது, அன்னையின் முகத்தின் மீது மேகம் போன்ற திரை படர்ந்தது, அவருடைய கண்கள் விண்ணை நோக்கி உயர்ந்து கண்ணீரால் நிறைந்தன, அந்தக் கண்ணீர் பவளம் போன்ற கன்னங்களில் வழிந்தோடியது, கூப்பிய அவருடைய கைகள் மெல்ல விரிந்து வெளிநோக்கி நீண்டன — அந்நிகழ்வை இப்பங்கு அன்றிலிருந்து நெஞ்சில் போற்றி வருகிறது.`,
            },
            {
              year: `1803`,
              title: `கிராமமே வந்து கண்ணீர் வடித்தது`,
              body: `மறைக்கல்வியாளர் மதுரேந்திர அண்ணாவியார் பீடத்தில் ஏறி கண்ணீரைத் துடைத்தார், ஆனால் அது நிற்கவில்லை; பின்னர் ஆலய மணி அடிக்கப்பட்டது, அந்த அசாதாரண நேரத்தில் கிராமமே விரைந்து வந்தது. அந்த அதிசயத்தை உற்றுப்பார்த்து, மக்கள் கண்ணீர் வடித்து, "பார்சே டோமினே, பார்சே போபுலோ த்துவோ" ("ஆண்டவரே, உம் மக்களை மன்னியும்") என்ற பழைய மனந்திரும்புதல் பாடல்களைப் பாடினர்; இறுதியில் திருவுருவம் தன் வழக்கமான தோற்றத்திற்குத் திரும்பியது.`,
            },
            {
              year: `1803`,
              title: `கண்டு உறுதிப்படுத்திய சாட்சிகள்`,
              body: `இந்த அதிசயத்தை பல கண்கள் கண்டன: மறைக்கல்வியாளர்களான சக்கரியாஸ், வியாகப்பர் மற்றும் யாகப்பர் பிள்ளை, மேலும் ஐரோப்பிய பொதுநிலைப் பெண்மணி ஹென்ரியட் பில்டர்பெக் ஆகியோர்; ஹென்ரியட் திருவுருவத்தை நெருங்கி ஆராய்ந்து, மேகம் படர்ந்த முகம், கண்ணீர், விரிந்த கைகள் ஆகிய மூன்று அடையாளங்களையும் உறுதிப்படுத்தினார். அதே நாளில், பங்குத் தந்தை அருட்தந்தை ஜான் லூயிஸ் கார்டோசா, மற்றொரு அருட்தந்தை மற்றும் ஹென்ரியட்டுடன் சேர்ந்து, இதை ஓர் அசாதாரண அதிசயம் என அறிவித்தார்; இப்பங்கு அன்றிலிருந்து விசுவாசத்துடன் காத்துவரும் ஒரு போற்றத்தக்க உள்ளூர் மரபு இது.`,
            },
          ],
        },
        {
          id: `great-two-nave-church`,
          span: `1838–1872`,
          heading: `மாபெரும் இரட்டை மண்டப ஆலயம்`,
          blurb: `பிரெஞ்சு இயேசு சபையினர் திரும்பி வந்தபோது, பழைய கல் சிற்றாலயம், "உலகிலேயே நிகரற்றதாக இருக்கக்கூடிய" ஓர் ஆலயத்திற்கு வழிவிட்டது: ஒரே பீடத்தில் சந்திக்கும் இரு ஒன்றிணையும் மண்டபங்களைக் கொண்ட தனித்துவமான விரிந்த கவராயம் வடிவ ஆலயம்.`,
          dots: [
            {
              year: `1838`,
              title: `பிரெஞ்சு இயேசு சபையினர் திரும்புகின்றனர்`,
              body: `வசிக்கும் இயேசு சபை தந்தை இல்லாத அறுபதாண்டுகளுக்கும் மேலாக, மீண்டும் நிறுவப்பட்ட இயேசு சபை தென்னக பணிக்களத்திற்கு வந்தது; வடக்கன்குளம் இயேசு சபையின் பராமரிப்பிற்குத் திரும்பியது. தங்களின் முதல் வருகையிலேயே, பழைய சிற்றாலயத்தில் மக்கள் சாதி வாரியாகத் தனித்தனியாக அமர்ந்திருப்பதை புதிய பிரெஞ்சு தந்தையர் கண்டனர் — இப்பங்கு குணப்படுத்தக் கற்க ஒரு நூற்றாண்டு செலவிடப்போகும் ஒரு காயம் அது.`,
            },
            {
              year: `1855`,
              title: `மாபெரும் ஆலயத்தின் அடிக்கல்`,
              body: `1855-ஆம் ஆண்டு ஆகஸ்ட் 9-ஆம் நாள், மதுரையின் ஆயர் அலெக்சிஸ் கனோஸ், இன்றைய திருக்குடும்ப ஆலயத்தின் அடிக்கல்லை ஆசீர்வதித்தார். அந்தக் கல்லில், முழு வடிவமைப்பின் துணிவுமிக்க குறிக்கோள் பொறிக்கப்பட்டிருந்தது: "டெம்ப்லும் சித் டுப்ளெக்ஸ், ஆரா செத் உனா" — ஆலயம் இரட்டையாக இருக்கட்டும், ஆனால் பீடம் ஒன்றாக; இரு சாதியினரும் ஒரே விசுவாசமும் ஒரே மனமும் கொண்டிருக்கட்டும்.`,
            },
            {
              year: `1855–1872`,
              title: `வடக்கன்குளத்தின் அப்போஸ்தலர் அருட்தந்தை ஜோசப் கிரெகோய்ர்`,
              body: `சுமார் பதினேழு பொறுமையான ஆண்டுகள், "வடக்கன்குளத்தின் அப்போஸ்தலர்" என வரலாற்றாசிரியர்களால் அழைக்கப்பட்ட அருட்தந்தை ஜோசப் கிரெகோய்ர் SJ அவர்களால் இப்பணி இயக்கப்பட்டது; "உலகிலேயே நிகரற்றதாக இருக்கக்கூடிய" ஓர் ஆலயத்தை இந்தச் சமூகத்திற்கு அளித்தவர் அவரே என ஒரு வரலாற்றாசிரியர் கூறினார். இயேசு சபை பொதுநிலை சகோதரர் ஜோசப் பெர்கென்தால், சிமெண்டோ, இரும்போ, அல்லது தாங்கிப் பிடிக்க ஒரு மரக்கட்டையோ இல்லாமல், சுண்ணாம்பு மற்றும் பனைக்கள்ளுச் சாந்தில் இருபத்து நான்கு தாமே தாங்கி நிற்கும் வளைவுகளை வடிவமைத்தார்.`,
            },
            {
              year: `1861`,
              title: `லியோனில் வார்க்கப்பட்ட இரண்டு மணிகள்`,
              body: `இப்பங்கின் இரட்டை மணிகள் 1861-ஆம் ஆண்டில், பிரான்சின் லியோன் நகரிலுள்ள புர்தின் வார்ப்பகத்தில், காசிமிர் கிரெகோய்ர் என்ற கொடையாளியின் கொடையாக வார்க்கப்பட்டன. பெட்டிகளில் அடைக்கப்பட்டு, கடல்வழியாக சென்னைக்கும் அங்கிருந்து திருநெல்வேலி வழியாகவும் வந்து, இறுதியில் 1872-ஆம் ஆண்டில் புதிய கோபுரத்தில் தொங்கவிடப்பட்டன; அவற்றின் இணைந்த ஒலி, இந்த நாட்டில் வேறெங்கும் கேட்க முடியாத இனிமையைத் தருகிறது என மக்கள் இன்றும் கூறுகின்றனர்.`,
            },
            {
              year: `1872`,
              title: `தனித்துவமான இரட்டை மண்டப ஆலயம் ஆசீர்வதிக்கப்படுகிறது`,
              body: `1872-ஆம் ஆண்டில், ஆயர் கனோஸ், நிறைவுபெற்ற திருக்குடும்ப ஆலயத்தை ஆசீர்வதித்தார் — அதுவே ஒரே உண்மையான "விரிந்த கவராயம்" வடிவ ஆலயம்; வாயில்களில் தனித்தனியாக விரிந்து, அகன்ற V வடிவில் ஒன்றிணைந்து, ஒரே பகிரப்பட்ட பீடத்தில் சந்திக்கும் இரு தனி மண்டபங்களாகக் கட்டப்பட்டது. தொண்ணூற்றிரண்டு அடி உயரமான இரு எண்கோண கோபுரங்கள் வெண்மையான முகப்பை அலங்கரிக்கின்றன; உள்ளே, வளைவுகளும் தூண்களும் இயற்கையான தாவரச் சாயங்களாலும் தங்க முலாம் பூச்சாலும் வரையப்பட்டன; ஒன்றரை நூற்றாண்டுக்குப் பின்னரும் அவற்றின் நிறங்கள் மங்காமல் இருப்பதைக் கண்டு இப்பங்கு வியக்கிறது.`,
            },
          ],
        },
        {
          id: `little-rome`,
          span: `1891–1944`,
          heading: `சின்ன ரோமாபுரி`,
          blurb: `ஒரு திருவிழாத் தேர், இரு மண்டபங்களையும் கடந்து ஒற்றுமையை நோக்கிய நீண்ட பயணம், புதிய தூத்துக்குடி மறைமாவட்டம், மற்றும் கிராமத்தின் இரண்டாம் பெயராக மாறிய அன்புப் பட்டம்.`,
          dots: [
            {
              year: `1891`,
              title: `திருவிழாத் தேர் கட்டப்படுகிறது`,
              body: `1891-ஆம் ஆண்டில், விண்ணேற்பு திருவிழாவின்போது மாதாவை வீதிகளில் வலம்வரச் செய்ய, இப்பங்கு தனது மாபெரும் திருவிழாத் தேரை — பலா, தேக்கு மற்றும் வேம்பினால் ஆன, உள்ளூர் "வடவை" சிற்பிகளால் செதுக்கப்பட்ட முப்பத்தைந்து அடி தேரைக் கட்டியது. இன்றுவரை, ஆகஸ்ட் 15-ஆம் நாள் அதிகாலையில் இந்தத் தேர் ஊர்வலம் சுமார் ஒரு லட்சம் திருயாத்திரிகர்களை ஈர்க்கிறது, அவர்களில் பலர் கேரளாவிலிருந்து கடந்து வருகின்றனர்.`,
            },
            {
              year: `c.1910`,
              title: `பிரிப்புச் சுவர் இடிக்கப்படுகிறது`,
              body: `அருட்தந்தை கிரெகோய்ர் இரு தனி மண்டபங்களுடன் கட்டிய அந்த ஆலயத்தில், ஒரு சுவர் ஒருகாலத்தில் வழிபாட்டின்போது சாதியினர் ஒருவரையொருவர் பார்ப்பதையும் தடுத்தது. சுமார் 1910-ஆம் ஆண்டில், பதினெட்டு ஆண்டுகள் பாலும் வாழைப்பழமும் மட்டுமே உண்டு வாழ்ந்த கடுந்துறவியான அருட்தந்தை ஆட்ரியன் கோசானெல், அந்தப் பிரிப்புச் சுவரை இடித்தார்; இதனால் முதல் முறையாக அனைத்து சாதியினரும் ஒரே மக்களாக ஒன்றாக நின்று பாடினர். இது உண்மையான நல்லிணக்கச் செயல்; இன்று இப்பங்கு தன் பெயராகத் தாங்கி நிற்கும் ஒற்றுமையை நோக்கிய திருப்புமுனை அது.`,
            },
            {
              year: `1923`,
              title: `தூத்துக்குடி மறைமாவட்டம் பிறக்கிறது`,
              body: `1923-ஆம் ஆண்டு ஜூன் 12-ஆம் நாள், தூத்துக்குடி மறைமாவட்டம் நிறுவப்பட்டது; வடக்கன்குளம் பழைய திருச்சிராப்பள்ளி மறைமாவட்டத்திலிருந்து, மீனவக் கடற்கரையின் புதிய மறைமாவட்டத்திற்கு மாற்றப்பட்டது. இப்பங்கு மறைவட்டத் தலைமை எனும் பெருமைக்கு உயர்த்தப்பட்டது; முதல் ஆயர் பேராயர் முனைவர் பிரான்சிஸ் டிபர்ஷியஸ் ரோஷ் SJ அவர்களின் கீழ், இதன் பராமரிப்பு இயேசு சபை தந்தையரிடமிருந்து மறைமாவட்ட குருக்களின் கைகளுக்கு மாறியது.`,
            },
            {
              year: `1926`,
              title: `"சின்ன ரோமாபுரி"`,
              body: `1926-ஆம் ஆண்டில், திருக்குடும்ப ஆலயத்தின் மாட்சிமையால் வியப்புற்ற தூத்துக்குடியின் முதல் ஆயர், பேராயர் முனைவர் பிரான்சிஸ் டிபர்ஷியஸ் ரோஷ் SJ, வடக்கன்குளத்தை அன்புடன் "சின்ன ரோமாபுரி" என்று பெயரிட்டார். அன்றிலிருந்து இந்தப் பட்டம் கிராமத்தின் பெருமைமிக்க இரண்டாம் பெயராக இருந்து வருகிறது; ரோமின் மாபெரும் பேராலயத்திற்கு ஒப்பிடப்படும் ஓர் ஆலயத்தைக் காண திருயாத்திரிகர்களை ஈர்க்கிறது.`,
            },
            {
              year: `1944`,
              title: `இந்தியாவில் ரோசரியன் சபையின் பிறப்பிடம்`,
              body: `கிராமத்திற்கு மேலேயுள்ள பாறை மலையின் மீதுள்ள பாத்திமா கிரி ஆசிரமத்தில், இறைவனின் ஊழியர் அந்தோணி சூசைநாதர், 1944-ஆம் ஆண்டில் ரோசரியன் சபையின் முதல் இந்திய மடாலயத்தை நிறுவினார். மலைஉச்சியிலுள்ள இந்த செப இல்லத்திலிருந்து ரோசரியன் தந்தையர் இந்தியா முழுவதும் பரவினர்; சர்வைட் சபை சகோதரிகள் மற்றும் பெத்தானி சபை சகோதரிகளுடன் சேர்ந்து, இன்றும் அவர்கள் பங்கு வாழ்வில் பின்னிப் பிணைந்துள்ளனர்.`,
            },
          ],
        },
        {
          id: `shrine-and-the-saint`,
          span: `1993–present`,
          heading: `திருத்தலமும் புனிதரும்`,
          blurb: `திருத்தலமாக அறிவிக்கப்பட்டு, புதிய கொடிமரத்தால் அலங்கரிக்கப்பட்டு, தன் சுவர்களுக்குள் திருமுழுக்குப் பெற்ற புனிதரின் புனிதப்பட்ட நிலைக்கு மகிழ்ந்து, சின்ன ரோமாபுரி செழித்தோங்கும் மரியன்னை திருயாத்திரை நகரமாக வாழ்கிறது.`,
          dots: [
            {
              year: `1993`,
              title: `திருத்தலமாக அறிவிக்கப்படுகிறது`,
              body: `1993-ஆம் ஆண்டு ஆகஸ்ட் 6-ஆம் நாள், தூத்துக்குடியின் ஆயர் எஸ்.டி. அமலநாதர், திருக்குடும்ப ஆலயத்தைக் குருத்துவ அர்ப்பணம் செய்து, அதை விண்ணேற்பு மாதா திருத்தலம் எனப் புனிதத் திருத்தலமாக அறிவித்தார். இந்தப் பெருமையுடன், ஒவ்வொரு மாதமும் முதல் சனிக்கிழமை நவநாள் செபமும் ஆராதனையும் கொண்ட பக்திமுயற்சி வந்தது; திருயாத்திரிகர்கள் இன்றுவரை அதைக் கடைப்பிடிக்கின்றனர்.`,
            },
            {
              year: `2014`,
              title: `திருவிழாத் தேர் புதிதாக வடிவமைக்கப்படுகிறது`,
              body: `2014-ஆம் ஆண்டில், 1891-ஆம் ஆண்டில் உள்ளூர் வடவை சிற்பிகளால் முதன்முதலில் கட்டப்பட்ட முப்பத்தைந்து அடி தேருக்குச் செல்லும் தேர் மரபை முன்னெடுத்து, இப்பங்கு விண்ணேற்பு மாதாவின் மாபெரும் திருவிழாத் தேரைப் புதிதாக வடிவமைத்தது. அதே ஆண்டுகளில், மாதா காட்சி திருத்தலத்தின் கல்வாரி சிற்றாலயம் நிறைவுபெற்று, புனித தேவசகாயம் பிள்ளை மற்றும் புனித அருளானந்தரின் திருவுருவங்கள் நிறுவப்பட்டன.`,
            },
            {
              year: `2021`,
              title: `கொடிமரம் ஆசீர்வதிக்கப்படுகிறது`,
              body: `2021-ஆம் ஆண்டு ஆகஸ்ட் 6-ஆம் நாள், விண்ணேற்பு மாதா திருவிழாவின் தொடக்க நாளில், தூத்துக்குடியின் ஆயர் ஏ. ஸ்டீபன், பத்து நாள் கொண்டாட்டத்தை தொடங்கி வைக்க திருவிழாக் கொடி ஏற்றப்படும் இப்பங்கின் புதிய கொடிமரத்தை ஆசீர்வதித்தார். திருத்தலம் தனது 150-ஆம் ஆண்டு விழாவுக்குத் தயாரானபோது, இதன் ஆசீர்வாதம் புதுப்பிப்புப் பருவத்திற்கு மகுடம் சூட்டியது.`,
            },
            {
              year: `2022`,
              title: `புனித தேவசகாயம் பிள்ளை, இந்தியாவின் முதல் பொதுநிலை புனிதர்`,
              body: `2022-ஆம் ஆண்டு மே 15-ஆம் நாள், 1745-ஆம் ஆண்டு மே 14-ஆம் நாள் இந்த ஆலயத்திலேயே திருமுழுக்குப் பெற்ற தேவசகாயம் பிள்ளையை திருத்தந்தை பிரான்சிஸ் புனிதராக அறிவித்தார்; பீடங்களுக்கு உயர்த்தப்பட்ட முதல் இந்திய பொதுநிலையாளர் அவரே. பங்கு முழுவதும் மகிழ்ந்தது, ஏனெனில் அவருடைய தலைப்பாகை திருவஞ்சம் இங்கே போற்றிப் பாதுகாக்கப்பட்டு, ஒவ்வொரு ஆகஸ்ட் 15-ஆம் நாளும் கண்ணாடிப் பெட்டியில் வைத்துக் காட்சிக்கு வைக்கப்படுகிறது; அந்த ஆண்டில் மாபெரும் ஆலயத்தின் ஆசீர்வாதத்தின் 150-ஆம் ஆண்டு விழாவையும் இப்பங்கு கொண்டாடியது.`,
            },
            {
              year: `present day`,
              title: `இன்றைய சின்ன ரோமாபுரி`,
              body: `வடக்கன்குளம் இன்று, அடிப்படை கிறிஸ்தவ சமூகங்கள் வழியாக ஒழுங்கமைக்கப்பட்ட, சுமார் 4,000 குடும்பங்களில் சுமார் 10,500 பங்கு மக்களைக் கொண்ட, குறிப்பிடத்தக்க கல்வியறிவு மிக்க, பெருவாரியாக கத்தோலிக்க நகரம் ஆகும். மாபெரும் ஆகஸ்ட் பெருங்கூர் திருவிழா, ஆகஸ்ட் 15-ஆம் நாள் அதிகாலையில் தேர் ஊர்வலத்திற்காக இன்றும் ஏறக்குறைய ஒரு லட்சம் திருயாத்திரிகர்களை ஈர்க்கிறது; மாதந்தோறும் வெளியாகும் வடவை மாதா மலர் இதழ் மற்றும் தனது நேரடி ஒளிபரப்புகள் வழியாக இப்பங்கு தன் விசுவாசிகளை நெருக்கமாகக் காத்துவருகிறது.`,
            },
          ],
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
        "திருவிதாங்கூரின் பிரபுவும் வீரருமான இவர், எங்கள் ஆலயத் தீர்த்தத்தில் திருமுழுக்கு பெற்று கிறிஸ்துவுக்காக தன் உயிரை அர்ப்பணித்தார். 2022-ல் இந்தியப் பிறப்பின் முதல் இல்லறக் கத்தோலிக்க புனிதராக பீடத்திற்கு உயர்த்தப்பட்டார் — இன்றும் அவர் கட்டப்பட்ட சங்கிலிகள் எங்கள் ஆலயத்திலேயே பாதுகாக்கப்படுகின்றன.",
      feast: "திருவிழா — ஜனவரி 14",
      canonised: "திருத்தந்தை பிரான்சிஸ் அவர்களால் 15 மே 2022-ல் புனிதராக அறிவிக்கப்பட்டார்",
      facts: [
        { label: "பிறப்புப் பெயர்", value: "நீலகண்ட பிள்ளை" },
        { label: "பதவி", value: "திருவிதாங்கூர் மன்னர் மார்த்தாண்ட வர்மாவின் அரசவையில் பிரபுவும் படை அதிகாரியும்" },
        { label: "திருமுழுக்கு", value: "1744-ல், அருட்தந்தை ஜான்-பாப்டிஸ்ட் பூத்தாரி, இ.ச. — வடகாங்குளம் ஆலயத்தில்" },
        { label: "இரத்தசாட்சியம்", value: "14 ஜனவரி 1752, அரல்வாய்மொழி (காட்டாடிமலை), திருவிதாங்கூர்" },
        { label: "அடக்கம்", value: "புனித பிரான்சிஸ் சேவியர் ஆலயம், கோட்டாறு (நாகர்கோவில்)" },
        { label: "புனிதர் பட்டம்", value: "15 மே 2022, புனித பேதுரு வளாகம், ரோம் — திருத்தந்தை பிரான்சிஸ் அவர்களால்" },
      ],
      quote: "ஓ இயேசுவே, உம்மீதுள்ள அன்பினாலேயே நான் துன்பப்படுகிறேன்.",
      quoteAttribution: "— துன்புறுத்தியோரிடம் இரத்தசாட்சி கூறியது, லெ மதுரே (அகஸ்து ஜாங், இ.ச., 1894) நூலில் பதிவாகியுள்ளது",
      sections: [
        {
          heading: "அரசனின் வீரன்",
          body: "திருவிதாங்கூர் அரசில் ஒரு பிரபுவாக நீலகண்ட பிள்ளை என்ற பெயரில் பிறந்தார். அறிவிலும் ஆளுமையிலும் சிறந்தவராக, மார்த்தாண்ட வர்மா மன்னரின் அரசவையில் உயர் பதவிக்கு உயர்ந்து, படையின் தளபதிப் பொறுப்பையும், ஒரு அரண்மனைக் கோட்டையின் காவலையும் ஏற்றார். எனினும், பழைய நூல்கள் கூறுவதுபோல், “கடவுள் அவரை மேலான விதிகளுக்காக ஒதுக்கிவைத்திருந்தார்” — தொடர்ந்து வந்த தோல்விகள், பதவியும் சலுகையும் தீர்க்க முடியாத துயரத்தில் அவரை ஆழ்த்தின.",
        },
        {
          heading: "வாழ்வையே மாற்றிய நட்பு",
          body: "தன் துயரத்தில், அரசப் பணியில் இருந்த சக அதிகாரியான யூஸ்தாகியுஸ் தெ லானோய் அவர்களிடம் மனம் திறந்தார் — திருவிதாங்கூரின் வலிமையான கோட்டை ஒன்றின் தளபதியாக இருந்த ஐரோப்பியர் இவர், ஆதாரங்கள் கூறுவதுபடி “மிகச் சிறந்த கிறிஸ்தவர்.” தெ லானோய், ஒரே மெய்க் கடவுளை வணங்குபவர்களுக்கு வாக்களிக்கப்பட்ட அழியா செல்வங்கள் குறித்து இவரிடம் பேசினார். அந்த வார்த்தைகள், பழைய நூல் நினைவுபடுத்துவது போல், “வான ஆறுதலாக இவரது உள்ளத்தில் இறங்கின.” தன் பழைய வழிபாட்டின் பொய்மையை உணர்ந்த நீலகண்டர், திருமுழுக்கு பெற தயாரானார்.",
        },
        {
          heading: "எங்கள் தீர்த்தத்தில் திருமுழுக்கு",
          body: "தெ லானோய், இயேசுசபை அருட்தந்தை பூத்தாரியிடம் — அப்போது வடகாங்குளம் கிறிஸ்தவர்களின் ஆலயப் பொறுப்பாளராக இருந்தவர் — இவரை அனுப்பினார். அருட்தந்தை, தொடரப்போகும் புயலை முன்கூட்டியே அறிந்து எச்சரித்தார்: சொந்த உறவினர்களின் சீற்றம், அரசவையில் ஆதிக்கம் செலுத்தும் பிராமணர்களின் எதிர்ப்பு, அரசப் பதவியின் இழப்பு — இவை எல்லாம் காத்திருக்கின்றன. ஆனால் அந்த இளைஞன், மெய்க்கடவுளை அறிந்தபின் ஒருபோதும் அவரைக் கைவிடமாட்டேன், “இவ்வுலகின் சகல சலுகைகளையும், உயிரையேயும் தியாகம் செய்ய நேரிட்டாலும்” என்று உறுதியளித்தார். அருட்தந்தை பூத்தாரி 1744-ல் இவருக்கு திருமுழுக்கு அளித்து, “கடவுளே என் துணை” எனப் பொருள்படும் தேவசகாயம் — லாசர் என்னும் பெயருக்கு இணையான தமிழ்ப் பெயரை — சூட்டினார். விரைவில் இவரது மனைவியும், பிறகு உறவினர்கள் பலரும், ஒரு காலத்தில் தான் தளபதியாக இருந்த படையின் சில அதிகாரிகளும் விசுவாசத்தில் இணைந்தனர்.",
        },
        {
          heading: "எங்கள் ஆலயத்திற்கான மரத்தைப் பற்றிய சச்சரவு",
          body: "அந்த நேரத்தில் அருட்தந்தை பூத்தாரி வடகாங்குளம் ஆலயத்தைக் கட்டிக்கொண்டிருந்தார். அதற்குத் தேவையான மரம் குறைவாக இருந்ததால், அரச காடுகளிலிருந்து மரம் வெட்ட அனுமதி பெற தேவசகாயத்தை அனுப்பினார். தேவசகாயம், அரசவையில் பெரும் செல்வாக்கு கொண்ட, தனது நீண்டகால நண்பனான ஒரு பிராமணரை அணுகினார் — ஆனால் அந்த சந்திப்பை அவன் கிறிஸ்துவை மறுக்கச் சொல்லும் வாய்ப்பாக்கினான். அதைத் தொடர்ந்த விவாதத்தில் பிராமணன் தோற்றான்; அவமானமடைந்து, “உன் மதத்தை விட்டுவிட நான் செய்வேன், இல்லையென்றால் உன் தலையால் நீ விலையாகச் செலுத்துவாய்” என்று சபதம் செய்தான். தேவசகாயமும் அதே தொனியில் பதிலளித்தார். இவ்வாறு — எங்கள் சொந்த ஆலயத்திற்கான மரத்தை தேடியதன் காரணமாகவே — புயல் அவர்மீது வெடித்தது.",
        },
        {
          heading: "கைது, தண்டனை, தடுக்கப்பட்ட மரணம்",
          body: "சூழ்ச்சியாலும் பழிசொல்லாலும் பிராமணன் மன்னரிடமிருந்து கைது ஆணை பெற்றான். தேவசகாயம் எதிர்ப்பின்றி சரணடைந்தார்; ஒரே வேண்டுகோளாக நண்பர் தெ லானோய்க்கு விடைபெற அனுமதி கேட்டார். “துணிவு கொள்,” தளபதி கூறினார், “இயேசு கிறிஸ்துவின் தகுதியான வீரனாக நிரூபிக்கும் நேரம் வந்துவிட்டது.” ஓர் அருட்தந்தை இரகசியமாக வரவழைக்கப்பட்டு அவரது பாவசங்கீர்த்தனத்தை கேட்டார். மன்னர் முன் நிறுத்தப்பட்டு கிறிஸ்துவை அறிக்கையிட்டபோது, மரண தண்டனை விதிக்கப்பட்டது — ஆனால் சகுனம் பார்த்த சிலை அர்ச்சகர்கள், இவரது மரணம் அரசிற்கு பேரிடரை வரவழைக்கும் என்று அறிவித்தனர்; மூடநம்பிக்கை கொண்ட மன்னர் ஆணையை திரும்பப் பெற்றார் — “இரத்தசாட்சியின் முடியை தனக்கு கடவுள் தராதோ என ஒரு கணம் அஞ்சிய புதிய விசுவாசியின் பேராசையின் வருத்தத்திற்கிடையே.”",
        },
        {
          heading: "ஊர்வலம், அடி, கடல்நீர்",
          body: "இனி கொல்ல விரும்பாத, ஆனால் அவரை உடைக்கத் தீர்மானித்த மன்னர், கைகள் முதுகுக்குப் பின் கட்டப்பட்டு எருமை மீது ஏற்றப்பட்டு, ஊர் ஊராக கொண்டுசெல்லப்பட வேண்டும் என ஆணையிட்டார்; கூட்டம் அவமதிக்க தூண்டப்பட்டது. இதை, பழைய நூல் கூறுவதுபடி, அவர் தன் ஆண்டவரின் அவமதிப்புகளில் பங்கேற்பதாக ஏற்றுக்கொண்டார். பிறகு துன்புறுத்தல்: முட்கள் பதித்த சாட்டையால் உடல் முழுவதும் காயமாகும் வரை அடிக்கப்பட்டார்; அந்தக் காயங்களில் அரைத்த மிளகு தேய்க்கப்பட்டது. அவர் இவ்வாறே பதிலளித்தார்: “ஓ இயேசுவே, உம்மீதுள்ள அன்பினாலேயே நான் துன்பப்படுகிறேன்” — சில சமயம், “என் பாவங்களின் பரிகாரத்திற்காகவும்” என்று சேர்த்துக்கொண்டார். அந்த அரிக்கும் தூளை முகத்தில் தேய்த்தபோது, “என் கண்களையும் விட்டுவைக்காதீர்கள் — என் இளமையில் அவை பாவத்தின் கருவிகளாக இருந்தன” என்றார். ஒருநாள், கடற்கரை வெப்ப மணலில் நடத்தப்பட்டு கடுந்தாகத்தில் தவித்தபோது, நீர் கேட்டார்; காவலர்கள் கடல் நீரைக் கொடுத்தனர். விசுவாசத்துடன் அதைக் குடித்தார் — இனிமையாக, கசப்பின்றி இருந்தது.",
        },
        {
          heading: "ஒரு மரத்தில் ஏழு மாதங்கள் சங்கிலி",
          body: "திருவனந்தபுரத்திற்கு மீண்டும் கொண்டுவரப்பட்டு சிறையிலடைக்கப்பட்டபோது, கிறிஸ்தவர்களும் ஆர்வமுள்ள பிறமதத்தினரும் — அவர் ஒருபோதும் கற்பிக்கத் தவறாதவர்களும் — பெருங்கூட்டமாக வந்தனர்; எனவே மன்னர், மூன்று காத தூரத்தில் உள்ள ஒரு பாலைவனத்திற்கு இரவில் அவரை அழைத்துச் சென்று ஒரு மரத்தில் சங்கிலியால் கட்டி வைக்க ஆணையிட்டார். ஒரு அடி வைக்கவோ, நிற்கவோ முடியாதபடி கட்டப்பட்டிருந்தார். ஏழு மாதங்கள் அவ்வாறே — வெயிலுக்கும் புயலுக்கும் வெளிப்பட்டபடி — இருந்தார். கடைசியில் காவலர்கள் இரக்கம் கொண்டு சங்கிலியை நீட்டினர், மேலே ஒரு வைக்கோல் கூரையும் அமைத்தனர். அந்தச் சிறு சுதந்திரத்தைப் பயன்படுத்தி தெ லானோய்க்கு எழுதி, தனது சிறையிடத்தை அறிவித்து, “வலியோரின் அப்பத்தை” கொண்டுவரும் ஓர் அருட்தந்தையை அனுப்புமாறு கேட்டார். தெ லானோய் உண்மையாக நிறைவேற்றினார்; நற்கருணை அந்த பாலைவனத்திற்கு வந்தது. மறைவிடம் வெளிப்பட்டதும், அந்தப் பாலைவனம் ஒரு புனிதப் பயணத் தலமாக மாறியது. கிறிஸ்தவர்களும் பிறமதத்தினரும் தினமும் பெருங்கூட்டமாக வந்தனர்; அவரது ஜெபத்தால் அற்புதங்கள் நிகழ்ந்தன. பழைய நூல் கூறுவதுபடி, இது இரண்டு ஆண்டுகள் தொடர்ந்தது.",
        },
        {
          heading: "இறுதி இரவு",
          body: "மக்களின் வருகையை அடக்க முடியாமல், மன்னர் கடைசியில் தனது மூடநம்பிக்கையை வீசிவிட்டு மரண தண்டனையை அறிவித்தார். வீரர்கள் நள்ளிரவில் வந்து, மற்றொரு சிறைக்குக் கொண்டுசெல்லப்படுவதாக மட்டுமே கூறினர் — ஆனால் மேலிருந்து ஒளியால் அறிந்திருந்த அவர், “ஏன் மறைக்கிறீர்கள்? என்னை எங்கே அழைத்துச் செல்கிறீர்கள் என்பது எனக்குத் தெரியும்; தாமதிக்காமல் போவோம்” என்றார். மரண மேடைக்கு வந்தபின் சில நிமிடங்கள் ஜெபிக்க அனுமதி கேட்டு, பின்னர் எழுந்து: “நான் என் கடமையைச் செய்துவிட்டேன்; உங்கள் கடமையைச் செய்யுங்கள்” என்றார். மூன்று துப்பாக்கி குண்டுகள் சுடப்பட்டன. இயேசு, மரியா என்ற இனிய நாமங்களை உச்சரித்தபடி அவர் வீழ்ந்தார்; இரண்டாம் சுடுதல் அவரது இரத்தசாட்சியத்தை நிறைவேற்றியது. மூன்று வருட கொடிய துன்பத்திற்குப் பின், இந்த கிறிஸ்தவ வீரன் இவ்வாறு மரித்தார் — 1752 ஜனவரி 14, அரல்வாய்மொழியில். உடல் கோட்டாறுக்கு எடுத்துச் செல்லப்பட்டு புனித பிரான்சிஸ் சேவியர் ஆலயத்தில் அடக்கம் செய்யப்பட்டது. 2022 மே 15-ல் திருத்தந்தை பிரான்சிஸ் அவரைப் புனிதராக அறிவித்தார்.",
        },
      ],
      bond: {
        label: "எங்கள் ஆலயத் தொடர்பு",
        title: "ஏன் வடகாங்குளம் அவரை தனது சொந்தமாகக் கொள்கிறது",
        intro:
          "தேவசகாயம் இந்தியா முழுவதும் வணங்கப்படுகிறார்; ஆனால் அவரது வரலாறு ஒவ்வொரு திருப்பத்திலும் எங்கள் ஆலயத்தினூடாகவே பின்னப்பட்டுள்ளது. அவரை ஏற்றுக்கொண்ட திருமுழுக்கு தீர்த்தம், அவர் கைது செய்யப்படும்போது கட்டப்பட்டுக் கொண்டிருந்த ஆலயம், இங்கேயே பாதுகாக்கப்படும் திருஎச்சங்கள் — அனைத்தும் வடகாங்குளத்திற்கே சொந்தம்.",
        pillars: [
          {
            heading: "எங்கள் தீர்த்தத்தில் திருமுழுக்கு, 1744",
            body: "இங்கே வடகாங்குளத்தில்தான், அப்போது ஆலயப் பொறுப்பாளராக இருந்த இயேசுசபை அருட்தந்தை ஜான்-பாப்டிஸ்ட் பூத்தாரி, நீலகண்ட பிள்ளையின்மீது திருமுழுக்கு நீரை வார்த்து, “கடவுளே என் துணை” எனப் பொருள்படும் தேவசகாயம் — லாசர் என்னும் பெயருக்கு இணையான தமிழ்ப் பெயரை — அவருக்குச் சூட்டினார்.",
          },
          {
            heading: "எங்கள் ஆலயத்திற்கான மரத்திற்காகவே கைது",
            body: "அருட்தந்தை பூத்தாரி வடகாங்குளம் ஆலயத்தைக் கட்டிக் கொண்டிருந்தார். அந்த கட்டிடத்திற்கான மரத்தை அரச காடுகளிலிருந்து பெற முயன்றபோதே, பின்னர் அவரை அழித்த பிராமணருடன் தேவசகாயம் மோதினார். இரத்தசாட்சியமும் எங்கள் ஆலயமும் அவற்றின் வேரிலேயே பின்னிப் பிணைந்துள்ளன.",
          },
          {
            heading: "அவரது சங்கிலிகள் இங்கேயே பாதுகாக்கப்படுகின்றன",
            body: "1752-ல் அவரது மரணம் முதல் இன்றுவரை, அவர் இரத்தசாட்சியத்தின் போது அணிந்திருந்த ஆடையின் ஒரு பகுதியையும், அவர் கட்டப்பட்ட அதே சங்கிலிகளையும் வடகாங்குளம் ஆலயம் பேணி வைத்துள்ளது. (அகஸ்து ஜாங், இ.ச., லெ மதுரே, 1894.)",
          },
          {
            heading: "இரண்டு இயேசுசபையினர், ஒரே ஆலயம்",
            body: "அவருக்குத் திருமுழுக்கு அளித்த அருட்தந்தை பூத்தாரி (1707–1757) ஆலயத்தைத் தொடங்கி வைத்தார்; வடகாங்குளத்தில் “ஆசீர்வாதத்தோடு” நினைவுகூரப்படுகிறார். மற்றொரு கலங்கிய ஆலயத்தைக் குணப்படுத்த ஆவூருக்கு அவர் அனுப்பப்பட்டபின், அருட்தந்தை க்ளெமென்ட் டொமாஸினி அவர் தொடங்கிய ஆலயத்தை நிறைவு செய்தார் — மக்களால் மிகவும் நேசிக்கப்பட்டதால், அவர்கள் தங்கள் குழந்தைகளுக்கு அவரது பெயரைச் சூட்டினர்; வறட்சியின்போது பிறமதத்தினர் கூட அவரை அழைத்தனர்.",
          },
        ],
      },
      sources: {
        heading: "மூலங்கள்",
        body: "முக்கியமாக அகஸ்து ஜாங், இ.ச., லெ மதுரே: பழைய மற்றும் புதிய பணி, தொகுதி I (பாரிஸ், 1894), பக். 196–203, மற்றும் ஜோசப் பெர்ட்ரான், இ.ச., லா மிஷன் து மதுரே, தொகுதி IV (பாரிஸ், 1847), பக். 385–420 — அருட்தந்தை ஜெ.-பா. பூத்தாரியின் வாழ்க்கை குறிப்பு — ஆகியவற்றிலிருந்து தொகுக்கப்பட்டது. இவ்விரு நூல்களும் ஆலயத்தின் மதுரே மிஷன் நூலகத்தில் பாதுகாக்கப்படுகின்றன.",
      },
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
