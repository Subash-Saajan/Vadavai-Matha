export type Lang = "en" | "ta";

export const dict = {
  en: {
    nav: {
      home: "Home",
      history: "History",
      mass: "Mass & Festivals",
      festivals: "Festivals",
      gallery: "Gallery",
      architecture: "Architecture",
      contact: "Contact",
      faq: "Questions & Answers",
      sources: "Sources",
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
        "For centuries, the small village of Vadakankulam in the Tirunelveli district has been home to one of South India's most cherished Marian shrines. Our Lady of the Assumption — known to her devotees as Vadakankulam Matha — has watched over generations of the faithful, drawing pilgrims from every corner of Tamil Nadu and beyond.",
      patronessP2:
        "The image of Our Blessed Mother, draped in royal red and gold and crowned with stars, embodies the love and reverence of countless families who have placed their joys, sorrows, and silent prayers before her. Each year during her August feast, the village transforms into a sea of light and song, as thousands gather to honour the Mother who has never refused a sincere prayer.",
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
        "Three hundred years of one village, told straight through — from a woman's roadside cross in a southern forest to the great two-nave church they call Little Rome.",
      contentsLabel: `Contents`,
      contentsHint: `Choose a chapter below to jump straight to it — no need to scroll through the ones before.`,
      chapterWord: `Chapter`,
      biblioLink: `The full bibliography`,
      noteLabel: `Note`,
      // The four steps at the foot of a chapter on mobile.
      navPrev: `Previous`,
      navNext: `Next`,
      navPrevChapter: `Previous chapter`,
      navNextChapter: `Next chapter`,
      navTapAgain: `Tap again to go`,
      eras: [
        {
          id: `clearing-in-the-forest`,
          span: `1542–1693`,
          heading: `A Clearing in the Forest`,
          blurb: `Before there was a parish there was a coast, a road through the forest, and a woman who set up a cross outside her door.`,
          dots: [
            {
              year: `1542–1544`,
              title: `The coast that was already Christian`,
              body: `Late in 1542 a Basque priest came ashore on the pearl-fishing coast of the far south and found the work already begun. Ten years earlier Fr Michael Vaz and his priests had received into the Church, it was said, twenty thousand Parava fisher-folk in thirty villages. Francis Xavier came to teach them. He went from village to village with a bell in his hand, gathering the children first and then their parents, saying the Creed and the prayers in Tamil until all thirty had heard him. He never turned inland. Not one village of the interior joined that movement on the sand, and the forest country a day's walk east of the surf went on as it had always gone on.`,
            },
            {
              year: `1606`,
              title: `The mission that turned inland`,
              body: `For sixty years more the faith kept to the shore. Christianity, one historian wrote, lay entrenched without the walls of India. Then, on 10 November 1606, a small party rode out of Tuticorin for Madurai, and among them was a Roman nobleman's son named Roberto de Nobili. He found every door closed to him until he put off his European dress and took up the life of a sannyasi — one who resigns or abandons all. He learned Tamil and Sanskrit, ate once a day, and was let in. The inland mission he opened was passed down from one man to the next, and in 1683 it came into the hands of a Portuguese Jesuit of the royal household at Lisbon: John de Britto. From Madurai, de Britto came south.`,
            },
            {
              year: `c.1680`,
              title: `Santhaayi Ammaiyar and her cross`,
              body: `About the year 1680 a Christian woman named Santhaayi Ammaiyar came with her family out of Thoppuvilai and stopped at a place that was then nothing but forest — bush, trees and pits, and a tank on its northern side that gave the place its name. She built her house there. Because she was firm in her faith she raised a little roadside crusadi, a cross-shrine, in the open ground facing her door, and she prayed at it where anyone passing could see her. Others came and built beside her. A settlement gathered around one woman's cross.`,
            },
            {
              year: `c.1684`,
              title: `The priest on the forest road`,
              body: `The village stood on the old forest road, “a stopping place between Travancore and the Pandiyan kingdom,” where travellers going either way broke their journey. One morning Santhaayi was out gathering cotton when a priest came riding by. She ran to him and asked him to bless her house and the little cross she had raised beside her door, and he stopped his horse and did. His name was John de Britto, though the Tamils called him Arulanandar, *the joy of grace*. He had ridden as far south as this village, and no further. It was a hard country; only a year before, he had written that it was “unstable as the waves of the sea, shifting like the sands of the desert.” Yet the little cross he blessed that morning outlasted all of it, and everything the village would become began there.`,
            },
            {
              year: `1685`,
              title: `A chapel of thatch`,
              body: `More families came, and the faith spread until the cross by Santhaayi's door could no longer hold them all. By 1685 they had built themselves a church, a small thing of thatch. Those were the years the whole Madura mission was in de Britto's charge. Every church that followed it was larger than the last.`,
            },
            {
              year: `1685–86`,
              title: `The first harvest`,
              body: `In these years de Britto was baptising thousands across the south. In one stretch of two months alone, his biographer counted “two thousand seven hundred”. At Vadakkankulam it is believed he baptised around two hundred. These were the first Christians the village ever had, men, women and children brought to the water together. It was its founding harvest, and from it grew the great Christian community this place would one day be known for.`,
            },
            {
              year: `1693`,
              title: `The martyr`,
              body: `Eight years after the thatch went up at Vadakkankulam, he was in irons. On the eve of his death, in the prison at Oriyur, he wrote to his brethren. A straw served him for a pen, and his ink was charcoal moistened with his own spittle. “The only crime I am accused of is, that of having taught the law of Jesus Christ… as this crime is a virtue, the punishment cannot be otherwise than honourable to me.” The next morning he was beheaded, forty-five years old, and two and a half centuries later Rome named him a saint. To the wider Church he is a martyr of the far south. To Vadakkankulam he has always been Arulanandar, the priest it remembers as its founder, whose feast it keeps each February.`,
            },
          ],
        },
        {
          id: `first-inland-parish`,
          span: `1698–1740`,
          heading: `The First Inland Parish`,
          blurb: `A first priest beaten for a treasure he never had and brought back by a queen's word, a name in a letter to Rome, and eight hundred baptisms in two seasons: the clearing became a parish.`,
          dots: [
            {
              year: `1698`,
              title: `The first parish priest`,
              body: `For years a priest had only ridden through. Then the mission judged the place worth a house of its own, set as it was on the border of Travancore and the Pandiyan country and convenient to both. The first priest sent to live here, about 1698, was Fr Bernard de Saa. From him the parish's roll of pastors begins, and it has run on without a break to the priest who says Mass this morning.`,
            },
            {
              year: `1700`,
              title: `The priest and the queen`,
              body: `De Saa had not been long among them when the persecution fell. Men who were certain the priest was hiding money came for him one night while the fever was on him, dragged him from his bed, struck him, bound him with ropes and carried him before the Governor, who held him a while and then drove him out of the district. A fellow Jesuit, Fr Pierre Martin, came upon him months afterward still broken from it, and set down what he saw: “the traces of the beatings, and how all his teeth had been knocked out.” What brought him back was a word from a throne. Fr Laynez carried his case to Mangammal, the queen who then ruled Madurai, and she let him return to Vadakkankulam.`,
            },
            {
              year: `1709`,
              title: `The name in a Jesuit letter`,
              body: `By 1709 this place had its name in the letters the Jesuits sent home to Rome. The Annual Letter of that year puts Fr Maria Xavier Borghese at the head of the district of Vadakencoulam, and says of him: “He labours for the conversion of the heathen with an admirable zeal; the ardour of his spirit supplies for the strength of the body.” It is one line in a report, and it tells us nothing of the church or the village. But from here the record does not break again: the parish keeps its place in the written history of the mission from this year on.`,
            },
            {
              year: `1712–1713`,
              title: `Eight hundred in two seasons`,
              body: `The years that followed were the mission's spring. In two seasons, around 1712 and 1713, nearly eight hundred adults were baptised at Vadakkankulam, besides their children. By that year the church here counted at least four thousand one hundred and twenty-eight adults, with eighty-five more preparing for baptism that October. What had begun with two hundred under a roof of thatch was now one of the great Christian communities of the southern frontier.`,
            },
            {
              year: `1714`,
              title: `A residence on the frontier`,
              body: `By 1714 the Society of Jesus had made Vadakkankulam a residence in its own right, no longer a village on a circuit but a house where a father lived. In the mission's own account of those years a missionary writes in the first person of an impostor who came “into the church of Vadakencoulam where I then was”, found out by the catechist walking at his side. A resident priest, a working church, a catechist beside him: within thirty years of the thatch, the parish had arrived.`,
            },
          ],
        },
        {
          id: `statue-and-the-saint`,
          span: `1741–1775`,
          heading: `The Statue and the Saint`,
          blurb: `The golden years of Fr Buttari — a statue washed ashore from the sea, the baptism of a future saint, and the first lasting church rising in the shape of a cross.`,
          dots: [
            {
              year: `1742`,
              title: `A box out of the sea`,
              body: `In 1742 the sea put a wooden box ashore at Kootapuli, on the coast below the village. It was stencilled “To Vadakankulam, From Portugal”, and it held carved images of Our Lady. The fishermen carried it up to the parish priest, Fr John Baptist Buttari. He kept one image for his own church, sent a second to Kamanayakkanpatti, and gave the third into the Bishop's care. The one that stayed here is Our Lady of the Assumption, the statue that stands above this altar, and the statue that would one day weep.`,
            },
            {
              year: `1745`,
              title: `The baptism of Neelakanta Pillai`,
              body: `Neelakanta Pillai was already a man of standing when he came to the font: an officer at the court of the king of Travancore, of good family, and thirty-two years old. It was Eustache de Lannoy, an officer of the king's own army, who first spoke to him of the Christian faith and sent him on to Fr Buttari, the priest of Vadakkankulam. Buttari could see the persecution such a convert would draw, and he did not hurry. He “judged it necessary to defer the grace he so ardently desired; and, having tested him long, admitted him to the sacrament of regeneration.” The instruction ran nine months. On 14 May 1745 the water was poured in the church here, with the catechist Gnanaprakasam Pillai standing as his godfather, and the officer took the name Lazarus, and in Tamil Devasahayam, God is my help.`,
            },
            {
              year: `1749`,
              title: `From thatch to brick`,
              body: `By 1749 de Britto's thatch could no longer hold the congregation, and Fr Buttari set about a lasting church to replace it. He “laid the foundations” of it, and Fr Thomassini carried it to completion. By the parish's own record it rose in broad bricks, its foundation stone blessed at a kankol festival the parish dates to 1749.`,
            },
            {
              year: `c.1749`,
              title: `The errand for timber`,
              body: `Fr Buttari was “occupied in building his church”, and it wanted timber. To help his priest, Devasahayam went to an old friend at the king's court to ask leave to cut wood in the royal forests. They never got as far as the timber. They fell to arguing about religion instead, and the man went away threatening his life. The warrant followed soon after, and when it came, Devasahayam gave himself up without resistance.`,
            },
            {
              year: `1752`,
              title: `A church in the shape of a cross`,
              body: `By 1752 the church stood finished, raised in the form of a cross with its altar facing east toward the rising sun. Like de Britto's chapel before it, it was “dedicated to the Holy Family”. Its great feast was St Francis Xavier's, kept every December with a solemn novena. The parish fixes the year by two inscriptions once set inside the church's walls.`,
            },
            {
              year: `1752`,
              title: `A martyr's death`,
              body: `Three years of it: paraded through the towns on a buffalo, scourged, and chained for months to a tree in the wilderness. On 14 January 1752 they took him out to the Travancore lines at the Aralvaimozhi gap and shot him, and “the martyr expired, repeating the sweet names of Jesus and Mary”. His body was gathered into the church of St Francis Xavier at Kottar, where the Bishop of Cochin had the Te Deum sung and preached the martyr's panegyric himself. Vadakkankulam kept what it could of him: a part of his garment, and the chains he had been bound with. His wife, baptised Gnanapoo Theresa, lies in the parish cemetery.`,
            },
            {
              year: `1773–1775`,
              title: `The Society is suppressed`,
              body: `In 1773 Pope Clement XIV suppressed the Society of Jesus in every country in the world. The Jesuits left in Tinnevelly, here and at Talai and Manapar, died one by one, and priests from Goa took their places. The last of the old fathers here was Clement Thomassini. Feeling his end near, he “had himself carried to Talai, to Fr Antoine Douarte”, and there he died in 1775, seventy-five years old. With him the first Jesuit century at Vadakkankulam closed.`,
            },
          ],
        },
        {
          id: `the-weeping-madonna`,
          span: `1775–1838`,
          heading: `The Weeping Madonna`,
          blurb: `Sixty-three years with no Jesuit — and in the middle of them, on a Friday forenoon in October, the morning the whole village came running.`,
          dots: [
            {
              year: `1775–1838`,
              title: `Sixty-three years`,
              body: `For sixty-three years no Jesuit served this parish. It was not abandoned. Priests came from Goa under the Bishop of Cochin, and the roll of them runs without a gap: Deva Varadhanar, Ignatius, John Louis Cardoza and their successors. The feast was kept, the children were baptised, the dead were buried. And the village did more than hold on. From about 1780 it became “the sole centre of the inland mission”, with four divisional centres set under it, Sendamangalam, Andipatti, Kamanayakkanpatti and the village itself, served by priests from Cochin who “did their best to keep up the foundations already existing” until they made over the whole charge, in 1837, to the first new Jesuits at Palamcottah. Through all of it, the most extraordinary thing that has ever happened here happened in the middle of that time.`,
            },
            {
              year: `after 1775`,
              title: `The father they would not let go`,
              body: `They never let go of Thomassini. In his lifetime he had won them by his gentleness, he had finished their church, and he was the last Jesuit they would have for sixty-three years. He had died away from the village and was buried elsewhere, but his own people “raised a monument in their midst” and kept his memory as a saint's. Ninety years after his death a Jesuit writing about this district still used the present tense: “The Christians venerate him as a saint, give his name to their children, and visit his tomb with an extreme devotion.” Even those who were not Christians, he added, called on him in their troubles, holding that his intercession brought the rain down on their harvests.`,
            },
            {
              year: `1803`,
              title: `A Friday forenoon in Aippasi`,
              body: `On the forenoon of Friday, 21 October 1803, in the Tamil month of Aippasi of the year 979, a man named Savarimuthu Pillai, who had come from Tirunelveli to see Mr Bilderbeck, a European settled in the village, went into the church to pray. The statue of Our Lady of the Assumption stood above the altar in a recess closed by a double door, and that morning both its leaves were open. As he knelt, a thin transparent cloud gathered behind her and wrapped her round. Her eyes lifted toward heaven and filled, and the tears ran down her cheeks; her face turned sorrowful; and her folded hands parted and stretched out until they touched the walls of the recess. And every other statue on the altar, the record says, “expressed compassion and mourning”.`,
            },
            {
              year: `1803`,
              title: `The bell at the wrong hour`,
              body: `The catechist Madurendira Annaviyar climbed up to the altar and wiped her face, and the tears came again, and would not stop. Then they rang the bell. It was not an hour at which the bell was ever rung, and the whole village came in from the fields and the houses to see why. They stood and looked, and then they wept and prayed, and sang the old penitential chant that is sung when a people is afraid: Parce Domine, parce populo tuo, spare, O Lord, spare your people. And as they prayed, the statue and all the other images “resumed their customary aspect”, and the face above the altar was an ordinary carved face again.`,
            },
            {
              year: `1803`,
              title: `Those who saw it`,
              body: `Many saw it, and the mission's own record names two of them. Fearing his eyes had deceived him, Savarimuthu called the catechist Yagappar Pillai and Miss Henriette Bilderbeck, the European's daughter; they came, looked closely, and saw the same thing for themselves: the clouded face, the tears, and the hands stretched out to the walls of the niche. Nor did the account come down as rumour. The parish's chronicler, Sebastian Pillai, wrote it from the mouths of those who had seen it, the honourable catechist and the most trustworthy people of the village, taking it down, he says, at their own dictation.`,
            },
            {
              year: `1803–1817`,
              title: `The family in the church that morning`,
              body: `The Bilderbecks were flesh and blood, and they can be named. Christopher Bilderbeck, born about 1758, was a merchant of European descent who settled at Vadakkankulam late in the eighteenth century and died here in 1817. They were people of standing, holding the revenue-farm of Nangunery; and Henriette, who had examined the statue that morning, was his daughter. A son, John, was born in 1809, six years after the weeping; and when John died in 1880 an English missionary journal recorded of him that he had been “born in India… of a Roman Catholic family, and trained for the priesthood of that Church.” The family that stood in this church that morning left a paper trail of its own, in Protestant hands, kept by people with no reason at all to flatter a Catholic shrine.`,
            },
            {
              year: `1914`,
              title: `The books that carry it`,
              body: `For a long time it was thought the whole of that morning came down a single line: Léon Besse's La Mission du Maduré, printed at Trichinopoly in 1914, which gathered up the papers of the Madurai mission and set the parish's record of 1803 into print. It does not. Nine years before Besse, a Jesuit of this mission, Fr Dessal, had already printed the account in full; and in 1930 a life of Devasahayam, written in Malayalam and in another tradition entirely, recorded the same European woman examining the same three signs. Three witnesses, in three hands, none of them copying the others. It was never carried to Rome, and no commission has ever weighed it. But it reaches us the way this village has always carried it: a dated morning, named witnesses, and two hundred and twenty years of keeping the feast.`,
            },
          ],
        },
        {
          id: `great-two-nave-church`,
          span: `1838–1872`,
          heading: `The Great Two-Nave Church`,
          blurb: `The French Jesuits came back, and in seventeen years a poor village raised a church one historian called probably without equal in the world: two naves opening apart at the doors, leaning together down their length, meeting at a single altar.`,
          dots: [
            {
              year: `1838`,
              title: `The Society comes back`,
              body: `In 1838 the restored Society of Jesus came down again into the southern mission, and after sixty-three years Vadakkankulam was in Jesuit hands once more. The fathers who arrived this time were French. What they found waiting for them was Fr Buttari's brick church of 1752, by now nearly a century old, and a congregation grown far too large to fit inside it.`,
            },
            {
              year: `1839`,
              title: `On horseback at half past two`,
              body: `Fr Joseph Bertrand, superior of the Madurai mission, kept the great novena and the solemn feast of St Francis Xavier here in 1839, and his journal keeps the shape of the day. He was on horseback at half past two in the morning. He reached the church at eight o'clock, on 23 November, and said the Mass that opened both the novena and the year's administration of the sacraments. Then he rode on inland for Palamcottah.`,
            },
            {
              year: `1848`,
              title: `What the Bishop asked for`,
              body: `The great church began as a request. On his pastoral tour of 1848 Bishop Alexis Canoz, Vicar Apostolic of Madurai, came to Vadakkankulam — on the 21st of June, the village remembers — and asked the people to begin putting money aside for a large new church. They were not a rich village, and it took them seven years. Then he came back and blessed the stone.`,
            },
            {
              year: `1838–1855`,
              title: `The Bilderbecks' thanksgiving`,
              body: `Among those who gave, the parish has never forgotten one family. The Bilderbecks — the name comes into the parish books garbled as “Hentriett Belderk” — had been married twenty-seven years without a child. They prayed to Our Lady of this church, and within the year a son was born to them, and their joy, the Tamil account says, passed all measure. What they gave toward the new building, they gave in thanksgiving.`,
            },
            {
              year: `1855`,
              title: `Templum sit duplex, ara sed una`,
              body: `On 9 August 1855 Bishop Canoz blessed the foundation stone of the church that stands today. One of the priests composed a motto for the design, and it is the whole building in four words: Templum sit duplex, ara sed una — let the temple be twofold, but the altar one. Two naves would open apart at their doors and lean toward each other down their length until they met, and where they met there would be one sanctuary and one altar, for everyone who came in at either door.`,
            },
            {
              year: `1855–1872`,
              title: `Seventeen years`,
              body: `It took seventeen years. The work was driven by Fr Joseph Grégoire, whom his chronicler calls the apostle of Vadakenkoulam, and the building itself was engineered by a Jesuit lay-brother named Joseph Bergenthal, whose entry in the Society's Roman register for 1872 gives his office in two words — Ædif. eccl., builder of the church. Between them they turned twenty-four arches that carry their own weight, in lime and palm-toddy mortar, without cement, without iron, and without one wooden beam holding anything up.`,
            },
            {
              year: `1861`,
              title: `Two bells out of France`,
              body: `The twin bells were cast in France in 1861, the gift of a benefactor named Casimir Grégoire, whose name is still in the bronze where the founder put it. They travelled out by sea to Madras and up through Tirunelveli in crates, and in 1872 they were hung, one in each of the two new towers. People here still say that when the two ring together there is a sweetness in the sound that is heard nowhere else in this country.`,
            },
            {
              year: `1863`,
              title: `The tomb beside the church`,
              body: `What the seventeen years cost is written beside the church. “The piety of the Christians of Vadakenkoulam raised, near their church, a modest tomb to Fr Eugène Rossignol, who died on 25 January 1863.” He had caught the cholera nursing the Christians of Callikoulam. Fr Victor Delpech, who would one day anoint the dying Fr Grégoire aboard ship, came back to this village at the end and died here himself, in the arms of Fr Pouget.`,
            },
            {
              year: `c.1864`,
              title: `A convent of native nuns`,
              body: `Setting down the mission's returns for about 1864, a British district manual counted three convents in the whole Jesuit mission of Tinnevelly: one at Tuticorin, one at Adeikalapuram, and “A Convent for Native Nuns at Vadakankulam” — the only one away from the fishery coast. Sisters were living and teaching here while the great church was still a building site. No parish paper remembers them that early. A government clerk did.`,
            },
            {
              year: `1872`,
              title: `The church is blessed`,
              body: `In 1872 it was finished, and Bishop Canoz came back to bless it. The district gazetteer sets the thing down without ornament: “two converging naves which meet in a common chancel.” Auguste Jean saw it as an open compass — two arms splayed at the doors, drawing nearer down the length of the building, closing at last on one shared sanctuary. Over it stand two octagonal towers of ninety-two feet, and inside, the vaults were painted in dyes drawn from plants and trees.`,
            },
            {
              year: `1873 or 1875`,
              title: `The Red Sea`,
              body: `He did not long outlive it. “What the building of this sanctuary cost him in cares and fatigues, God alone knows,” wrote his chronicler. His doctors sent him home, and he never arrived: he died on the 19th of September in the crossing of the Red Sea, anointed by Fr Delpech, after thirty years a missionary. The church he spent seventeen of them on has now stood a century and a half.`,
            },
          ],
        },
        {
          id: `little-rome`,
          span: `1891–1944`,
          heading: `Little Rome`,
          blurb: `A festival chariot, a wall taken down, a new diocese — and the two words a bishop said in 1926 that became the village's second name.`,
          dots: [
            {
              year: `1891`,
              title: `The car of the Assumption`,
              body: `In 1891 the village built a chariot: a ther thirty-five feet high, carved by local sculptors out of jackfruit, teak and neem. It carried Our Lady through these streets for more than a hundred years. It rests now as the cradle of the Pilgrims' Mother, and a newly designed ther has taken its road since 2014. The procession still goes out in the small hours of 15 August, and something close to a hundred thousand people walk with it, a great many of them come over the hills from Kerala.`,
            },
            {
              year: `c.1910`,
              title: `The wall inside the church`,
              body: `For a generation a partition ran down the inside of the church Fr Grégoire had built, dividing one nave from the other. About 1910 Fr Adrien Caussanel — a fierce, ascetic priest who lived eighteen years on milk and bananas, and whom this village has never forgotten — had it pulled down. What the motto on the foundation stone had promised in 1855, the building was finally allowed to be: twofold, and one.`,
            },
            {
              year: `1881–1923`,
              title: `Book 450`,
              body: `The Jesuit archive at Shembaganur holds a volume catalogued as Book 450: “Diary by Fr A. Caussanel S.J. at Vadakenkulam, 1881–1923”. It is not a diary kept here day by day — Caussanel was not ordained until 1884 and did not reach India until 1888. It is something better than that. The Jesuits' own magazine records what he was doing in this village: he wrote “diaries, a history of the country”, and he “searches out the old manuscripts and deciphers them”. Book 450 is that work — the past of this parish gathered up out of older papers by a man who lived among the people whose past it was. It is on the shelf still.`,
            },
            {
              year: `1923`,
              title: `A new diocese`,
              body: `In 1923 the Diocese of Tuticorin was erected, and Vadakkankulam passed out of the old Diocese of Trichinopoly into the new see under its first bishop, Francis Tiburtius Roche. The Catholic Directory of the following year prints the parish as directories print things: “Vadakankulam (Tinnevelly Dt.) — Revv. Y. Ignatius, G. Michael, Asst. — Cath. 4,765, vills. 17: Churches: brick 1, clay 4.” Neither priest was a Jesuit. After more than two centuries, the care of this parish had passed to the diocesan clergy.`,
            },
            {
              year: `1926`,
              title: `Chinna Romapuri`,
              body: `In 1926 Bishop Roche came to see the Holy Family Church, and what he said about it became the village's second name. Struck by the grandeur of the place, he called Vadakkankulam Chinna Romapuri — Little Rome. It has been Little Rome ever since: on the lips of pilgrims, on the boards at the roadside, and in the way people from the next district still tell you where they are going.`,
            },
            {
              year: `1930`,
              title: `The old sacristan`,
              body: `In Rome, Bishop Roche laid his people's homage before Pope Pius XI, and the Pope sent mementoes back for the most deserving Christians of Tuticorin. One of them went to the old sacristan of Vadakenkoulam — brother to a vicar general and to the superior of a convent, and still, at eighty-two, keeping the sacristy of this church. He was given the Bene Merenti medal. The Jesuits' magazine printed his years and his office, and forgot to print his name.`,
            },
            {
              year: `1944`,
              title: `Fatima Giri`,
              body: `In 1944 the Servants of the Rosary — a congregation founded at Jaffna in 1928 — opened their first house in India here: the Fatima Giri Ashram, established by Antony Susainather, whom the order honours as a Servant of God. The Rosarians in India began in this village. The Fathers keep the house at Fatima Giri still, and with the Servite and the Bethany Sisters they belong to the ordinary week of the parish.`,
            },
          ],
        },
        {
          id: `town-of-learning`,
          span: `1892–1970`,
          heading: `A Town of Learning`,
          blurb: `Sisters teaching the village girls their letters, a school for lace and the needle, and at last a hospital of forty beds — the ladder a poor parish built for itself.`,
          dots: [
            {
              year: `1892`,
              title: `The sisters who taught the girls`,
              body: `The Sisters of Our Lady of the Seven Sorrows were Indian religious, formed at Trichinopoly in 1876. By 1892 there were sixty-five of them, and of the four houses they kept beyond that city, one was here. Their particular work was the education of girls, and everywhere, it was written of them, “they direct flourishing schools”. The Society's Roman register sets the priest of Vadakkankulam down as chaplain of that convent and director of its school — in 1900, and again in 1914 under Fr Caussanel. In a country where most girls were never taught to read, the girls of this village were taught to read.`,
            },
            {
              year: `c.1922`,
              title: `Lace, thread and the needle`,
              body: `An inspector came to the sisters' needlework school in 1921. From 1922 they were teaching needlework, embroidery, lace, knitting and dress-making, and in 1966 the tailoring school passed wholly into their charge. The R.C. Lace Industrial School and the Osanam Sewing Institute are counted among the works of this parish to this day. They were the second rung of the ladder the village built for its daughters: letters first, then a trade in the fingers, and a wage that did not depend on the rain.`,
            },
            {
              year: `1970`,
              title: `Forty beds`,
              body: `Fr Maria Gnanam, then parish priest, saw that his people had faith and letters and no doctor, and he wrote to the Sisters of the Little Flower of Bethany. Four sisters arrived on 27 July 1970 and began their healing ministry in a rented house. With help from Misereor they built St Thomas Hospital where it stands today — forty beds and an operating theatre, serving twenty-five to thirty villages around. They keep it still.`,
            },
          ],
        },
        {
          id: `shrine-and-the-saint`,
          span: `1993–present`,
          heading: `The Shrine and the Saint`,
          blurb: `Declared a shrine, crowned with a flag-mast, and rejoicing at the canonisation of the saint who was baptised within its walls.`,
          dots: [
            {
              year: `1993`,
              title: `Declared a shrine`,
              body: `On 6 August 1993 Bishop S. T. Amalanathar of Tuticorin consecrated the Holy Family Church and proclaimed it a sacred shrine. With the honour came the First Saturday of every month — a novena and adoration that pilgrims have kept from that year to this one.`,
            },
            {
              year: `2014`,
              title: `A new ther`,
              body: `In 2014 the parish had a new festival chariot of the Assumption designed and built, and the car the village had carved in 1891 came off the road after a hundred and twenty-three years of processions. In those same years the Calvary chapel of the Apparition shrine was completed, and statues were set up of St Devasahayam and St Arulanandar — the man who was baptised here, and the man who founded the place.`,
            },
            {
              year: `2021`,
              title: `The kodimaram`,
              body: `On 6 August 2021 Bishop Stephen Antony consecrated the flag-mast, the kodimaram, set up under the parish priest Fr John Britto. It was the opening day of the ten-day Perunkoor feast that runs to the Assumption on the fifteenth — and the same day of the year on which this church had been declared a shrine, twenty-eight years before.`,
            },
            {
              year: `2022`,
              title: `The first Indian layman`,
              body: `On 15 May 2022 Pope Francis canonised Devasahayam Pillai, baptised in this church on 14 May 1745 — the first Indian layman ever raised to the altars. What this church holds of him, it has held a long time: in 1894 a Jesuit historian recorded here a part of his garment and the chains he had been bound with. The head-cloth he wore as an officer of the Travancore court is kept here too, and every 15 August it is set out in a glass case for the pilgrims to venerate.`,
            },
            {
              year: `2012–2025`,
              title: `Patron of the laity`,
              body: `It neither began nor ended in 2022. Benedict XVI recognised the martyrdom in June 2012, and that 2 December Cardinal Angelo Amato beatified him in the Pope's name at Nagercoil. Pope Francis recognised the miracle in February 2020 and canonised him in May 2022. Then, by a decree of 16 July 2025 proclaimed on 15 October, Rome named him Patron of the Laity in India. The man who was baptised at this font is patron now of every lay Catholic in the country.`,
            },
            {
              year: `present day`,
              title: `Little Rome today`,
              body: `Vadakkankulam is an overwhelmingly Catholic town, and a remarkably literate one: the census counts 9,220 people, ninety-four in every hundred of them able to read. The parish reckons some 10,500 Catholics in about 4,000 families, organised through Basic Christian Communities. The great August Perunkoor feast still draws close to a lakh of pilgrims for the chariot procession in the small hours of the fifteenth, many of them crossing over from Kerala; and through the rest of the year the parish keeps its people close by its magazine, Vadavai Matha Malar, and its own live broadcasts. The bells, when they ring together, still sound the way people here have always said they sound.`,
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
      readMore: "Read more",
      list: [
        {
          name: "St. Devasahayam Pillai",
          feast: "Feast — January 14",
          epithet: "First Indian Layman Saint",
          body: "Baptised at this very church in 1745 and martyred for his faith in 1752, he was canonised in 2022 — the first Indian-born Catholic layman raised to the altars.",
          image: "/images/saints/devasahayam-pillai.jpg",
          href: "/saints/devasahayam-pillai",
        },
        {
          name: "St. John de Britto",
          feast: "Feast — February 4",
          epithet: "Arulanandar, Our Founder",
          body: "Known in Tamil as Arulanandar, the Jesuit who raised our first thatched chapel here in 1685 and dedicated it to the Holy Family, before his martyrdom in 1693.",
          image: "/images/de-britto-grotto.jpg",
          href: "/history",
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
        { label: "Baptised", value: "1745, by Fr Jean-Baptiste Bouttari, S.J. — at the parish of Vadakkankulam" },
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
          body: "De Lannoy sent him to the Jesuit Father Bouttari, at that hour the parish priest of the Christians of Vadakkankulam. The Father, foreseeing the storm that would follow, urged caution: the convert would face the wrath of his own kinsmen, the hostility of the brahmins all-powerful at court, the certain loss of his royal office. The young man answered that having found the true God, he would never abandon him, “though it cost him every advantage of this world, and even life itself.” Fr Bouttari baptised him in 1745 and gave him the name Devasahayam — “God is my help,” the Tamil for Lazarus. His wife was soon baptised; then other relatives; even officers of the army he had once commanded.",
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
            heading: "Baptised at our font, 1745",
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
    saintDeBritto: {
      back: "Saints of Our Parish",
      label: "The Founder of Our Parish",
      name: "St John de Britto",
      epithet: "Arulanandar — “the bliss of grace”",
      intro:
        "The Portuguese Jesuit who, in 1685, raised the first thatched chapel of the Holy Family at Vadakkankulam — the founding act from which this whole shrine descends. Martyred for the faith at Oriyur in 1693, he is venerated across the Tamil land as Arulanandar.",
      feast: "Feast — 4 February",
      canonised: "Canonised 1947 by Pope Pius XII",
      facts: [
        { label: "Birth name", value: "João de Brito — born 1 March 1647, Lisbon, Portugal" },
        { label: "Religious order", value: "Society of Jesus (the Jesuits) — entered 1662" },
        { label: "Mission", value: "The Madurai Mission of South India, from 1673; Superior of the Mission, 1685–86" },
        { label: "Founded this parish", value: "1685 — the thatched Holy Family chapel at Vadakkankulam, baptising some two hundred" },
        { label: "Martyred", value: "4 February 1693, at Oriyur — beheaded for the faith" },
        { label: "Canonised", value: "1947, by Pope Pius XII (beatified 1853)" },
      ],
      quote:
        "The whole crime of which I am accused is that I teach the law of the true God. How glorious to suffer and to die for so beautiful a cause!",
      quoteAttribution:
        "— from his own hand, written in the prison of Oriyur the night before his death, 3 February 1693",
      sections: [
        {
          heading: "A Nobleman of Lisbon",
          body: "João de Brito was born in Lisbon on 1 March 1647, into a noble family of the Portuguese court; as a boy he was a companion of the future King Pedro II. At fifteen he laid aside every prospect of that world and entered the Society of Jesus, and in time asked to be sent to the mission of the Indies — the hardest and most distant field the Society then knew.",
        },
        {
          heading: "The Sannyasi Missionary",
          body: "In South India he took up the method of Roberto de Nobili: to reach the Tamil people he laid aside the European's dress and diet and lived as a pandaraswami, a wandering ascetic — no meat, no comfort, travelling on foot from village to village. It carried the Gospel where a foreigner in foreign clothes could never have gone. The mission he served, the vast inland kingdom of Madurai, reached down into this southern country.",
        },
        {
          heading: "He Founded This Parish, 1685",
          body: "In 1685, while he was Superior of the Madurai Mission, de Britto came to the forest clearing of Vadakkankulam, where a Christian woman had already raised a roadside cross, and built a small thatched chapel — a “hut of branches” — dedicated to the Holy Family, baptising some two hundred people. That chapel is the seed of everything that followed: the stone church of 1752, the great two-nave church of 1872, the shrine declared in 1993. Every stone of Little Rome traces back to his hut. The colonial district gazetteer independently dates Christianity here to “the closing years of the seventeenth century.”",
        },
        {
          heading: "Recalled, and Returned",
          body: "Arrested and left for dead once already, de Britto was sent back to Portugal in 1687, where the court received him with honour and begged him to stay. He refused. Knowing that a return to the mission almost certainly meant death, he asked to go back to his Tamil Christians — and did, reaching the mission again in 1691.",
        },
        {
          heading: "Martyrdom at Oriyur",
          body: "Within two years he was seized again. Imprisoned at Oriyur, he wrote a last letter of serene joy the night before he died. On 4 February 1693 he was beheaded for the faith. His body was venerated at once; the King of Portugal had a church raised on the ground of his martyrdom, and pilgrims still go to Oriyur. He was beatified in 1853 and canonised by Pope Pius XII in 1947. To the Tamil Church he is Arulanandar — “the bliss of grace.”",
        },
      ],
      bond: {
        label: "Our Parish Bond",
        title: "Why This Shrine Calls Him Its Founder",
        intro:
          "St John de Britto is honoured across the Tamil land, but at Vadakkankulam he is more than a saint venerated — he is the founder. The parish begins with his hands.",
        pillars: [
          {
            heading: "He raised the first chapel, 1685",
            body: "The thatched chapel of the Holy Family that de Britto built here in 1685 is the first church of Vadakkankulam. The parish, the shrine, the whole story of Little Rome begins with it.",
          },
          {
            heading: "From his hut to Little Rome",
            body: "An unbroken line runs from his hut of branches to the stone church of 1752, the great two-nave church blessed in 1872, and the shrine proclaimed in 1993. Four churches on one ground — and his is the first.",
          },
          {
            heading: "Venerated here as Arulanandar",
            body: "The martyr-founder is kept in devotion at the parish he began — including the John de Britto grotto within the shrine grounds, where he stands as Arulanandar between St Michael and St Raphael.",
          },
        ],
      },
      sources: {
        heading: "Sources",
        body: "Compiled from Giuseppe Boero, S.J., Vita del beato Giovanni de Britto (Rome: La Civiltà Cattolica, 1853); from de Britto's own prison letter of 3 February 1693, printed in Joseph Bertrand, S.J., La Mission du Maduré, Vol. III; and from F. W. Faber, The Lives of… the Ven. John de Britto (London, 1851). See the shrine's Sources page.",
      },
    },
    gallery: {
      label: "Visual Journey",
      title: "Glimpses of Grace",
      intro:
        "Photographs of light, devotion, and stillness — moments captured in and around the parish.",
    },
    architecture: {
      label: "The Building",
      title: "The Architecture of Little Rome",
      intro:
        "Two naves that open like a pair of compasses and meet at a single altar. Twenty-four arches turned in lime and palm sap, holding a roof that has no iron in it. Twin towers of ninety-two feet — and a village that took its name from them.",
      heroAlt:
        "The white Gothic façade of the Holy Family Church, Vadakkankulam, with its twin octagonal towers and pinnacled roofline against a clear sky",

      peel: {
        label: "The Film of the Building",
        title: "The Raising of Little Rome",
        sub: "Scroll slowly. From a lone wayside cross in 1685 the church builds itself before you — chapel, stone church, foundation, arches, towers — until the doors of 1872 open on Our Lady.",
        hint: "Scroll to raise the church",
        chapters: [
          {
            y: "1685",
            t: "A Cross in the Sand",
            b: "By Santhaayi's wayside cross, St John de Britto blesses a small palm-thatched chapel; two hundred souls are baptised.",
          },
          {
            y: "1752",
            t: "The Stone Church",
            b: "Fr Buttari's cross-shaped church rises in whitewashed stone — the church whose statue would weep in 1803, and whose bell would ring the miracle.",
          },
          {
            y: "1855",
            t: "The Foundation",
            b: "Bishop Canoz blesses the foundation stone: Templum sit duplex, ara sed una — let the temple be twofold, but the altar one.",
          },
          {
            y: "1855–1872",
            t: "Seventeen Years Rising",
            b: "Fr Grégoire directs, Br Bergenthal engineers; twenty-four arches turn in lime, brick and palm-toddy — no cement, no iron.",
          },
          {
            y: "1872",
            t: "Little Rome",
            b: "The scaffolding falls away: twin towers of ninety-two feet, sixteen pinnacles — a facade so proud the town itself is renamed for it.",
          },
          {
            y: "Today",
            t: "The Church, Opened",
            b: "The doors of stone part on the painted interior — vaults and pillars in plant dyes, unfaded for 150 years.",
          },
          {
            y: "Vadavai Matha",
            t: "One Altar, One Mother",
            b: "At the single shared altar stands the statue that wept in 1803 — and the village became a shrine forever.",
          },
        ],
      },

      overtureLabel: "The Idea",
      overtureLead:
        "It is a church you can read like a creed — a building where every number in the stone is set down to stand for a truth of the faith.",
      overtureP1:
        "When the Jesuits set out to raise the third and greatest church at Vadakkankulam, Fr Joseph Grégoire gave it a form found almost nowhere else: a single building shaped like an open pair of compasses — two naves splayed wide at the doors, drawing together as they run east, until they meet at one shared altar.",
      overtureP2:
        "Seventeen years went into the building of it, and what rose was strange enough that a Jesuit chronicler called the plan “probably without equal in the world.” The village has been called Little Rome ever since.",
      numbers: [
        { v: "17", k: "years building" },
        { v: "24", k: "arches" },
        { v: "92", k: "feet of tower" },
        { v: "5", k: "doors" },
        { v: "0", k: "iron in the roof" },
        { v: "1", k: "altar" },
      ],

      churchesLabel: "Before This One",
      churchesTitle: "Three Churches, One Ground",
      churchesBody:
        "The great church of 1872 is the third to stand on this ground. Each of the first two was outgrown by the congregation that raised it.",
      churches: [
        {
          year: "1685",
          title: "A chapel of palm thatch",
          body: "Beside Santhaayi’s wayside cross, St John de Britto blesses a small thatched chapel; some two hundred people are baptised.",
        },
        {
          year: "1752",
          title: "The church of stone",
          body: "Fr Buttari’s cross-shaped stone church, finished by Fr Tomassini in broad brick from Perungudi. Its statue would weep in 1803, and its bell would call the village to come and see.",
        },
        {
          year: "1872",
          title: "The great church",
          body: "Bishop Canoz blesses the foundation stone in 1855. Seventeen years later he returns to sing the Mass that dedicates the building standing today.",
        },
      ],
      churchesCaption: "The church in an early parish photograph",

      planDrawTitle:
        "The floor plan of the Holy Family Church: one sanctuary, two naves converging, five doors",
      planNote:
        "Redrawn from வரைபடம் 5 in A. Sivasubramanian, Kiristhavamum Sathiyum (2001) — the only measured plan of this church in print.",
      motto: "TEMPLVM SIT DVPLEX, ARA SED VNA;\nFIDES VNA SIT, VNAQVE MENS.",
      mottoTr:
        "Let the temple be twofold, but the altar one; may they be of one faith, and of one mind.",
      mottoCaption: "Cut into the foundation stone, blessed 9 August 1855",

      craftLabel: "The Structure",
      craftTitle: "Not a Nail of Iron",
      craftBody:
        "Twenty-four arches span the interior, twelve of them joined in a single crown over the altar. Not one is carried by cement, by iron, or by a wooden beam: they were turned in lime mortar and have stood self-supporting for a century and a half. The engineering was the work of Brother Joseph Bergenthal — a Jesuit lay brother whom almost no account of this church troubles to name.",
      craftNegatives: [
        { t: "No cement", d: "lime mortar throughout" },
        { t: "No iron", d: "not a rod in the vaults" },
        { t: "No timber", d: "no beam, no pillar, no centring" },
      ],
      recipeTitle: "What the mortar was made of",
      recipe: [
        {
          ta: "பதனீர்",
          tr: "padaneer",
          gloss: "Palm sap",
          d: "drawn from the palmyra, before it ferments",
        },
        {
          ta: "சுண்ணாம்பு",
          tr: "chunnambu",
          gloss: "Lime",
          d: "burnt shell and limestone — the binder",
        },
        {
          ta: "கடுக்காய்",
          tr: "kadukkai",
          gloss: "Myrobalan",
          d: "Terminalia chebula — the tannin that hardens it",
        },
        {
          ta: "முட்டை",
          tr: "muttai",
          gloss: "Egg",
          d: "beaten in, for a mortar that sets like stone",
        },
      ],
      recipeNote:
        "The recipe as the parish itself gives it. The English parish history says toddy — fermented sap — where the Tamil sources say padaneer; on lime, kadukkai and egg, every source agrees.",
      craftCaption:
        "The vault above the sanctuary — arches turned without iron, beam or centring",

      creedLabel: "The Meaning",
      creedTitle: "The Church as a Creed",
      creedBody:
        "The parish reads its own building as a set of numbers. Nothing here is merely structural: every count is a doctrine. Read the plan itself as a creed — tap a line and it lights on the drawing — then read the rest in the parish's own hand, the numbers that wait up at the altar.",
      creedReadTitle: "The plan, read as a creed",
      creedReadHint: "Tap a reading to light it on the plan.",
      creedReadings: [
        {
          n: "5",
          anchor: "doors",
          means: "the five wounds",
          what: "the five doors of the plan",
        },
        {
          n: "12",
          anchor: "piers",
          means: "the twelve apostles",
          what: "the twelve piers down the two naves",
        },
        {
          n: "3",
          anchor: "arrows",
          means: "the three nails",
          what: "the three directions in — each turned toward the cross",
        },
        {
          n: "1",
          anchor: "altar",
          means: "one Lord",
          what: "the single altar every nave meets at",
        },
      ],
      creedAltarTitle: "And what waits at the altar",
      creedAltarHint: "Tap a reading to light it on the altarpiece.",
      altarpieceTitle: "A symbolic elevation of the altarpiece",
      altarpieceNote: "A symbolic reading — not a measured drawing",
      creed: [
        {
          n: "14",
          anchor: "steps",
          what: "the steps up to the cross",
          means: "the fourteen Stations",
        },
        {
          n: "5",
          anchor: "upperArches",
          what: "the arches in the upper row of the altarpiece",
          means: "the five wounds, told again",
        },
        {
          n: "9",
          anchor: "flowers",
          what: "the flower-cluster carvings",
          means: "the nine choirs of angels",
        },
        {
          n: "4",
          anchor: "lowerArches",
          what: "the arches in the lower row",
          means: "Matthew, Mark, Luke and John",
        },
        {
          n: "3",
          anchor: "trinity",
          what: "at the centre of it all",
          means: "Father, Son and Holy Spirit",
        },
      ],
      creedNoteCaption:
        "The parish’s own note — திருக்குடும்ப ஆலயம்: கட்டிடத்தின் தத்துவம், “the philosophy of the building”",
      creedFootnote:
        "The sheet is unsigned and undated. It records how the parish reads its church — not what the builders of 1855 are documented to have intended.",

      towersLabel: "The Skyline",
      towersTitle: "Why They Call It Little Rome",
      towersBody:
        "Two white towers stand ninety-two feet above the façade, octagonal from the ground to the spire, with sixteen smaller pinnacles ringing the roofline. In each tower hangs one of the twin bells cast in France in 1861 and carried here by sea. It is chiefly for these towers that, in 1926, the first Bishop of Tuticorin gave the village the name it still answers to — Chinna Romapuri, Little Rome.",
      towerStats: [
        { v: "92 ft", k: "twin octagonal towers" },
        { v: "16", k: "pinnacle turrets" },
        { v: "1861", k: "French bells, one to a tower" },
      ],
      towersCaption: "The twin towers and the pinnacled roofline",

      bellsLabel: "The Bells",
      bellsTitle: "The Twin Bells from France",
      bellsBody:
        "High in each of the two towers hangs a bronze bell, cast in France in 1861 and carried to Vadakkankulam by sea. They have called the parish to prayer for more than a century and a half.",
      bellsBeats: [
        {
          year: "1861",
          title: "Cast in France",
          body: "The bells are given to the church by Casimir Grégoire, a French benefactor — by every account a kinsman of the parish priest, Fr Joseph Grégoire — and the bell in the tower still carries his name in its bronze: “Donateur Casimir Grégoire”.",
        },
        {
          year: "By sea",
          title: "The long carriage",
          body: "Packed in wooden crates, the bells come by ship, land at the port of Madras, and pass through the Collector's office at Tirunelveli on their way south to the church.",
        },
        {
          year: "1872",
          title: "Raised into the towers",
          body: "They are hung the year the church is consecrated — one bell to each of the twin towers — and are rung still, at prayers and at every festival.",
        },
      ],
      bellsOlderLead: "These were not the first bells to sound here.",
      bellsOlder:
        "An older bell hung in the stone church of 1752 — the bell that was rung one October morning in 1803 to call the whole village to come and see the Mother whose statue had begun to weep.",
      bellsFootnote:
        "The bells' story is the parish's own record. Published accounts have named the Burdin foundry of Lyon; the bell itself is cast “Vve Grégoire de Valence (Drôme)” — and where the record and the bronze differ, the bronze has the last word.",
      bellsCaption:
        "The bell in its tower, cast “Vve Grégoire de Valence (Drôme) — Donateur Casimir Grégoire”",

      lightLabel: "Light & Colour",
      lightTitle: "Glass, Dye and Gold",
      lightBody:
        "Twenty-three traceries carry coloured glass — plain at first, replaced with jewelled panes at the centenary of 1972. Sixteen windows along the side walls were kept sealed shut through the whole Jesuit administration, “for reasons of cold,” and were opened only afterwards. Within, the vaults, arches and pillars are painted in flowers and scenery made not from paint or chemical but from the dyes of plants and trees — unfaded, and never once repainted.",
      glassCaptions: [
        "A rose window of jewelled glass set in painted vaulting",
        "Lancet traceries, coloured at the 1972 centenary",
        "Diamond panes and trefoil rosettes",
        "Light falling through the nave toward the eastern doors",
      ],

      imagesLabel: "What It Carries",
      imagesTitle: "The Two Images the Building Holds",
      imagesBody:
        "Two images say what the church is for: one over the door you come in by, one above the altar you come to.",
      figures: [
        {
          title: "Over the door",
          body: "Above the head-door, inside the porch, is a polychrome relief of the Holy Family beneath a dove in a golden gloria and, at the apex, an eye set in a triangle. It is the old Counter-Reformation figure of the Two Trinities — the heavenly and the earthly — crossing at the Child. The figures are original; the gilding and the blue sky behind them are not. That ground was repainted between 2016 and 2022.",
          caption: "The Two Trinities relief over the central door",
        },
        {
          title: "Above the altar",
          body: "Six statues stand at the high altar beneath its dome, its glass tower and its minaret: the crucified Christ at the centre, Our Lady and St Joseph beside him, and above them St Sebastian, St Antony and St Francis Xavier. The floor is mosaic. The woodwork carries gold leaf — பொன் முலாம் — which the parish has never let fade.",
          caption: "The high altar, gilded and unfaded",
        },
      ],
      inscription: "மரியே வாழ்க",
      inscriptionGloss:
        "“Hail Mary” — raised in Tamil letters across the gable of the porch. The first words the building says to anyone walking up to it.",

      colophonLabel: "Colophon",
      colophonTitle: "Builders, Bells & Sources",
      builders: [
        { role: "Directing pastor", name: "Fr Joseph Grégoire, S.J." },
        { role: "Architect & engineer", name: "Br Joseph Bergenthal, S.J." },
        { role: "Consecrated by", name: "Bishop Alexis Canoz, S.J., 1872" },
        { role: "Bells", name: "Fonderie Vve Grégoire, Valence (Drôme), 1861" },
        { role: "Bells given by", name: "Casimir Grégoire" },
      ],
      sourcesNote:
        "Architectural detail from the parish history of the Holy Family Church; A. Sivasubramanian, Kiristhavamum Sathiyum (2001); Auguste Jean, Le Maduré (1894); H. R. Pate, Madras District Gazetteer: Tinnevelly (1917); and a handwritten note kept at the parish.",
      sourcesCta: "The sources behind this page",
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
      label: "Visit · Write · Pray",
      title: "Come to the Shrine",
      intro:
        "The doors of the Holy Family Shrine have stood open since 1685. Whether you are planning a pilgrimage or need to reach the parish office, begin here.",
      address:
        "Holy Family Shrine, East Street, Vadakkankulam, Radhapuram Taluk, Tirunelveli District, Tamil Nadu 627116, India",
      directions: "Get Directions",

      // Live status. Asserts only what we can verify: Mass times and the
      // adoration chapel's hours. It never claims the office is staffed.
      status: {
        // Shown before the clock is read — and to anyone without JavaScript.
        // It must therefore be true at every hour of the day.
        staticSummary: "Mass daily",
        staticHours: "Chapel open 9:00 AM – 8:00 PM",
        mass: "Mass in progress",
        open: "The shrine is open",
        closed: "The shrine is quiet",
        nextMass: "Next Mass",
        inTime: "in",
        atFirstLight: "Doors open at first light",
        // Duration units. English abuts them ("2h 10m"); see formatTime.ts.
        hourUnit: "h",
        minuteUnit: "m",
        unitSep: "",
      },

      actions: {
        call: "Call the parish",
        callShort: "Call",
        whatsapp: "WhatsApp",
        directions: "Directions",
        copy: "Copy",
        copied: "Copied",
      },

      // The lapidary dedication tablet.
      tablet: {
        dedication: "Dedicated to the Holy Family",
        patroness: "Our Lady of the Assumption",
        founded: "Founded 1685 by St John de Britto",
        shrineSince: "A shrine since 1993",
        littleRome: "Called Little Rome since 1926",
        prayerLine: "Mother of Vadakkankulam, pray for us.",
      },

      purpose: {
        kicker: "Reach us",
        heading: "Why have you come?",
        hint: "Choose one, and we will take you to the right place.",
        visit: "Plan a visit",
        visitNote: "Timings, travel and what to expect",
        massIntention: "Offer a Mass",
        massIntentionNote: "For the living or the departed",
        sacrament: "A sacrament",
        sacramentNote: "Baptism, marriage, anointing",
        certificate: "A certificate",
        certificateNote: "From the parish register",
        sickCall: "A sick call",
        sickCallNote: "Urgent — this will call the parish",
        offering: "Make an offering",
        offeringNote: "For the feast or the shrine",
        other: "Something else",
        otherNote: "Write to the parish office",

        // The visitor answers the heading in a sentence, and the chosen purpose
        // is the clause that completes it. English puts the verb before that
        // clause ("I have come | to offer a Mass"); Tamil puts it after
        // ("நான் | திருப்பலி ஒப்புக்கொடுக்க | வந்துள்ளேன்") — hence a lead AND
        // a tail, either of which may be empty in a given language.
        sentenceLead: "I have come",
        sentenceTail: "",
        visitPhrase: "to visit the shrine",
        massIntentionPhrase: "to offer a Mass",
        sacramentPhrase: "to ask for a sacrament",
        certificatePhrase: "to ask for a certificate",
        sickCallPhrase: "to call a priest — now",
        offeringPhrase: "to make an offering",
        otherPhrase: "to say something else",
        ctaVisit: "Show me the way",
      },

      sickCall: {
        title: "Please call, do not write.",
        body:
          "A priest is reached fastest by telephone. If someone is gravely ill or dying, ring the parish office now and ask for the priest on call.",
        cta: "Call the parish now",
      },

      express: {
        heading: "Prefer to talk?",
        body: "Most people reach the parish fastest by telephone.",
      },

      form: {
        heading: "Write to the parish",
        name: "Your name",
        phone: "Phone number",
        phoneNote: "So the parish can reach you",
        email: "Email",
        optional: "optional",
        message: "Your message",

        intentionType: "The Mass is for",
        living: "The living",
        departed: "The faithful departed",
        intentionNames: "Name or names to be remembered",
        preferredDate: "Preferred date",
        anyDate: "Any date is fine",

        sacramentType: "Which sacrament",
        sacraments: {
          baptism: "Baptism",
          "first-communion": "First Holy Communion",
          confirmation: "Confirmation",
          marriage: "Marriage",
          anointing: "Anointing of the Sick",
          funeral: "Funeral",
        },

        recordType: "Which record",
        records: {
          baptism: "Baptism certificate",
          marriage: "Marriage certificate",
          confirmation: "Confirmation certificate",
        },
        recordName: "Name as written in the register",
        recordYear: "Approximate year",
        relationship: "Your relationship to that person",

        submit: "Send to the parish",
        submitting: "Sending…",

        successTitle: "Entered in the parish register.",
        successBody: "Your message has reached the office. We reply as soon as we can.",
        successUrgent: "If the matter is urgent, please call",

        errorSummary: "Please look again at the following:",
        errors: {
          required: "This is needed",
          email: "That does not look like an email address",
          phone: "That does not look like a phone number",
          tooShort: "A little more, please",
          tooLong: "That is too long",
          year: "Enter a year between 1685 and today",
        },

        // Shown when the parish has not yet connected an inbox. We never
        // pretend a message was delivered.
        unconfiguredTitle: "The online post is not running yet.",
        unconfiguredBody:
          "Your words are still here — nothing is lost. The surest way to reach the parish today is to telephone. You can copy your message first.",
        copyMessage: "Copy my message",

        failedTitle: "Your message did not go through.",
        failedBody:
          "Something went wrong on our side, not yours. Please copy your message and telephone the parish office.",

        botRejected: "We could not verify that you are human. Please try once more.",
      },

      directory: {
        heading: "Whom to call",
        intro: "One line reaches the parish. Everything else goes through it.",
        office: "Parish Office",
        officeNote: "The parish's only published telephone line",
        priest: "Parish Priest",
        priestNote: "Reached through the parish office",
        chapel: "Adoration Chapel",
        chapelNote: "Open daily, 9:00 AM – 8:00 PM",
        houses: "Religious Houses in the village",
        housesNote:
          "These are the convents and the ashram — not the parish office. Please do not call them for parish matters.",
        diocese: "Diocese of Thoothukudi",
        dioceseNote: "For official correspondence",
        dioceseCta: "Diocesan contact page",
      },

      map: {
        heading: "Where we are",
        intro:
          "The shrine stands on East Street, at the heart of the village. Its twin white towers are visible from the highway.",
        iframeTitle: "Map showing the Holy Family Shrine, Vadakkankulam",
        directionsGoogle: "Directions",
        openApple: "Apple Maps",
        copyCoords: "Copy coordinates",
        coordsCopied: "Coordinates copied",
      },

      travel: {
        heading: "Getting here",
        intro:
          "Vadakkankulam lies off NH-44 between Nagercoil and Tirunelveli, about an hour from the southern tip of India.",
        rail: "By rail",
        road: "By road",
        air: "By air",
        railNote:
          "All four halts sit on the Nagercoil–Tirunelveli line. Autos and share-taxis wait outside each.",
        roadNote:
          "State and private buses stop at Vadakkankulam. Ask for the bus to Valliyur, Panagudi or Nagercoil.",
        airNote: "Thiruvananthapuram is the nearest international gateway.",
        km: "km",
        mins: "min",
        away: "away",
        directionsFrom: "Directions from here",

        locate: "How far am I?",
        locating: "Finding you…",
        youAre: "You are about",
        straightLine: "as the crow flies",
        locateDenied: "No matter — the address is above.",
      },

      visit: {
        heading: "When to come",
        massHeading: "Mass",
        weekday: "Monday – Saturday",
        sunday: "Sunday",
        chapel: "Adoration Chapel",
        chapelHours: "Daily, 9:00 AM – 8:00 PM",
        devotions: "Evening devotions",
        devotionsHours: "Rosary 6:30 PM · Benediction 7:00 PM",
        fullTimings: "See all Mass timings and feasts",
        workingChurch:
          "This is a working parish, not a museum. Please come quietly if a Mass or a funeral is in progress.",

        feastTitle: "During the feast, 6 – 15 August",
        feastBody:
          "The ten-day feast opens with the hoisting of the flag on 6 August and closes with the Assumption on 15 August, when the chariot procession draws crowds of around a hundred thousand. Expect closed roads, no parking near the church, and a village that does not sleep. Come early, and come on foot.",

        questions: [
          {
            q: "What are the Mass timings at Vadakkankulam shrine?",
            a: "Mass is celebrated Monday to Saturday at 5:00 AM and 6:10 AM, and on Sunday at 5:00 AM, 7:00 AM and 9:30 AM. The Eucharistic adoration chapel is open daily from 9:00 AM to 8:00 PM.",
          },
          {
            q: "How do I reach the Holy Family Shrine, Vadakkankulam?",
            a: "The shrine is on East Street, Vadakkankulam, Tirunelveli district, Tamil Nadu 627116, just off NH-44. The nearest railway station is North Panakudi, about 15 km away; Nagercoil Junction is 26 km and Tirunelveli Junction 66 km. The nearest airport is Thiruvananthapuram, about 95 km away.",
          },
          {
            q: "Can I visit the shrine at any time?",
            a: "The shrine is a working parish church. The adoration chapel is open daily from 9:00 AM to 8:00 PM, and the church is open around Mass times. During the annual feast, from 6 to 15 August, the village is crowded and roads near the church are closed to vehicles.",
          },
        ],
      },

      notes: {
        heading: "Before you come",
        dress: "Dress",
        dressBody: "Modest dress, as in any Indian church. Shoulders and knees covered.",
        photography: "Photographs",
        photographyBody:
          "Welcome outside and at the back of the church. Please do not photograph during Mass or a funeral.",
        access: "Access",
        accessBody:
          "The church is at ground level. For help with wheelchair access or with an elderly pilgrim, telephone the parish office before you travel and they will make arrangements.",

        offeringTitle: "Offerings",
        offeringBody:
          "Offerings for Masses, for the feast and for the upkeep of the shrine are received in person at the sacristy. Please ask for a receipt.",
        offeringUpi: "Or offer by UPI",
        colophon: "In faith, in stillness, in light.",
      },
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
      home: `முகப்பு`,
      history: `வரலாறு`,
      mass: `திருப்பலி & திருவிழாக்கள்`,
      festivals: `திருவிழாக்கள்`,
      gallery: `புகைப்படங்கள்`,
      architecture: `கட்டிடக்கலை`,
      contact: `தொடர்பு`,
      faq: `வினா & விடை`,
      sources: `ஆதாரங்கள்`,
    },
    hero: {
      visit: `உங்கள் வருகையைத் திட்டமிடுங்கள்`,
      explore: `எங்கள் வரலாற்றை அறியுங்கள்`,
    },
    home: {
      patronessLabel: `எங்கள் பாதுகாவலி`,
      patronessTitle: `பரலோக மாதா`,
      patronessSubtitle: `விண்ணேற்பு மாதா`,
      patronessP1: `நூற்றாண்டுகளாக, திருநெல்வேலி மாவட்டத்தில் அமைந்துள்ள வடக்கன்குளம் என்னும் சிற்றூர், தென்னிந்தியாவின் மிகவும் நேசிக்கப்படும் மாதா திருத்தலங்களுள் ஒன்றைத் தன்னகத்தே கொண்டு விளங்குகிறது. விண்ணேற்பு மாதா — பக்தர்களால் அன்போடு வடக்கன்குளத்து அன்னை என்று அழைக்கப்படுபவர் — தலைமுறை தலைமுறையாக விசுவாசிகளைக் காத்தருளி வருகிறார்; தமிழகத்தின் ஒவ்வொரு மூலையிலிருந்தும், அதற்கும் அப்பாலிருந்தும் யாத்திரிகர்களை இத்திருத்தலத்திற்கு ஈர்த்து வருகிறார்.`,
      patronessP2: `அரச செம்மையும் பொன்னும் நிறைந்த ஆடை அணிந்து, விண்மீன் கிரீடம் சூடிய அன்னையின் திருவுருவம் — தங்கள் மகிழ்ச்சிகளையும், துயரங்களையும், மௌனச் செபங்களையும் அவரது திருமுன் வைத்த எண்ணற்ற குடும்பங்களின் அன்பையும் பக்தியையும் தன்னுள் தாங்கி நிற்கிறது. ஆண்டுதோறும் ஆகஸ்ட் மாதத்தில் நடைபெறும் அன்னையின் திருவிழாவின்போது, ஊரே ஒளியும் பாடலும் நிறைந்த கடலாக மாறுகிறது; உளமார்ந்த வேண்டுதலை ஒருபோதும் மறுத்திராத அன்னையை வணங்க ஆயிரக்கணக்கானோர் ஒன்றுகூடுகின்றனர்.`,
      patronessQuote: `இறைவனின் தூய அன்னையே, எங்களுக்காக வேண்டிக்கொள்ளும்.`,
      aboutLabel: `எங்கள் பாரம்பரியம்`,
      aboutTitle: `விசுவாசமும் பக்தியும் நிறைந்த ஒரு மரபு`,
      aboutSubtitle: `மூன்று நூற்றாண்டுகளாகத் தொடரும் மாறாத அருள்`,
      aboutP1: `வடக்கன்குளத்தின் இதயப் பகுதியில் அமைந்துள்ள வடக்கன்குளம் மாதா ஆலயம், ஆன்மிகத்திற்கும் சமூக வாழ்விற்கும் ஒளிவிளக்காகத் திகழ்கிறது. இயேசு சபை மறைப்பணியாளர் புனித அருளானந்தரால் 1685-ல் நிறுவப்பட்ட இந்தத் திருத்தலம், 300 ஆண்டுகளுக்கும் மேலாக விசுவாசிகளுக்கு இல்லமாகவும், சோர்வுற்றோருக்குப் புகலிடமாகவும், அசையா பக்திக்குச் சான்றாகவும் விளங்கி வருகிறது.`,
      aboutP2: `திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்ட இவ்வாலயம், வடவை மாதா என்று அன்போடு அழைக்கப்படுகிறது. இந்தப் புனிதப் பூமியின் ஒவ்வொரு மூலையிலும் செபங்களும் பாடல்களும், அன்பாலும் விசுவாசத்தாலும் பிணைக்கப்பட்ட ஒரு சமூகத்தின் கதகதப்பும் எதிரொலிக்கின்றன — தூத்துக்குடி மறைமாவட்டத்தின் முதல் ஆயர் இதனைச் “சின்ன ரோமாபுரி” என்று அழைக்கும் அளவுக்கு ஆழமான மரபு இது.`,
      aboutQuote: `விசுவாசிகளுக்கு ஓர் இல்லம், சோர்வுற்றோருக்கு ஒரு புகலிடம், ஒவ்வோர் உள்ளத்திற்கும் ஓர் அடைக்கலம்.`,
      verseLabel: `அமைதியின் வார்த்தை`,
      verse: `பெருஞ்சுமை சுமந்து சோர்ந்திருப்பவர்களே, எல்லாரும் என்னிடம் வாருங்கள், நான் உங்களுக்கு இளைப்பாறுதல் தருவேன்.`,
      verseRef: `மத்தேயு 11:28`,
      welcomeLabel: `வருக`,
      welcomeTitle: `அமைதியின் புகலிடம்`,
      welcomeBody: `வடக்கன்குளம் மாதா ஆலயம், தலைமுறை தலைமுறையாகப் பக்தர்களுக்கு அமைதியான அடைக்கலமாக நின்று வருகிறது — சற்று இளைப்பாறவும், செபிக்கவும், உள்ளத்தில் அமைதி காணவும் ஓர் இடம். விசுவாசத்தோடு வந்தாலும், தேடலோடு வந்தாலும், துயரத்தோடு வந்தாலும் — இங்கே நீங்கள் அன்போடு வரவேற்கப்படுகிறீர்கள்.`,
      showcaseLabel: `புனிதமான தருணங்கள்`,
      showcaseTitle: `ஒளியும் பக்தியும் சந்திக்கும் இடம்`,
      showcaseBody: `ஏற்றப்படும் ஒவ்வொரு மெழுகுதிரியும், அமைதியாகச் சொல்லப்படும் ஒவ்வொரு செபமும், காலைப் பொழுதின் ஒவ்வொரு ஒளிக்கீற்றும் — இவை அனைத்தும் சேர்ந்தே எங்கள் பங்கு வாழ்வின் தாளலயத்தை உருவாக்குகின்றன.`,
      festivalsLabel: `புனித நாட்காட்டி`,
      festivalsTitle: `திருவிழாக்களும் திருநாட்களும்`,
      festivalsBody: `அன்னையின் ஆண்டுத் திருவிழா தொடங்கி கிறிஸ்து பிறப்பு விழாவின் இரவுத் திருப்பலி வரை, ஆண்டு முழுவதும் எங்கள் சமூகம் மகிழ்ச்சியோடும், பாடலோடும், ஒன்றித்த விசுவாசத்தோடும் ஒன்றுகூடுகிறது.`,
      festivalsCta: `திருவிழாக்களைப் பார்க்க`,
      massLabel: `தினசரி வழிபாடு`,
      massTitle: `திருப்பலியும் வழிபாடுகளும்`,
      massCta: `முழு அட்டவணை`,
      galleryLabel: `காட்சிகள்`,
      galleryTitle: `காட்சிப் பயணம்`,
      galleryCta: `படத்தொகுப்பைத் திறக்க`,
      visitLabel: `வருகை தாருங்கள்`,
      visitTitle: `எப்போதும் வரவேற்கப்படுகிறீர்கள்`,
      visitBody: `எப்போது வேண்டுமானாலும் உள்ளே வாருங்கள். எங்கள் கதவுகள், எங்கள் இதயங்களைப் போலவே, திறந்தே இருக்கின்றன.`,
      visitCta: `வழி அறிய`,
    },
    history: {
      label: `எங்கள் பாரம்பரியம்`,
      title: `தலைமுறைகளால் சுமக்கப்பட்ட கதை`,
      intro: `மூன்று நூற்றாண்டுகளுக்கும் மேலாக — 1685-ல் புனித அருளானந்தர் ஓலைக் கூரை வேய்ந்த முதல் சிற்றாலயத்தை இங்கே எழுப்பியது முதல் — வடக்கன்குளத்து அன்னை எண்ணற்ற குடும்பங்களின் விசுவாசத்திற்கும், திருவிழாக்களுக்கும், தம் திருமுன் சமர்ப்பிக்கப்பட்ட அமைதியான செபங்களுக்கும் மௌனச் சாட்சியாய் நின்று வருகிறார்.`,
      contentsLabel: `உள்ளடக்கம்`,
      contentsHint: `கீழே உள்ள ஒரு அத்தியாயத்தைத் தேர்ந்தெடுத்தால், நேரடியாக அங்கு செல்லலாம் — முந்தையவற்றைக் கடந்து செல்ல வேண்டிய அவசியமில்லை.`,
      chapterWord: `அத்தியாயம்`,
      biblioLink: `முழு நூற்பட்டியல்`,
      noteLabel: `குறிப்பு`,
      navPrev: `முந்தையது`,
      navNext: `அடுத்தது`,
      navPrevChapter: `முந்தைய அத்தியாயம்`,
      navNextChapter: `அடுத்த அத்தியாயம்`,
      navTapAgain: `செல்ல மீண்டும் தட்டவும்`,
      eras: [
        {
          id: `clearing-in-the-forest`,
          span: `1542–1693`,
          heading: `காட்டுக்குள் ஒரு வெளி`,
          blurb: `புனித சவேரியாரின் கடற்கரைப் பணியிலிருந்தும், புனித அருளானந்தரின் துணிவுமிக்க உள்நாட்டுப் பயணங்களிலிருந்தும், தென்னகக் காட்டில் ஒரு பக்திமிக்க பெண்மணி எழுப்பிய சாலையோரக் குருசடியைச் சுற்றி ஒரு கிறிஸ்தவக் குடியிருப்பு வேரூன்றியது.`,
          dots: [
            {
              year: `1542–1544`,
              title: `முத்துக்குளிக்கும் கடற்கரையில் புனித சவேரியார்`,
              body: `புனித சவேரியார் 1542-ஆம் ஆண்டின் இறுதியில் பரவர்களின் முத்துக்குளிக்கும் கடற்கரையை வந்தடைந்தபோது, அக்கடற்கரை ஏற்கெனவே திருமுழுக்குப் பெற்றிருந்தது: அதற்குப் பத்தாண்டுகளுக்கு முன்பே, அருட்தந்தை மிக்கேல் வாஸ் அவர்களும் அவருடன் இருந்த குருக்களும் முப்பது கிராமங்களைச் சேர்ந்த இருபதாயிரம் ஆன்மாக்களுக்குத் திருமுழுக்கு அளித்துத் திருச்சபையில் சேர்த்ததாகச் சொல்லப்படுகிறது. அவர்களுக்குக் கற்பிக்கவே சவேரியார் வந்தார்; விசுவாசப் பிரமாணத்தையும் செபங்களையும் தமிழில் தந்து, கையில் மணியுடன் கிராமம் கிராமமாகச் சென்று, முப்பது கிராமங்களையும் சந்தித்து முடித்தார். கால்டுவெல் குறிப்பிடுவது போல், உள்நாட்டுக் கிராமம் எதுவும் அந்தக் கடற்கரை இயக்கத்தில் இணைந்ததாகத் தெரியவில்லை.`,
            },
            {
              year: `1606`,
              title: `உள்நாட்டை நோக்கித் திரும்பிய பணிக்களம்`,
              body: `அக்காலத்தில் கிறிஸ்தவம் “இந்தியாவின் மதில்களுக்கு வெளியேயே முகாமிட்டிருந்தது” — கடற்கரையோடு நின்றுவிட்டது. 1606-ஆம் ஆண்டு நவம்பர் 10-ஆம் நாள் தூத்துக்குடியிலிருந்து மதுரையை நோக்கி ஒரு சிறு குழு புறப்பட்டது; அவர்களுள் ரோமையைச் சேர்ந்த இயேசு சபை அருட்தந்தை ரொபேர்ட்டோ தெ நொபிலியும் ஒருவர். ஐரோப்பிய உடையைத் துறந்து, “அனைத்தையும் துறந்தவன்” எனப் பொருள்படும் சந்நியாசியின் வாழ்வை ஏற்ற பின்னரே அவரால் முன்னேற முடிந்தது. அந்த உள்நாட்டு மதுரைப் பணிக்களத்தின் பொறுப்பையே 1683-ஆம் ஆண்டு புனித அருளானந்தர் ஏற்றார்; அங்கிருந்தே அவர் தெற்கே வந்தார்.`,
            },
            {
              year: `c.1680`,
              title: `சாந்தாயி அம்மையார் காட்டு வெளியில் குடியேறுகிறார்`,
              body: `சுமார் 1680-ஆம் ஆண்டில், சாந்தாயி (சந்தை) அம்மையார் என்னும் பக்திமிக்க கிறிஸ்தவப் பெண்மணி தம் குடும்பத்துடன் தோப்புவிளையிலிருந்து வந்து, அப்போது புதர்களும் மரங்களும் குழிகளும் நிறைந்த காடாக மட்டுமே இருந்த இவ்விடத்தில் குடியேறினார். தம் கத்தோலிக்க விசுவாசத்தில் உறுதியாய் நின்ற அவர், தம் வீட்டு வாசலுக்கு எதிரே ஒரு சிறிய குருசடியை — சாலையோரச் சிலுவையை — எழுப்பினார் என்று இப்பங்கின் சொந்த வரலாறு பதிவு செய்கிறது; அவரது விசுவாசத்தைச் சுற்றி ஒரு கிறிஸ்தவக் குடியிருப்பு திரளத் தொடங்கியது.`,
            },
            {
              year: `c.1680`,
              title: `இரு அரசுகளுக்கு இடையேயான பாதையில் ஒரு குருசடி`,
              body: `“வடக்கேயுள்ள குளம்” எனப் பொருள்படும் வடக்கன்குளம், திருவிதாங்கூருக்கும் பாண்டிய நாட்டுக்கும் இடையேயான காட்டுப் பாதையில் அமைந்திருந்தது; வழிப்போக்கர்களுக்கும் விசுவாசத்தை நாடி வருவோருக்கும் அது இயல்பான தங்குமிடமாய் இருந்தது. வயல்களில் பருத்தி பறித்துக்கொண்டிருந்தபோது, குதிரையில் வந்த ஓர் அருட்தந்தையைச் சாந்தாயி சந்தித்து, தம் வீட்டையும் தம் குருசடியையும் ஆசீர்வதிக்குமாறு வேண்டிக்கொண்டார்; பங்கு மரபின்படி அவர் புனித அருளானந்தரே.`,
            },
            {
              year: `1685`,
              title: `ஒரு கிறிஸ்தவச் சமூகமும், முதல் சிற்றாலயமும்`,
              body: `1685-ஆம் ஆண்டளவில் இந்தக் காட்டு வெளியில் ஒரு கிறிஸ்தவச் சமூகம் இருந்தது. தமிழர்களால் அருளானந்தர் என அறியப்பட்ட புனித ஜான் தெ பிரிட்டோ “தெற்கே வடக்கன்குளம் வரை ஊடுருவிச் சென்றார்” என்றும், “1685-ஆம் ஆண்டளவில் ஒரு கிறிஸ்தவச் சமூகம் உறுதியாக உருவாகியிருந்ததாகத் தெரிகிறது” என்றும் காலனிய அரசிதழ் பதிவு செய்கிறது. சிற்றாலயமோ பங்கின் சொந்த நினைவே: அருளானந்தர் இங்கே ஒரு சிறிய சிற்றாலயத்தை எழுப்பி, அதைத் திருக்குடும்பத்திற்கு அர்ப்பணித்தார் என்று பங்கின் சொந்த வரலாறு பதிவு செய்கிறது; அன்று முதல் இப்பங்கு அப்பெயரையே தாங்கி வருகிறது.`,
            },
            {
              year: `1685–86`,
              title: `சுமார் இருநூறு பேருக்குத் திருமுழுக்கு`,
              body: `சிற்றாலயம் எழுப்பப்பட்ட அதே வேளையில் சுமார் இருநூறு பேர் திருமுழுக்குப் பெற்றனர் என்று பங்கின் சொந்த வரலாறு பதிவு செய்கிறது — இதுவே வடக்கன்குளத்தின் முதல் மாபெரும் அறுவடை. பங்கு இதனை 1685-ஆம் ஆண்டாகக் குறிக்கிறது; ஆயர் அ. ஸ்டீபன் அவர்களின் 2022-ஆம் ஆண்டு யூபிலி செய்தியோ, அருளானந்தர் வந்ததையும், திருமுழுக்குகளையும், ஆலயம் எழுப்பப்பட்டதையும் ஒன்றாக 1686-ஆம் ஆண்டில் வைக்கிறது. பங்குக்கு வெளியிலிருந்து எழுதிய காலனிய அரசிதழ் எண்ணிக்கை எதையும் தரவில்லை; “1685-ஆம் ஆண்டளவில் ஒரு கிறிஸ்தவச் சமூகம் உறுதியாக உருவாகியிருந்ததாகத் தெரிகிறது” என்று மட்டுமே கூறி, அருளானந்தர் கும்பகோணத்திற்குத் திரும்ப அழைக்கப்பட்டார் என்றும், அவர் மீண்டும் இங்கு வரவில்லை என்றும் குறிக்கிறது.`,
            },
            {
              year: `1693`,
              title: `ஓரியூரில் புனித அருளானந்தரின் இரத்தசாட்சியம்`,
              body: `தமது மரணத்தின் முன்தினம், புனித அருளானந்தர் சிறையிலிருந்து, தமது பொதுத் தலைவர் வழியாகத் தம் சபைச் சகோதரர்களுக்கு எழுதினார். எழுதுகோலாக ஒரு வைக்கோல்; மையாக, எச்சிலில் குழைத்த கரிப்பொடி. “இயேசு கிறிஸ்துவின் திருச்சட்டத்தைக் கற்பித்தேன் என்பது ஒன்றே எனக்கு எதிராகச் சுமத்தப்பட்ட குற்றம்… இக்குற்றமே ஒரு புண்ணியமாதலால், இதற்குரிய தண்டனை எனக்கு மாண்பாகவே அமையும்.” “உமது தகுதியற்ற ஊழியன்… ஓரியூர் சிறையிலிருந்து, 1693 பிப்ரவரி 3” என்று அவர் கையொப்பமிட்டார். மறுநாள், 1693-ஆம் ஆண்டு பிப்ரவரி 4-ஆம் நாள், நாற்பத்தைந்து வயதில், மறவ நாட்டிலுள்ள ஓரியூரில் விசுவாசத்திற்காகத் தலை துண்டிக்கப்பட்டார். இரண்டரை நூற்றாண்டுகளுக்குப் பின் திருஅவை அவரைப் புனிதராக அறிவித்தது. வடக்கன்குளத்தில் அவர் என்றும் அருளானந்தரே; சாந்தாயியின் வீட்டு வாசலில் சிலுவையை ஆசீர்வதித்தவர், ஒவ்வொரு பிப்ரவரியிலும் ஊர் விழாக்கொண்டாடும் புனிதர்.`,
            },
          ],
        },
        {
          id: `first-inland-parish`,
          span: `1698–1740`,
          heading: `முதல் உள்நாட்டுப் பங்கு`,
          blurb: `தன்னிடம் இல்லாத செல்வத்திற்காகக் கொடுமைப்படுத்தப்பட்டு, மங்கம்மாள் அரசியின் வார்த்தையால் மீண்டும் அழைத்துவரப்பட்ட முதல் பங்குத் தந்தை; உரோமைக்கு அனுப்பப்பட்ட கடிதம் ஒன்றில் இப்பங்கின் பெயர்; இரண்டே பருவங்களில் எண்ணூறு பேர் திருமுழுக்கு — இவ்வாறு அந்தக் காட்டு வெளி ஒரு பங்காயிற்று.`,
          dots: [
            {
              year: `1698`,
              title: `முதல் பங்குத் தந்தையர்`,
              body: `பல ஆண்டுகள் அருள்பணியாளர் இவ்வழியே கடந்து மட்டுமே சென்றனர். பின், திருவாங்கூர், பாண்டிய நாடு ஆகிய இரு அரசுகளுக்கும் இடையே, இருபுறத்திற்கும் வசதியாக அமைந்திருந்த இவ்விடத்தில் ஒரு தனி இல்லம் அமைப்பது தகும் என்று பணிக்களம் கருதியது. சுமார் 1698-ஆம் ஆண்டில் இங்கு நிரந்தரமாகத் தங்கிப் பணியாற்ற அனுப்பப்பட்ட முதல் அருட்தந்தை பெர்னார்ட் டெ சா ஆவார். அவரிலிருந்து இப்பங்கின் அருட்தந்தையர் வரிசை தொடங்குகிறது; இன்று திருப்பலி நிறைவேற்றும் தந்தையர் வரை அது தடையின்றித் தொடர்கிறது.`,
            },
            {
              year: `1700`,
              title: `அருட்தந்தையும் அரசியும்`,
              body: `டெ சா இங்கு வந்து சில நாட்களே ஆகியிருந்தன, அப்போதே துன்புறுத்தல் வந்தது. அருட்தந்தை செல்வத்தை மறைத்து வைத்திருப்பதாக நம்பிய சிலர், அவருக்குக் காய்ச்சல் இருந்த ஒரு இரவில் வந்து, படுக்கையிலிருந்து இழுத்து, அடித்து, கயிற்றால் கட்டி, ஆளுநர் முன் கொண்டு சென்றனர்; அவர் சிறிது காலம் சிறையில் அடைத்து, பின் மாவட்டத்தைவிட்டு விரட்டினார். மாதங்கள் கழித்து அவரைக் கண்ட சக இயேசு சபை அருட்தந்தை பியேர் மார்ட்டின், தான் கண்டதை எழுதிவைத்தார்: “அடிபட்ட தழும்புகளையும், அவரது பற்கள் அனைத்தும் உடைக்கப்பட்டிருந்ததையும்” கண்டேன் என்றார். அவரை மீண்டும் கொண்டுவந்தது ஓர் அரச வார்த்தையே. அருட்தந்தை லெய்னெஸ் அவரது வழக்கை, மதுரையை அப்போது ஆண்ட மங்கம்மாள் அரசியிடம் எடுத்துச் சென்றார்; அவர் அவரை வடக்கன்குளம் திரும்ப அனுமதித்தார்.`,
            },
            {
              year: `1709`,
              title: `எழுத்தில் இப்பங்கு`,
              body: `1709-ஆம் ஆண்டளவில், இயேசு சபையினர் உரோமைக்கு அனுப்பிய கடிதங்களில் இப்பங்கின் பெயர் இடம்பெற்றது. அவ்வாண்டின் ஆண்டறிக்கைக் கடிதம், அருட்தந்தை மரிய சவேரி போர்கேசே “வடக்கன்குளம் மாவட்டத்தின் தலைமையில்” இருந்ததைக் காட்டுகிறது; அவரைப் பற்றி, “வியத்தகு வைராக்கியத்துடன் அவர் மனமாற்றப் பணியில் உழைக்கிறார்; உடலின் வலிமைக் குறைவை அவரது உள்ளத்தின் வேகம் ஈடுசெய்கிறது” எனக் கூறுகிறது. அது ஓர் அறிக்கையின் ஒரு வரி மட்டுமே; ஆலயத்தைப் பற்றியோ ஊரைப் பற்றியோ எதுவும் சொல்லவில்லை. ஆயினும், அவ்வாண்டு முதல் இப்பங்கு பணிக்களத்தின் எழுத்து வரலாற்றில் தொடர்ந்து இடம்பெறுகிறது.`,
            },
            {
              year: `1712–1713`,
              title: `ஆன்மாக்களின் வியத்தகு அறுவடை`,
              body: `சுமார் 1712–13-ஆம் ஆண்டுகளில், உள்நாட்டுப் பணிக்களம் செழித்தோங்கியபோது, வெறும் இரண்டே ஆண்டுகளில் வடக்கன்குளத்தில் வயது வந்தோர் ஏறக்குறைய எண்ணூறு பேருக்கும், அத்துடன் பல குழந்தைகளுக்கும் திருமுழுக்கு அளிக்கப்பட்டது. ஓலைக் கூரையின் கீழ் இருநூறு பேருடன் தொடங்கியது, இப்போது தென்னக எல்லைப்புறத்தின் மாபெரும் கிறிஸ்தவச் சமூகங்களுள் ஒன்றாக விளங்கியது.`,
            },
            {
              year: `1714`,
              title: `எல்லைப்புறத்தில் ஓர் இயேசு சபை இல்லம்`,
              body: `1714-ஆம் ஆண்டளவில், செழித்தோங்கிய அந்தக் கிறிஸ்தவச் சமூகம், இயேசு சபையின் மூத்த உள்நாட்டு நிலையங்களுள் ஒன்றாக அங்கீகரிக்கப்பட்டு, தனித்த இயேசு சபை இல்லமாக நிறுவப்பட்டது. இங்குள்ள கிறிஸ்தவச் சமூகத்தை நிறுவியவர் அருட்தந்தை பிராண்டோலினி என்று ஆயர் கால்டுவெல்லின் வரலாறு குறிப்பிடுகிறது; இது வடக்கன்குளத்தை இப்பகுதியின் முதல் மாபெரும் உள்நாட்டுப் பங்காக அடையாளப்படுத்துகிறது.`,
            },
          ],
        },
        {
          id: `statue-and-the-saint`,
          span: `1741–1775`,
          heading: `திருவுருவமும் புனிதரும்`,
          blurb: `அருட்தந்தை புத்தாரியின் பொற்காலம்: கடலிலிருந்து கரைக்குக் கொண்டுவரப்பட்ட அன்னையின் திருவுருவம், வருங்காலப் புனிதர் ஒருவரின் திருமுழுக்கு, சிலுவை வடிவில் எழுந்த முதல் நிலையான ஆலயம்.`,
          dots: [
            {
              year: `1742`,
              title: `கடலிலிருந்து திருவுருவம் வந்து சேர்கிறது`,
              body: `1742-ஆம் ஆண்டில், “வடக்கன்குளத்திற்கு, போர்த்துகலிலிருந்து” என எழுதப்பட்ட, அன்னையின் செதுக்கப்பட்ட திருவுருவங்களைக் கொண்ட ஒரு மரப்பெட்டி, கடல் நீரோட்டங்களால் அடித்துவரப்பட்டு கூட்டப்புளியில் கரையேறியது. மீனவர்கள் அதைப் பங்குத் தந்தை ஜான் பாப்டிஸ்ட் புத்தாரி அவர்களிடம் கொண்டுவந்தனர்; அவர் ஒரு திருவுருவத்தை வடக்கன்குளத்திற்கென வைத்துக்கொண்டு, இரண்டாவதைக் காமநாயக்கன்பட்டிக்கும், மூன்றாவதை ஆயரின் பராமரிப்பிற்கும் அளித்தார். இங்கே வைக்கப்பட்ட விண்ணேற்பு மாதாவின் திருவுருவமே, ஒரு நாள் கண்ணீர் சிந்தவிருந்த அதே திருவுருவம்.`,
            },
            {
              year: `1745`,
              title: `புனித தேவசகாயம் பிள்ளை இங்கே திருமுழுக்குப் பெறுகிறார்`,
              body: `திருவிதாங்கூர் அரசவையின் அதிகாரியாக, நற்குடிப் பிறந்தவராக, முப்பத்திரண்டு வயதுடையவராக விளங்கிய நீலகண்ட பிள்ளை, ஏற்கெனவே மதிப்புமிக்க ஒருவராகவே திருமுழுக்கை நோக்கி வந்தார். அரசனின் படைத் தளபதியாயிருந்த எஸ்தாஷ் து லனோய் என்பவரே முதலில் அவருக்குக் கிறிஸ்தவ விசுவாசத்தைப் பற்றிப் பேசி, வடக்கன்குளத்தின் பங்குத் தந்தை புத்தாரியிடம் அவரை அனுப்பிவைத்தார். இத்தகைய ஒரு மனந்திரும்பியவர் எத்தகைய துன்புறுத்தலை ஈர்ப்பார் என்பதை அறிந்திருந்த புத்தாரி அவசரப்படவில்லை. அவர் “அவர் அவாவுற்று விரும்பிய அருளை ஒத்திவைப்பது அவசியம் எனக் கருதி, நெடிது சோதித்தபின், மறுபிறப்பின் அருட்சாதனத்திற்கு அவரை ஏற்றுக்கொண்டார்.” மறைக்கல்வி ஒன்பது மாதங்கள் நீடித்தது. 1745-ஆம் ஆண்டு மே 14-ஆம் நாள், இவ்வூர் ஆலயத்தில், மறைக்கல்வியாளர் ஞானப்பிரகாசம் பிள்ளை ஞானத்தந்தையாக நிற்க, திருமுழுக்கு அளிக்கப்பட்டது; அந்த அதிகாரி லாசர் என்றும், தமிழில் தேவசகாயம் (“கடவுளே என் துணை”) என்றும் பெயர் பெற்றார்.`,
            },
            {
              year: `1749`,
              title: `ஓலையிலிருந்து செங்கலுக்கு`,
              body: `1749-ஆம் ஆண்டளவில், அருளானந்தரின் பழைய ஓலைச் சிற்றாலயம் பெருகிய சமூகத்தைத் தாங்க இயலாமல் போகவே, அதற்குப் பதிலாக அருட்தந்தை புத்தாரி செங்கல்லில் ஒரு நிலையான ஆலயத்தைத் தொடங்கினார். அவர் “அதன் அடிக்கல்லை இட்டார்,” அதனை அருட்தந்தை தோமசினி முழுமைக்குக் கொண்டுசென்றார். இப்பங்கின் சொந்தப் பதிவின்படி அது அகன்ற செங்கற்களால் எழுந்தது; அதன் அடிக்கல் ஆசீர்வதிக்கப்பட்ட நாளை இப்பங்கு தன் கங்கோல் விழாவாகக் கொண்டாடி, அதை 1749 என்று குறிக்கிறது.`,
            },
            {
              year: `c.1749`,
              title: `ஆலயத்திற்கான மரமும் ஒரு கைதும்`,
              body: `அருட்தந்தை புத்தாரியின் ஆலயம் எழுந்துகொண்டிருந்தபோது, கட்டுமானத்திற்குத் தேவையான மரம் குறைந்துபோனது. தம் குருவுக்கு உதவும் நோக்கில், நெடுங்காலம் தமக்கு நண்பராக இருந்த அரசவைப் பிரமுகர் ஒருவரிடம் தேவசகாயம் சென்று, அரச காடுகளில் மரம் வெட்ட அனுமதி கோரினார். ஆனால் அங்கே சமய விவாதமே மூண்டது; அவமானமடைந்த அவர், தேவசகாயத்தின் உயிருக்கு அச்சுறுத்தல் விடுத்துச் சென்றார். திரண்டுகொண்டிருந்த புயலை வெடிக்கச் செய்த நிகழ்வு இதுவே என 1894-ஆம் ஆண்டு இயேசு சபை வரலாறு கூறுகிறது: அவருடைய சூழ்ச்சிகளால் அரச கைது ஆணை பிறப்பிக்கப்பட்டது; தேவசகாயம் எதிர்ப்பின்றித் தம்மைக் கையளித்தார்.`,
            },
            {
              year: `1752`,
              title: `சிலுவை வடிவ ஆலயம்`,
              body: `1752-ஆம் ஆண்டில் அந்த ஆலயம் நிறைவுபெற்று நின்றது: சிலுவை வடிவில் கட்டப்பட்டு, உதயச் சூரியனை நோக்கிக் கிழக்கு முகமாக அமைந்தது. அருளானந்தரின் முந்தைய சிற்றாலயத்தைப் போலவே, அது “திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்டது.” இதன் மாபெரும் திருவிழா புனித சவேரியாருடையதே — ஆண்டுதோறும் டிசம்பரில் மாபெரும் நவநாளுடன் கொண்டாடப்பட்டது. இவ்வாண்டை, ஆலயச் சுவர்களுக்குள் ஒருகாலத்தில் இருந்த இரண்டு கல்வெட்டுகளால் இப்பங்கு உறுதிப்படுத்துகிறது.`,
            },
            {
              year: `1752`,
              title: `புனித தேவசகாயம் பிள்ளையின் இரத்தசாட்சியம்`,
              body: `எருமை மீது ஊர்வலமாக இழுத்துச் செல்லப்பட்டு, சாட்டையால் அடிக்கப்பட்டு, காட்டில் ஒரு மரத்தில் பல மாதங்கள் சங்கிலியால் பிணைக்கப்பட்டு, மூன்று ஆண்டுக் கொடுந்துன்பத்திற்குப் பின், 1752-ஆம் ஆண்டு ஜனவரி 14-ஆம் நாள், ஆரல்வாய்மொழிக் கணவாயை ஒட்டிய திருவிதாங்கூர் எல்லைக் காவல் வரிசையில் தேவசகாயம் சுட்டுக் கொல்லப்பட்டார்; இயேசு, மரியா என்னும் திருப்பெயர்களைத் தம் உதடுகளில் தாங்கியபடியே உயிர்நீத்தார். அவரது திருவுடல் கோட்டாற்றில் உள்ள புனித சவேரியார் ஆலயத்தில் சேர்க்கப்பட்டது; கொச்சி ஆயர் நன்றிப் பாடலாகிய "Te Deum" பாடச் செய்து, இரத்தசாட்சியின் புகழுரையையும் தாமே ஆற்றினார் என்று பெர்த்ராண்ட் பதிவு செய்கிறார். பழைய ஆவணங்கள் அம்மலைக்குப் பெயர் தரவில்லை; காட்டாடிமலை என்பது அங்கே இன்று நிற்கும் தேசியத் திருத்தலத்திலிருந்து அது பெற்ற பெயர். வடக்கன்குளத்தில் பாதுகாக்கப்படும் திருஎச்சங்களைப் பொறுத்தவரை, அவருடைய ஆடையின் ஒரு பகுதியையும் அவர் கட்டப்பட்டிருந்த சங்கிலிகளையும் இவ்வாலயம் வைத்திருந்ததாக 1894-ஆம் ஆண்டில் இயேசு சபை வரலாற்றாசிரியர் அகுஸ்த் ஜான் எழுதினார்; அவர் அணிந்திருந்த தலைப்பாகையும் இங்கே பாதுகாக்கப்படுவதாக மறைமாவட்டம் பதிவு செய்கிறது. ஞானப்பூ தெரேசா எனத் திருமுழுக்குப் பெற்ற அவருடைய மனைவி, பங்கின் கல்லறைத் தோட்டத்தில் அடக்கம் செய்யப்பட்டுள்ளார்.`,
            },
            {
              year: `1773–1775`,
              title: `இயேசு சபை ஒடுக்கப்படுகிறது; பழைய பணிக்களம் முடிகிறது`,
              body: `1773-ஆம் ஆண்டில், திருத்தந்தை பதினான்காம் கிளமெண்ட் உலகெங்கும் இயேசு சபையை ஒடுக்கினார். திருநெல்வேலியில் எஞ்சியிருந்த இயேசு சபைத் தந்தையர், இங்கும் தளையிலும் மணப்பாட்டிலும், “ஒவ்வொருவராக இறந்தனர்” என்று ஆயர் கால்டுவெல் பதிவு செய்கிறார்; அவர்களுடைய இடங்களைக் கோவாவிலிருந்து வந்த அருட்தந்தையர் நிரப்பினர். இங்கிருந்த பழைய இயேசு சபைத் தந்தையருள் கடைசியானவரான அருட்தந்தை கிளமெண்ட் தோமஸினி, தம் முடிவு நெருங்குவதை உணர்ந்து, தளையில் இருந்த அருட்தந்தை அந்தோணி துவார்த்தேயிடம் தம்மைத் தூக்கிச் செல்லச் செய்து, 1775-ஆம் ஆண்டில் தம் எழுபத்தைந்தாம் வயதில் அங்கே இறந்தார்.`,
            },
          ],
        },
        {
          id: `the-weeping-madonna`,
          span: `1775–1838`,
          heading: `கண்ணீர் சிந்திய அன்னை`,
          blurb: `தங்கிப் பணியாற்ற ஓர் இயேசு சபைத் தந்தை இல்லாமல் கழிந்த அறுபத்து மூன்று அமைதியான ஆண்டுகளிலும், இப்பங்கு தானாகவே விசுவாசத்தைக் காத்து வந்தது; 1803-ஆம் ஆண்டு அக்டோபர் மாத வெள்ளிக்கிழமை ஒன்றில், திரண்டிருந்த ஊர் மக்களின் முன்னிலையில், பீடத்திற்கு மேலே பரலோக மாதா கண்ணீர் சிந்தினார்.`,
          dots: [
            {
              year: `1775–1838`,
              title: `இயேசு சபை அருட்தந்தை இல்லாத அறுபத்து மூன்று ஆண்டுகள்`,
              body: `கடைசி இயேசு சபைத் தந்தையான அருட்தந்தை கிளமெண்ட் தோமஸினி 1775-ஆம் ஆண்டில் இறந்த பின், அறுபத்து மூன்று ஆண்டுகளுக்கு எந்த இயேசு சபை அருட்தந்தையும் வடக்கன்குளத்தில் பணியாற்றவில்லை. ஆயினும் இப்பங்கு தன்னந்தனியே விடப்படவில்லை. எஞ்சியிருந்த இயேசு சபைத் தந்தையர் “ஒவ்வொருவராக இறந்தனர்; அவர்களுடைய இடங்கள் கோவாவைச் சேர்ந்த சுதேச அருட்தந்தையரால் நிரப்பப்பட்டன” என ஆயர் கால்டுவெல் பதிவு செய்கிறார். கொச்சி ஆயரின் கீழ் இப்பங்கை மேய்த்த அருட்தந்தையர் தேவ வரதனார், இஞ்ஞாசியார், ஜான் லூயிஸ் கர்டோசா மற்றும் அவர்களுக்குப் பின் வந்தவர்கள் என்று இப்பங்கின் சொந்தப் பட்டியல் பெயரிட்டுக் குறிக்கிறது. ஆனால் இப்பங்கு வெறுமனே பிடித்து நின்றதல்ல. சுமார் 1780 முதல் இது “உள்நாட்டுப் பணிக்களத்தின் ஒரே மையமாக” ஆயிற்று; சேந்தமங்கலம், ஆண்டிபட்டி, காமநாயக்கன்பட்டி, மற்றும் இவ்வூர் ஆகிய நான்கு பிரிவு மையங்கள் இதன் கீழ் அமைந்தன; 1837-இல் புதிய இயேசு சபையினரிடம் அப்பொறுப்பை ஒப்படைக்கும் வரை கொச்சியிலிருந்து வந்த அருட்தந்தையர் இதைப் பேணிவந்தனர். இவை அனைத்திற்கும் நடுவில்தான், இவ்வூரில் இதுவரை நிகழ்ந்த மிக அற்புதமான நிகழ்வு நிகழ்ந்தது.`,
            },
            {
              year: `1775-க்குப் பின்`,
              title: `அவர்கள் விட்டுவிடாத தந்தை`,
              body: `தாங்கள் இழந்த அருட்தந்தையை அவர்கள் விட்டுவிடவில்லை. அவர் தம் வாழ்நாளில் தம் மென்மையான குணத்தால் அவர்களை வென்றிருந்தார், அவர்களுடைய ஆலயத்தை நிறைவுசெய்திருந்தார், மேலும் அறுபத்து மூன்று ஆண்டுகளுக்கு அவர்களுக்குக் கிடைத்த கடைசி இயேசு சபைத் தந்தை அவரே. தோமஸினி இவ்வூரில் இறக்கவுமில்லை, இங்கே அடக்கம் செய்யவுமில்லை; ஆயினும் அவரது மக்கள் “தங்கள் நடுவே ஒரு நினைவுச் சின்னத்தை எழுப்பி” அவரது நினைவைப் புனிதராகக் காத்தனர். தொண்ணூறு ஆண்டுகளுக்குப் பின்பும் பெர்த்ராண்ட் அவரைப் பற்றி நிகழ்காலத்திலேயே எழுதுகிறார்: “கிறிஸ்தவர்கள் அவரைப் புனிதராகப் போற்றுகிறார்கள், தம் பிள்ளைகளுக்கு அவரது பெயரைச் சூட்டுகிறார்கள், மிகுந்த பக்தியுடன் அவரது கல்லறையைத் தரிசிக்கிறார்கள்.” கிறிஸ்தவர் அல்லாதவர்களும் தம் துன்பங்களில் அவரை மன்றாடுகிறார்கள்; அவரது பரிந்துரையால்தான் தம் பயிர்கள் மீது மழை பொழிகிறது என்று நம்புகிறார்கள் என்றும் அவர் சேர்த்துக் கூறுகிறார்.`,
            },
            {
              year: `1803`,
              title: `மாதாவின் கண்ணீர்க் காட்சி`,
              body: `1803-ஆம் ஆண்டு அக்டோபர் 21, வெள்ளிக்கிழமை முற்பகலில் (தமிழ் ஆண்டு 979, ஐப்பசி மாதம்), திருநெல்வேலியிலிருந்து இவ்வூரில் குடியேறியிருந்த ஐரோப்பியரான திரு. பில்டர்பெக்கைச் சந்திக்க வந்திருந்த சவரிமுத்து பிள்ளை, ஆலயத்திற்குள் செபிக்கச் சென்றார். பீடத்திற்கு மேலே, இரட்டைக் கதவுள்ள ஒரு மாடத்தில் விண்ணேற்பு மாதாவின் திருவுருவம் இருந்தது; அன்று காலை அதன் இரு கதவுகளும் திறந்திருந்தன. அவர் மண்டியிட்டிருக்கையில், ஒளி ஊடுருவும் மேகம் ஒன்று அன்னைக்குப் பின்னால் எழுந்து அவரைச் சூழ்ந்தது. அவருடைய கண்கள் விண்ணை நோக்கி உயர்ந்து நிறைந்தன, கன்னங்களில் கண்ணீர் வழிந்தது; முகம் துயரம் கொண்டது; கூப்பிய கைகள் விரிந்து, மாடத்தின் சுவர்களைத் தொடும் அளவுக்கு வெளிநோக்கி நீண்டன. பீடத்திலிருந்த மற்ற எல்லாத் திருவுருவங்களும் “இரக்கத்தையும் துயரத்தையும் வெளிப்படுத்தின” என்று பதிவு கூறுகிறது.`,
            },
            {
              year: `1803`,
              title: `கிராமமே வந்து கண்ணீர் வடித்தது`,
              body: `மறைக்கல்வியாளர் மதுரேந்திர அண்ணாவியார் பீடத்தில் ஏறிக் கண்ணீரைத் துடைத்தார்; ஆனால் அது நிற்கவில்லை. பின்னர் ஆலய மணி முழங்கியது; வழக்கத்திற்கு மாறான அந்நேரத்தில் ஊரே வயல்களிலிருந்தும் வீடுகளிலிருந்தும் விரைந்து வந்து கூடியது. அந்தப் புதுமையை உற்றுநோக்கியபடி மக்கள் கண்ணீர் வடித்து, “Parce Domine, parce populo tuo” (“ஆண்டவரே, பொறுத்தருளும்; உம் மக்களைப் பொறுத்தருளும்”) என்னும் பழைய மனந்திரும்புதல் பாடலைப் பாடினர். அவர்கள் மன்றாடிக்கொண்டிருக்கையில், திருவுருவமும் மற்ற எல்லாத் திருஉருவங்களும் “தம் வழக்கமான தோற்றத்திற்குத் திரும்பின”; பீடத்திற்கு மேலிருந்த முகம் மீண்டும் ஒரு சாதாரணச் செதுக்கு முகமாயிற்று.`,
            },
            {
              year: `1803`,
              title: `கண்டு உறுதிப்படுத்திய சாட்சிகள்`,
              body: `இப்புதுமையைப் பலர் கண்டனர்; அவர்களுள் இருவரைப் பணிக்களத்தின் சொந்தப் பதிவே பெயரிட்டுக் குறிக்கிறது: மறைக்கல்வியாளர் யாகப்பர் பிள்ளையும், ஐரோப்பியரின் மகள் மிஸ் ஹென்ரியட் பில்டர்பெக்கும். தம் கண்கள் தம்மை ஏமாற்றிவிட்டனவோ என அஞ்சிய சவரிமுத்து அவர்களை அழைத்தார்; அவர்கள் வந்து, அருகில் நின்று உற்றுநோக்கி, மேகம் படர்ந்த முகம், கண்ணீர், மாடத்தின் சுவர்களை நோக்கி நீண்ட கைகள் ஆகிய அதே காட்சியைத் தாங்களே கண்டனர். இப்பதிவு வதந்தியாக வரவில்லை: கண்ணால் கண்டவர்களின் வாய்மொழியிலிருந்து — மதிப்பிற்குரிய மறைக்கல்வியாளரிடமிருந்தும், ஊரின் நம்பிக்கைக்குரிய மக்களிடமிருந்தும் — அவர்களே சொல்லச் சொல்ல, பங்கின் வரலாற்றாசிரியர் செபஸ்தியான் பிள்ளை இதை எழுதிவைத்தார்.`,
            },
            {
              year: `1803–1817`,
              title: `புதுமைக் காலையின் அந்தக் குடும்பம்`,
              body: `1803-ஆம் ஆண்டு நிகழ்வுப் பதிவில் வரும் பில்டர்பெக் குடும்பத்தினர் உண்மையாக வாழ்ந்தவர்களே; இன்றைய ஆய்வறிஞர்களால் அக்குடும்பத்தைப் பெயரிட்டுக் கூற முடிகிறது. கிறிஸ்டோபர் பில்டர்பெக், ஏறத்தாழ 1758-இல் பிறந்து, பதினெட்டாம் நூற்றாண்டின் இறுதியில் வடக்கன்குளத்தில் குடியேறிய ஐரோப்பிய வம்சாவளி வணிகர்; 1817-இல் காலமானார். நங்குநேரியின் வரிவசூல் உரிமையைக் கொண்டிருந்த மதிப்புமிக்க குடும்பம் அது; அன்று திருவுருவத்தை ஆராய்ந்த ஹென்ரியட் அவரது மகள். மாதா கண்ணீர் சிந்தி ஆறு ஆண்டுகளுக்குப் பின், 1809-இல், ஜான் என்னும் மகன் பிறந்தார். 1880-இல் ஜான் இறந்தபோது, ஓர் ஆங்கில மறைப்பணிச் சங்கத்தின் இதழ் அவரைப் பற்றி இவ்வாறு பதிவு செய்தது: “இந்தியாவில் பிறந்தவர்… ஒரு ரோமன் கத்தோலிக்கக் குடும்பத்தைச் சேர்ந்தவர், அத்திருச்சபையின் குருத்துவத்திற்காகப் பயிற்றுவிக்கப்பட்டவர்.”`,
            },
            {
              year: `1803`,
              title: `இதைச் சுமக்கும் நூல்கள்`,
              body: `1803-ஆம் ஆண்டு நிகழ்வின் முழுப் பதிவும் ஒரே ஒரு அச்சு நூலிலிருந்தே — லெயோன் பெஸ்ஸின் “லா மிஸியோன் து மதுரே” (திருச்சிராப்பள்ளி, 1914) — வருகிறது என நெடுங்காலம் கருதப்பட்டது. அது அப்படியல்ல. பெஸ்ஸுக்கு ஒன்பது ஆண்டுகளுக்கு முன்பே, இப்பணிக்களத்தின் ஓர் இயேசு சபை அருட்தந்தை தெசால், இந்நிகழ்வை முழுமையாக அச்சிட்டிருந்தார்; 1930-இல், மலையாளத்தில், முற்றிலும் வேறொரு மரபில் எழுதப்பட்ட தேவசகாயத்தின் வாழ்க்கை வரலாறு ஒன்று, அதே ஐரோப்பியப் பெண்மணி அதே மூன்று அடையாளங்களை ஆராய்ந்ததைப் பதிவு செய்தது. மூன்று சாட்சிகள், மூன்று வெவ்வேறு கைகளால், ஒருவரையொருவர் நகலெடுக்காமல். இது ரோமுக்குக் கொண்டு செல்லப்பட்டதே இல்லை; எந்த ஆய்வுக்குழுவும் இதை நிறுத்தி எடைபோட்டதில்லை. ஆயினும் இப்பங்கு எப்போதும் சுமந்து வந்தவாறே இது நம்மை வந்தடைகிறது: நாளும் பெயர்களும் கொண்ட ஒரு காலை, இரு நூற்றாண்டுகளாகப் போற்றப்படும் ஒரு திருவிழா.`,
            },
          ],
        },
        {
          id: `great-two-nave-church`,
          span: `1838–1872`,
          heading: `மாபெரும் இரட்டை மண்டப ஆலயம்`,
          blurb: `பிரெஞ்சு இயேசு சபையினர் திரும்பி வந்தபோது, பழைய சிற்றாலயம், "உலகிலேயே நிகரற்றதாக இருக்கக்கூடிய" ஓர் ஆலயத்திற்கு வழிவிட்டது: ஒரே பீடத்தில் சந்திக்கும் இரு ஒன்றிணையும் மண்டபங்களைக் கொண்ட தனித்துவமான விரிந்த கவராயம் வடிவ ஆலயம்.`,
          dots: [
            {
              year: `1838`,
              title: `பிரெஞ்சு இயேசு சபையினர் திரும்புகின்றனர்`,
              body: `தங்கிப் பணியாற்ற ஓர் இயேசு சபைத் தந்தை இல்லாமல் அறுபது ஆண்டுகளுக்கும் மேலாகக் கழிந்த பின், மீண்டும் நிறுவப்பட்ட இயேசு சபை தென்னகப் பணிக்களத்திற்கு வந்தது; வடக்கன்குளம் இயேசு சபையின் பராமரிப்பிற்குத் திரும்பியது. தங்களின் முதல் வருகையிலேயே, பழைய சிற்றாலயத்தில் மக்கள் சாதிவாரியாகத் தனித்தனியே அமர்ந்திருப்பதைப் புதிய பிரெஞ்சுத் தந்தையர் கண்டனர் — அதைக் குணப்படுத்தக் கற்றுக்கொள்ள இப்பங்குக்கு ஒரு நூற்றாண்டு தேவைப்படப்போகும் காயம் அது.`,
            },
            {
              year: `1839`,
              title: `புனித சவேரியாரின் நவநாளும் திருவிழாவும்`,
              body: `1839-ஆம் ஆண்டில், மதுரைப் பணிக்களத்தின் தலைவராயிருந்த அருட்தந்தை ஜோசப் பெர்த்ராண்ட், வடக்கன்குளத்தில் புனித சவேரியாரின் மாபெரும் நவநாளையும் சிறப்புத் திருவிழாவையும் கொண்டாடினார். அப்போது மேய்ப்புப் பயணத்தில் இருந்த ஆயர், அதற்காகத் தம்மைவிட்டுப் பிரிந்து செல்லுமாறும், பின்னர் உள்நாட்டில் பாளையங்கோட்டைக்குச் செல்லுமாறும் அவரைக் கேட்டுக்கொண்டார். அந்நாளைப் பெர்த்ராண்ட் தம் நாட்குறிப்பில் பதிவு செய்துள்ளார்: நவம்பர் 23-ஆம் நாள் அதிகாலை இரண்டரை மணிக்குக் குதிரையில் புறப்பட்டு, எட்டு மணிக்கு ஆலயத்தை அடைந்து, திருப்பலி நிறைவேற்றி, நவநாளையும் அவ்வாண்டின் அருட்சாதனப் பணியையும் தொடங்கினார்.`,
            },
            {
              year: `1848`,
              title: `ஆயர் கனோஸ் ஊரிடம் ஆலயம் கேட்கிறார்`,
              body: `மாபெரும் ஆலயம் ஒரு வேண்டுகோளுடன் தொடங்கியது. 1848-ஆம் ஆண்டு தமது மேய்ப்புப் பயணத்தில் மதுரையின் திருத்தூதுப் பிரதிநிதி ஆயர் அலெக்சிஸ் கனோஸ் "வடக்கன்குளத்திற்கு வருகை தந்தார்" என்று அகுஸ்த் ஜான் பதிவு செய்கிறார்; அவ்வருகையை ஜூன் 21 எனப் பங்கின் சொந்த வரலாறு குறிக்கிறது. அவர் என்ன கேட்டார் என்பதை நினைவில் வைத்திருப்பதும் அந்தப் பங்கு வரலாறே — வெளியிலிருந்து எந்த ஆதாரமும் இல்லை: புதிய பெரிய ஆலயத்திற்காக மக்கள் பணம் சேர்க்கத் தொடங்க வேண்டும் என்பதே அது. ஏழு ஆண்டுகளுக்குப் பின், அதன் அடிக்கல்லை ஆசீர்வதிக்க அவரே திரும்பி வந்தார்.`,
            },
            {
              year: `1838–1855`,
              title: `பங்கு நினைவில் வாழும் கொடையாளர்கள்`,
              body: `பணம் சேர்த்த அந்த ஆண்டுகளுடன், நன்றியின் கதை ஒன்றையும் பங்கின் சொந்த வரலாறு இணைக்கிறது: பில்டர்பெக் குடும்பம் — பங்கு நூல்களில் "ஹென்ட்ரியட் பெல்டர்க்" எனத் திரிந்து சேர்ந்த பெயர் — திருமணமாகி இருபத்தேழு ஆண்டுகள் குழந்தையின்றி இருந்து, இவ்வாலய அன்னையிடம் மன்றாடி, ஒரு குழந்தையைப் பெற்று, நன்றியோடு புதிய ஆலயக் கட்டுமானத்திற்குத் தாராளமாகக் கொடையளித்தனர் என்பதே அது. அதே நினைவை விழா மலரும் தமிழில் காக்கிறது: ஓராண்டுக்குள் ஓர் ஆண் குழந்தை பிறந்தது; அவர்களின் மகிழ்ச்சிக்கு அளவே இல்லை. இது நினைவு; நினைவு என்றே இப்பக்கம் இதைப் பதிவு செய்கிறது: நாம் திறந்து பார்த்த எந்த அச்சு வரலாறும் இவ்வாலயத்தின் கொடையாளர் எவரையும் பெயரிடவில்லை — அகுஸ்த் ஜான் இதை அருட்தந்தை கிரகோயரின் "விடாமுயற்சி மிக்க ஆற்றலுக்கே" உரித்தாக்குகிறார் — மேலும் கிறிஸ்டோபர் பில்டர்பெக், அடிக்கல் நாட்டப்படுவதற்கு முப்பத்தெட்டு ஆண்டுகளுக்கு முன்பே, 1817-இலேயே காலமாகிவிட்டார். இன்னும் யாரும் படிக்காத பெஸ்ஸின் நூல் இக்குடும்பத்தின் கொடையைப் பதிவு செய்துள்ளதா என்பது — அந்நூல் இன்னும் வைத்திருக்கும் கேள்விகளுள் ஒன்று.`,
            },
            {
              year: `1855`,
              title: `மாபெரும் ஆலயத்தின் அடிக்கல்`,
              body: `1855-ஆம் ஆண்டு ஆகஸ்ட் 9-ஆம் நாள், மதுரையின் ஆயர் அலெக்சிஸ் கனோஸ், இன்றைய திருக்குடும்ப ஆலயத்தின் அடிக்கல்லை ஆசீர்வதித்தார். முழு வடிவமைப்பின் துணிவுமிக்க குறிக்கோள் வாசகத்தை இப்பங்கின் ஓர் அருட்தந்தை அவ்வேளைக்காக இயற்றினார் என்று இப்பங்கின் சொந்த வரலாறு பதிவு செய்கிறது: "Templum sit duplex, ara sed una" — ஆலயம் இரட்டையாக இருக்கட்டும், ஆனால் பீடம் ஒன்றாக; இரு சாதியினரும் ஒரே விசுவாசமும் ஒரே மனமும் கொண்டிருக்கட்டும். அவ்வாசகம் பங்கின் நூல்கள் வழியாகவே நமக்கு வந்துள்ளது; அதைக் கல்லில் படித்தவர் யாருமில்லை.`,
            },
            {
              year: `1855–1872`,
              title: `அருட்தந்தை ஜோசப் கிரகோயர், வடக்கன்குளத்தின் திருத்தூதர்`,
              body: `சுமார் பதினேழு பொறுமையான ஆண்டுகள் இப்பணியை முன்னின்று நடத்தியவர் அருட்தந்தை ஜோசப் கிரகோயர் (இ.ச.); "உலகிலேயே நிகரற்றதாக இருக்கக்கூடும்" என ஒரு வரலாற்றாசிரியர் வர்ணித்த ஓர் ஆலயத்தை இச்சமூகத்திற்கு அளித்தவர் அவரே. அவரை "வடக்கன்குளத்தின் திருத்தூதர்" என அழைப்பவர், அவருடைய இயேசு சபை வரலாற்றாசிரியர் அகுஸ்த் ஜான் ஒருவர் மட்டுமே. சிமெண்ட், இரும்பு, தாங்கிப் பிடிக்க ஒரு மரக்கட்டை — இவை எதுவுமின்றி, சுண்ணாம்பும் பனைக்கள்ளும் கலந்த சாந்தில், தாமே தாங்கி நிற்கும் இருபத்து நான்கு வளைவுகளை வடிவமைத்து எழுப்பியவர், இயேசு சபையின் பொதுநிலைச் சகோதரர் ஜோசப் பெர்கந்தால்.`,
            },
            {
              year: `1861`,
              title: `பிரான்சில் வார்க்கப்பட்ட இரண்டு மணிகள்`,
              body: `இப்பங்கின் இரட்டை மணிகள் 1861-ஆம் ஆண்டில் பிரான்சில், காசிமிர் கிரகோயர் என்னும் கொடையாளியின் கொடையாக வார்க்கப்பட்டன — கோபுர மணியின் வெண்கலத்தில் இன்றும் அவரது பெயர் பொறிக்கப்பட்டுள்ளது. பெட்டிகளில் அடைக்கப்பட்டு, கடல்வழியாகச் சென்னைக்கு வந்து, திருநெல்வேலி வழியாக ஏற்றி வரப்பட்டு, இறுதியில் 1872-ஆம் ஆண்டில், ஆலயத்தின் புதிய இரு கோபுரங்களிலும் தலா ஒன்றாகத் தொங்கவிடப்பட்டன; அவற்றின் இணைந்த ஒலி, இந்த நாட்டில் வேறெங்கும் கேட்க முடியாத ஓர் இனிமையைத் தருகிறது என மக்கள் இன்றும் சொல்கின்றனர்.`,
            },
            {
              year: `1863`,
              title: `ஆலயத்தின் அருகே ஒரு கல்லறை`,
              body: `அந்த நீண்ட கட்டுமானம் என்ன விலை கேட்டது என்பது ஆலயத்தின் அருகிலேயே எழுதப்பட்டுள்ளது. "வடக்கன்குளத்துக் கிறிஸ்தவர்களின் பக்தி, தங்கள் ஆலயத்தின் அருகே, 1863 ஜனவரி 25-இல் இறந்த அருட்தந்தை ஊஜென் ரொசினியோலுக்கு ஓர் எளிய கல்லறையை எழுப்பியது" — காலரா நோயால் வாடிய கள்ளிகுளத்துக் கிறிஸ்தவர்களைப் பணிவிடை செய்யும்போதே அந்நோய் அவருக்குத் தொற்றியது. கப்பலில் மரணப்படுக்கையில் இருந்த அருட்தந்தை கிரகோயருக்கு அந்திமப் பூசுதல் அளித்த அருட்தந்தை விக்தோர் தெல்பெஷ், மீண்டும் இங்கு வந்து, அருட்தந்தை பூஜே அவர்களின் கைகளிலேயே இறந்தார். அந்நாளை 1887 ஜனவரி 16 எனத் தெசால் தருகிறார்; அது ஒரு சனிக்கிழமை என்று மட்டுமே அகுஸ்த் ஜான் கூறுகிறார்.`,
            },
            {
              year: `c.1864`,
              title: `நாட்டு அருட்சகோதரிகளுக்கான ஒரு மடம்`,
              body: `சுமார் 1864-ஆம் ஆண்டைய பணிக்கள விவரங்களைப் பதிவு செய்யும் ஒரு பிரிட்டிஷ் மாவட்டக் கையேடு, திருநெல்வேலி முழுவதிலுமுள்ள இயேசு சபைப் பணிக்களத்தில் மூன்று மடங்களைப் பட்டியலிடுகிறது: ஒன்று தூத்துக்குடியில், ஒன்று அடைக்கலபுரத்தில், மற்றொன்று "வடக்கன்குளத்தில் நாட்டு அருட்சகோதரிகளுக்கான ஒரு மடம்" — முத்துக்குளிக்கும் கடற்கரையிலிருந்து விலகி அமைந்திருந்த ஒரே மடம் அதுவே. மாபெரும் ஆலயம் இன்னும் கட்டப்பட்டுக்கொண்டிருந்தபோதே அருட்சகோதரிகள் இங்கே வாழ்ந்து வந்தனர். இவ்வளவு தொடக்கக் காலத்தில் இங்கே ஒரு மடம் இருந்ததாக எந்தப் பங்கு ஆவணமும் பதிவு செய்யவில்லை; அந்த மாவட்டக் கையேடு மட்டுமே அவர்களை நினைவுகூர்கிறது.`,
            },
            {
              year: `1872`,
              title: `இரட்டை மண்டப ஆலயம் ஆசீர்வதிக்கப்படுகிறது`,
              body: `கட்டி முடிக்கப்பட்ட திருக்குடும்ப ஆலயம் 1872-ஆம் ஆண்டில் ஆசீர்வதிக்கப்பட்டது — ஆயர் கனோஸ் அவர்களால் என்று இப்பங்கின் சொந்த வரலாறு பதிவு செய்கிறது. மாவட்டக் கெசட்டியர் நூல் அக்கட்டிடத்தை எளிய சொற்களில் குறித்து வைக்கிறது: "ஒன்றை ஒன்று நோக்கி நெருங்கி, ஒரே பொதுவான பீடப்பகுதியில் சந்திக்கும் இரு மண்டபங்கள்." அகுஸ்த் ஜான் இவ்வடிவமைப்பை விரிந்த கவராயம் என்று அழைத்தார்: வாயில்களில் அகன்று விரிந்து, படிப்படியாக நெருங்கி, ஒரே பொதுப் பீடத்தில் சந்திக்கும் இரு மண்டபங்கள். 92 அடி உயரமுள்ள இரு எண்கோணக் கோபுரங்களையும், தாவரங்களிலிருந்தும் மரங்களிலிருந்தும் எடுக்கப்பட்ட சாயங்களால் வரையப்பட்ட மேற்கூரை வளைவுகளையும் இப்பங்கின் வரலாறு சேர்த்துக் கூறுகிறது.`,
            },
            {
              year: `1873 அல்லது 1875`,
              title: `அருட்தந்தை கிரகோயர் கடலில் இறக்கிறார்`,
              body: `அந்த ஆலயத்திற்குப் பின் அவர் நீண்ட நாள் வாழவில்லை. "இந்தத் திருத்தலத்தைக் கட்டுவது அவருக்கு எத்தனை கவலைகளையும் களைப்புகளையும் தந்தது என்பதை இறைவன் ஒருவரே அறிவார்" என்று அவரது வரலாற்றாசிரியர் எழுதினார். உடல்நலம் கருதி மருத்துவர்களின் அறிவுரைப்படி சொந்த நாட்டுக்கு அனுப்பப்பட்ட அருட்தந்தை கிரகோயர் அவர்கள், அப்பயணத்தை முடிக்கவில்லை: செங்கடலைக் கடக்கும்போது, அருட்தந்தை விக்தோர் தெல்பெஷ் அவர்கள் நோயில் பூசுதல் அளிக்க, அவர் இறையடி சேர்ந்தார். இரு வரலாற்றாசிரியர்களும் நாளில் ஒத்துப்போகின்றனர்; ஆண்டில் மட்டுமே வேறுபடுகின்றனர் — இருவருமே அவர் இறந்த நாளாகச் செப்டம்பர் 19-ஐத் தருகின்றனர்: அகுஸ்த் ஜான் 1873-ஆம் ஆண்டு என்றும், தெசால் 1875-ஆம் ஆண்டு என்றும். 30 ஆண்டுகள் அவர் மறைப்பணியாளராக இருந்தார்.`,
            },
          ],
        },
        {
          id: `little-rome`,
          span: `1891–1944`,
          heading: `சின்ன ரோமாபுரி`,
          blurb: `ஒரு திருவிழாத் தேர்; இரு மண்டபங்களுக்கும் இடையே ஒற்றுமையை நோக்கிய நீண்ட பயணம்; புதிய தூத்துக்குடி மறைமாவட்டம்; கிராமத்தின் இரண்டாம் பெயராகவே மாறிய அன்புப் பட்டம்.`,
          dots: [
            {
              year: `1891`,
              title: `திருவிழாத் தேர் கட்டப்படுகிறது`,
              body: `1891-ஆம் ஆண்டில் ஒரு திருவிழாத் தேர் கட்டப்பட்டது என்று இப்பங்கின் சொந்த வரலாறு பதிவு செய்கிறது — 35 அடி உயரமுள்ள மரத் தேர்; பலா, தேக்கு, வேம்பு மரங்களில் உள்ளூர்ச் சிற்பிகளால் செதுக்கப்பட்டது என்று அதே வரலாறே கூறுகிறது. நூறு ஆண்டுகளுக்கும் மேலாக அது பயன்பாட்டில் இருந்தது; அந்தப் பழைய தேர் இப்போது பயணிகள் மாதாவைத் தாங்கும் தொட்டிலாக நிற்கிறது. 2014-ஆம் ஆண்டு முதல், புதிதாக வடிவமைக்கப்பட்ட ஒரு தேரே அன்னையைச் சுமந்து வருகிறது. ஆகஸ்ட் 15-ஆம் நாள் அதிகாலையில் நடைபெறும் தேர் ஊர்வலம் இன்றும் ஏறக்குறைய ஒரு லட்சம் திருப்பயணிகளை ஈர்க்கிறது; அவர்களுள் பலர் கேரளாவிலிருந்து கடந்து வருகின்றனர்.`,
            },
            {
              year: `சுமார் 1910`,
              title: `பிரிவினைச் சுவர் இடிக்கப்படுகிறது`,
              body: `அருட்தந்தை கிரகோயர் அவர்கள் இரு தனி மண்டபங்களுடன் கட்டிய அந்த ஆலயத்தில், வழிபாட்டின்போது சாதியினர் ஒருவரையொருவர் பார்ப்பதைக்கூட ஒரு சுவர் ஒருகாலத்தில் தடுத்தது. சுமார் 1910-ஆம் ஆண்டில், 18 ஆண்டுகள் பாலும் வாழைப்பழமும் மட்டுமே உண்டு வாழ்ந்த கடுந்துறவியான அருட்தந்தை அத்ரியன் கௌசானல் அவர்கள் அந்தப் பிரிவினைச் சுவரை இடித்தார்; அதனால் முதல் முறையாக அனைத்துச் சாதியினரும் ஒரே மக்களாய் ஒன்றாக நின்று பாடினர். அது உண்மையான நல்லிணக்கச் செயல் — இன்று இப்பங்கு தன் பெயராகவே தாங்கி நிற்கும் ஒற்றுமையை நோக்கிய திருப்புமுனை.`,
            },
            {
              year: `1881–1923`,
              title: `புத்தகம் 450 — அதைத் தொகுத்தவர்`,
              body: `சேம்பகனூர் இயேசு சபை ஆவணக் காப்பகத்தில் அந்நூல் இன்றும் உள்ளது: புத்தகம் 450 — "வடக்கன்குளத்தில் அருட்தந்தை அ. கௌசானல் (இ.ச.) அவர்களின் நாட்குறிப்பு, 1881–1923." ஆனால் அது 1881 முதல் இங்கே நாளுக்கு நாள் எழுதப்பட்ட நாட்குறிப்பு அல்ல. அருட்தந்தை கௌசானல் அவர்கள் 1884-ஆம் ஆண்டில்தான் குருப்பட்டம் பெற்றார்; இந்தியா வந்தடைந்தது 1888-ஆம் ஆண்டில். இயேசு சபையின் ரோமைப் பட்டியல்கள் அவரை 1914-ஆம் ஆண்டில் வடக்கன்குளத்திலும், அதற்கு முன்னும் பின்னும் வேறிடங்களிலும் வைக்கின்றன; இப்பங்கின் சொந்த அருட்தந்தையர் பட்டியலோ அவருக்கு 1910 முதல் 1919 வரை என்று தருகிறது. அவர் இங்கே என்ன செய்தார் என்பதை இயேசு சபையின் சொந்த இதழே சொல்கிறது — அதுவே சிறந்த கதையும் கூட: "நாட்குறிப்புகளையும், இந்நாட்டின் ஒரு வரலாற்றையும்" அவர் எழுதினார்; "பழைய கையெழுத்துப் படிகளைத் தேடிக் கண்டெடுத்து, அவற்றை வாசித்து விளக்குகிறார்." புத்தகம் 450 அந்தப் பணியே — பழைய ஏடுகளிலிருந்து, இம்மக்களுக்கு நடுவே வாழ்ந்த ஒருவரால் தொகுக்கப்பட்ட இப்பங்கின் கடந்த காலம். அது நிலைத்திருக்கிறது; நாங்கள் இன்னும் அதைப் படிக்கவில்லை.`,
            },
            {
              year: `1923`,
              title: `தூத்துக்குடி மறைமாவட்டம் பிறக்கிறது`,
              body: `1923-ஆம் ஆண்டு தூத்துக்குடி மறைமாவட்டம் நிறுவப்பட்டது; வடக்கன்குளம் பழைய திருச்சிராப்பள்ளி மறைமாவட்டத்திலிருந்து, முதல் ஆயர் பிரான்சிஸ் திபேர்த்தியுஸ் ரோச் (இ.ச.) அவர்களின் கீழ் புதிய மறைமாவட்டத்திற்கு மாறியது. அடுத்த ஆண்டு வெளிவந்த இந்தியக் கத்தோலிக்கக் கையேடு இப்பங்கை இவ்வாறு பதிவு செய்கிறது: "வடக்கன்குளம் (திருநெல்வேலி மாவட்டம்) — அருட்தந்தையர் ஒய். இஞ்ஞாசி, ஜி. மைக்கேல் (உதவி) — கத்தோலிக்கர் 4,765; கிராமங்கள் 17; ஆலயங்கள்: செங்கல் 1, களிமண் 4." இவ்விரு அருட்தந்தையரும் இயேசு சபையினர் அல்லர்: பங்கின் பொறுப்பு மறைமாவட்ட அருட்தந்தையரிடம் சென்றுவிட்டது.`,
            },
            {
              year: `1926`,
              title: `"சின்ன ரோமாபுரி"`,
              body: `1926-ஆம் ஆண்டில், திருக்குடும்ப ஆலயத்தின் மாட்சிமையால் வியப்புற்ற தூத்துக்குடியின் முதல் ஆயர், மேதகு முனைவர் பிரான்சிஸ் திபேர்த்தியுஸ் ரோச் (இ.ச.) அவர்கள், வடக்கன்குளத்தை அன்புடன் "சின்ன ரோமாபுரி" என்று அழைத்தார். அன்றிலிருந்து இந்தப் பட்டமே கிராமத்தின் பெருமைமிக்க இரண்டாம் பெயராக இருந்து வருகிறது; ரோமின் மாபெரும் பேராலயத்திற்கு ஒப்பிடப்படும் ஓர் ஆலயத்தைக் காண்பதற்காகத் திருப்பயணிகளை அது ஈர்த்து வருகிறது.`,
            },
            {
              year: `1930`,
              title: `வயது முதிர்ந்த ஆலயப் பணியாளரும் திருத்தந்தையும்`,
              body: `ரோமையில், ஆயர் ரோச் அவர்கள் தம் மக்களின் வணக்கத்தைத் திருத்தந்தை பதினொன்றாம் பயஸ் அவர்கள் முன் சமர்ப்பித்தார்; தூத்துக்குடியின் மிகவும் தகுதிவாய்ந்த கிறிஸ்தவர்களுக்குத் திருத்தந்தை நினைவுப் பரிசுகளை அனுப்பினார். வடக்கன்குளத்தின் வயது முதிர்ந்த ஆலயப் பணியாளருக்கு — ஒரு பொது விகாரியின், ஒரு துறவற மடத் தலைவியின் சகோதரர்; 82 வயதிலும் ஆலயப் பணியைத் தொடர்ந்தவர் — "பெனே மெரெந்தி" பதக்கம் வழங்கப்பட்டது. இயேசு சபையின் சொந்த இதழ் அவரது வயதையும் பணியையும் அச்சிட்டது; அவரது பெயரை அல்ல. அதே சந்திப்பில், திருத்தந்தை ஆயரின் சொந்தக் குடும்பத்தைப் பற்றியும் பேசினார்: "ஓ! அழகிய குடும்பம்," என்றார் அவர்; "இரண்டு அருட்தந்தையர், ஓர் ஆயர். எத்துணை பாக்கியமுள்ள தாய்!" — ஆயர் ரோச் அவர்களின் தாயாருக்குத் தங்கச் செபமாலை ஒன்றையும் அனுப்பினார்.`,
            },
            {
              year: `1944`,
              title: `பாத்திமாகிரியில் ஜெபமாலைத் தாசர் சபைத் தந்தையர்`,
              body: `1928-ஆம் ஆண்டு யாழ்ப்பாணத்தில் தோன்றிய ஜெபமாலைத் தாசர் சபை, இந்தியாவில் தனது முதல் இல்லமான பாத்திமாகிரி ஆசிரமம் 1944-ஆம் ஆண்டில் இங்கே அந்தோணி சூசைநாதர் அவர்களால் நிறுவப்பட்டது எனப் பதிவு செய்கிறது; அவரை அச்சபை "இறைவனின் ஊழியர்" என்று போற்றுகிறது. இந்தியாவில் ஜெபமாலைத் தாசர் சபையின் பிறப்பிடம் இவ்வூரே என்பது அச்சபையின் சொந்தக் கூற்றை மட்டுமே சார்ந்துள்ளது. இன்றும் அச்சபைத் தந்தையர் பாத்திமாகிரியில் தங்கள் இல்லத்தைப் பேணி வருகின்றனர்; சேவைட் சகோதரிகள், பெத்தானி சகோதரிகளுடன் இணைந்து இன்றளவும் அவர்கள் பங்கு வாழ்வின் ஓர் அங்கமாய் இருக்கின்றனர்.`,
            },
          ],
        },
        {
          id: `town-of-learning`,
          span: `1892–1970`,
          heading: `கல்வி நகரம்`,
          blurb: `கிராமத்துச் சிறுமிகளுக்கு எழுத்துக் கற்பித்த அருட்சகோதரிகள், லேஸ் வேலைக்கும் ஊசி வேலைக்குமான ஒரு பள்ளி, இறுதியில் 40 படுக்கைகள் கொண்ட ஒரு மருத்துவமனை: ஓர் ஏழைப் பங்கு தனக்குத் தானே கட்டிக்கொண்ட கல்விக்கும் நலமளிப்புக்குமான ஏணி.`,
          dots: [
            {
              year: `1892`,
              title: `அருட்சகோதரிகளும் பெண்கள் பள்ளியும்`,
              body: `1892-ஆம் ஆண்டு ஏப்ரல் மாதத்தில், 1876-ஆம் ஆண்டு திருச்சிராப்பள்ளியில் உருவான இந்திய அருட்சகோதரிகளின் சபையான ஏழு வியாகுல அன்னையின் அருட்சகோதரிகள் 65 பேராக இருந்தனர்; அந்நகருக்கு அப்பால் அவர்கள் கொண்டிருந்த நான்கு இல்லங்களுள் ஒன்றாக வடக்கன்குளத்தை இயேசு சபை வரலாற்றாசிரியர் அகுஸ்த் ஜான் குறிப்பிடுகிறார். சிறுமியருக்குக் கல்வி அளிப்பதே அவர்களின் தனிச்சிறப்புப் பணி என்றும், "எங்கும் அவர்கள் செழித்தோங்கும் பள்ளிகளை நடத்துகின்றனர்" என்றும் அவர் எழுதுகிறார். அந்த இந்திய அருட்சகோதரிகள் மடத்தின் ஆன்மிகக் குருவாகவும், அதன் பள்ளியின் இயக்குநராகவும் இங்கிருந்த அருட்தந்தை இருந்ததை இயேசு சபையின் ரோமைப் பதிவேடு குறித்து வைக்கிறது — 1900-ஆம் ஆண்டிலும், மீண்டும் 1914-ஆம் ஆண்டு அருட்தந்தை கௌசானல் அவர்கள் காலத்திலும்.`,
            },
            {
              year: `சுமார் 1922`,
              title: `லேஸ் தொழிற்பள்ளியும் தையல் நிலையமும்`,
              body: `1921-ஆம் ஆண்டில் அருட்சகோதரிகளின் ஊசி வேலைப் பள்ளியை ஓர் ஆய்வாளர் வந்து பார்வையிட்டார் என்றும், 1922-ஆம் ஆண்டு முதல் அச்சகோதரிகள் ஊசி வேலை, சித்திரத் தையல், லேஸ், பின்னல், ஆடை தைத்தல் ஆகியவற்றைக் கற்பித்தனர் என்றும், 1966-ஆம் ஆண்டில் தையல் பள்ளியின் முழுப் பொறுப்பும் அவர்களிடமே ஒப்படைக்கப்பட்டது என்றும் இப்பங்கின் சொந்த வரலாறு பதிவு செய்கிறது. இந்த ஆண்டுகள் இப்பங்கு தன்னைப் பற்றித் தானே சொல்லும் கூற்று. பள்ளியைப் பற்றியோ ஐயமில்லை: ஆர்.சி. லேஸ் தொழிற்பள்ளியை இப்பங்கின் பணிகளுள் ஒன்றாக மறைமாவட்டம் இன்றும் குறிப்பிடுகிறது; ஒசானம் தையல் நிலையமும் இப்பங்கின் சொந்தப் பட்டியலில் அதனருகே நிற்கிறது.`,
            },
            {
              year: `1970`,
              title: `பெத்தானி சகோதரிகளும் புனித தோமையார் மருத்துவமனையும்`,
              body: `தம் மக்களுக்கு மருத்துவப் பராமரிப்பு தேவை என்பதை உணர்ந்த அன்றைய பங்குத் தந்தை மரிய ஞானம் அவர்கள், பெத்தானியின் குழந்தை தெரேசாள் அருட்சகோதரிகளை அழைத்தார். நான்கு சகோதரிகள் 1970-ஆம் ஆண்டு ஜூலை 27-ஆம் நாள் வந்து, ஒரு வாடகை வீட்டில் தங்கள் நலமளிக்கும் பணியைத் தொடங்கினர்; பின்னர் மிசெரியோர் நிறுவனத்தின் உதவியுடன், இன்று அது நிற்கும் அதே இடத்தில் புனித தோமையார் மருத்துவமனையைக் கட்டினர். அது 40 படுக்கைகளும் அறுவைச் சிகிச்சை அறையும் கொண்டதாக வளர்ந்துள்ளது; 25 முதல் 30 கிராமங்களுக்குச் சேவை செய்வதாக அச்சகோதரிகளின் சொந்தப் பதிவே கூறுகிறது. இன்றளவும் அவர்களே அதைப் பேணி வருகின்றனர்.`,
            },
          ],
        },
        {
          id: `shrine-and-the-saint`,
          span: `1993–இன்று வரை`,
          heading: `திருத்தலமும் புனிதரும்`,
          blurb: `திருத்தலமாக அறிவிக்கப்பட்டு, புதிய கொடிமரத்தால் சிறப்புற்று, தன் சுவர்களுக்குள் திருமுழுக்குப் பெற்றவர் புனிதராக அறிவிக்கப்பட்டதில் மகிழ்ந்து — சின்ன ரோமாபுரி இன்றும் செழித்தோங்கும் மரியன்னைத் திருப்பயண நகராக வாழ்கிறது.`,
          dots: [
            {
              year: `1993`,
              title: `திருத்தலமாக அறிவிக்கப்படுகிறது`,
              body: `1993-ஆம் ஆண்டு ஆகஸ்ட் 6-ஆம் நாள், தூத்துக்குடியின் ஆயர் எஸ்.டி. அமலநாதர் அவர்கள் திருக்குடும்ப ஆலயத்தை அர்ச்சித்து, அதைப் புனிதத் திருத்தலமாக அறிவித்தார். அவ்வாண்டைய ஒவ்வொரு சான்றும் இதை அதன் பழைய அர்ப்பணப் பெயரான திருக்குடும்ப ஆலயம் என்றே குறிக்கிறது; இன்று இது தாங்கும் "விண்ணேற்பு மாதா திருத்தலம்" என்னும் மரியன்னைப் பெயர், 2022-ஆம் ஆண்டு மறைமாவட்டக் கடிதங்களில்தான் முதன்முதலில் காணப்படுகிறது. இந்தப் பெருமையுடன், மாதந்தோறும் முதல் சனிக்கிழமை நவநாள் செபமும் ஆராதனையும் கொண்ட பக்திமுயற்சி ஒன்று தொடங்கியது; திருப்பயணிகள் இன்றுவரை அதைக் கடைப்பிடிக்கின்றனர்.`,
            },
            {
              year: `2014`,
              title: `திருவிழாத் தேர் புதிதாக வடிவமைக்கப்படுகிறது`,
              body: `2014-ஆம் ஆண்டில், விண்ணேற்பு மாதாவின் திருவிழாத் தேர் ஒன்றை இப்பங்கு புதிதாக வடிவமைத்துக் கட்டியது. 1891-ஆம் ஆண்டில் உள்ளூர் வடவைச் சிற்பிகளால் செய்யப்பட்டு, நூறு ஆண்டுகளுக்கும் மேலாக அன்னையைச் சுமந்து வந்த 35 அடி தேரின் இடத்தை அது ஏற்றது; அந்தப் பழைய தேர் இப்போது பயணிகள் மாதாவைத் தாங்கும் தொட்டிலாக ஓய்வுகொள்கிறது. அதே ஆண்டுகளில், மாதா காட்சித் திருத்தலத்தின் கல்வாரிச் சிற்றாலயம் நிறைவுபெற்று, புனித தேவசகாயம் பிள்ளை, புனித அருளானந்தர் ஆகியோரின் திருவுருவங்கள் நிறுவப்பட்டன.`,
            },
            {
              year: `2021`,
              title: `கொடிமரம் ஆசீர்வதிக்கப்படுகிறது`,
              body: `இப்பங்கின் சொந்த ஆண்டுவிழா மலரின் பதிவுப்படி, 2021-ஆம் ஆண்டு ஆகஸ்ட் 6-ஆம் நாள் மேதகு ஆயர் ஸ்டீபன் அந்தோனி அவர்கள் கொடிமரத்தை அர்ச்சித்தார்; அக்கொடிமரம் பங்குத் தந்தை ஜான் பிரிட்டோ அவர்களின் காலத்தில் நிறுவப்பட்டது. அந்நாள் பத்து நாள் பெருங்கூர் திருவிழாவின் தொடக்க நாள்; அத்திருவிழா ஆகஸ்ட் 15-ஆம் நாள் விண்ணேற்புப் பெருவிழாவுடன் நிறைவடைகிறது. 1993-ஆம் ஆண்டு இவ்வாலயம் திருத்தலமாக அறிவிக்கப்பட்டதும் ஆண்டின் அதே நாளில்தான்.`,
            },
            {
              year: `2022`,
              title: `புனித தேவசகாயம் பிள்ளை, இந்தியாவின் முதல் பொதுநிலைப் புனிதர்`,
              body: `2022-ஆம் ஆண்டு மே 15-ஆம் நாள், 1745-ஆம் ஆண்டு மே 14-ஆம் நாள் இந்த ஆலயத்தில் திருமுழுக்குப் பெற்ற தேவசகாயம் பிள்ளையைத் திருத்தந்தை பிரான்சிஸ் அவர்கள் புனிதராக அறிவித்தார்; பீடங்களுக்கு உயர்த்தப்பட்ட முதல் இந்தியப் பொதுநிலையாளர் அவரே. 1894-ஆம் ஆண்டில், இயேசு சபை வரலாற்றாசிரியர் அகுஸ்த் ஜான், அவருடைய ஆடையின் ஒரு பகுதியையும், அவர் கட்டப்பட்டிருந்த சங்கிலிகளையும் இந்த ஆலயம் வைத்திருந்ததாகப் பதிவு செய்தார். திருவிதாங்கூர் அரசவை அலுவலராக அவர் அணிந்திருந்த தலைப்பாகை இங்கே பாதுகாக்கப்படுவதாக மறைமாவட்டம் பதிவு செய்கிறது; ஒவ்வொரு ஆகஸ்ட் 15-ஆம் நாளும் அது கண்ணாடிப் பெட்டியில் வணக்கத்திற்காகக் காட்சிக்கு வைக்கப்படுகிறது.`,
            },
            {
              year: `2012–2025`,
              title: `இந்தியப் பொதுநிலையினரின் பாதுகாவலர்`,
              body: `2022-இல் தொடங்கவுமில்லை, முடியவுமில்லை. 2012 ஜூன் மாதத்தில் திருத்தந்தை பதினாறாம் பெனடிக்ட் அவர்கள் அவரது இரத்தசாட்சியத்தை ஏற்றார்; அதே ஆண்டு டிசம்பர் 2-ஆம் நாள், திருத்தந்தையின் பெயரால், கர்தினால் ஆஞ்செலோ அமாத்தோ அவர்கள் நாகர்கோவிலில் தேவசகாயத்தை அருளாளராக அறிவித்தார். திருத்தந்தை பிரான்சிஸ் அவர்கள் 2020 பிப்ரவரியில் புதுமையை ஏற்று, 2022 மே மாதத்தில் அவரைப் புனிதராக அறிவித்தார். பின்னர், 2025 ஜூலை 16-ஆம் நாளிட்ட ஆணையின்படி, "இந்தியப் பொதுநிலையினரின் பாதுகாவலர்" எனத் திருப்பீடம் அவரை அறிவித்தது; அக்டோபர் 15-ஆம் நாள் அது முறையாகப் பறைசாற்றப்பட்டது. இவ்வாலயத்தில் திருமுழுக்குப் பெற்றவரே இன்று இந்நாட்டின் ஒவ்வொரு பொதுநிலைக் கத்தோலிக்கருக்கும் பாதுகாவலர்.`,
            },
            {
              year: `இன்று`,
              title: `இன்றைய சின்ன ரோமாபுரி`,
              body: `வடக்கன்குளம் இன்று பெருவாரியாகக் கத்தோலிக்க நகரம்; கல்வியறிவிலும் குறிப்பிடத்தக்கது: 2011-ஆம் ஆண்டு மக்கள்தொகைக் கணக்கெடுப்பு இந்நகரின் மொத்த மக்கள்தொகையை 9,220 எனவும், அவர்களுள் 94 விழுக்காட்டினர் எழுத்தறிவு பெற்றவர்கள் எனவும் தருகிறது. அன்பியங்கள் (அடிப்படைக் கிறிஸ்தவ சமூகங்கள்) வழியாக ஒழுங்கமைக்கப்பட்ட, சுமார் 4,000 குடும்பங்களில் சுமார் 10,500 கத்தோலிக்கர் என இப்பங்கு கணக்கிடுகிறது; மறைமாவட்டத்தின் சொந்தப் பதிவேடோ சுமார் 1,600 குடும்பங்களில் சுமார் 7,350 பேர் எனக் குறிக்கிறது. மாபெரும் ஆகஸ்ட் பெருங்கூர் திருவிழா, ஆகஸ்ட் 15-ஆம் நாள் அதிகாலையில் நடைபெறும் தேர் ஊர்வலத்திற்காக இன்றும் ஏறக்குறைய ஒரு லட்சம் திருப்பயணிகளை ஈர்க்கிறது — 2022-ஆம் ஆண்டு மாலைமலர் நாளிதழ் அவ்வாறே செய்தி வெளியிட்டது; அவர்களுள் பலர் கேரளாவிலிருந்து கடந்து வருகின்றனர். மாதந்தோறும் வெளியாகும் "வடவை மாதா மலர்" இதழ் வழியாகவும், தன் நேரடி ஒளிபரப்புகள் வழியாகவும் இப்பங்கு தன் விசுவாசிகளை நெருக்கமாக வைத்திருக்கிறது.`,
            },
          ],
        },
      ],
    },
    festivals: {
      label: `திருநாள் நாட்காட்டி`,
      title: `திருவிழாக்களும் திருநாட்களும்`,
      intro: `எங்கள் பங்கின் ஆண்டு, பெருவிழாக்களாலும் நெருக்கமான சிறு கொண்டாட்டங்களாலும் நெய்யப்பட்ட ஒன்று — பங்கு மக்கள் வழிபாட்டிலும் மகிழ்ச்சியிலும் ஒன்றுகூடும் தருணங்கள் இவை.`,
      featuredLabel: `ஆண்டுத் திருவிழா`,
      featured: {
        name: `விண்ணேற்பு மாதா திருவிழா`,
        date: `ஆகஸ்ட் 6 – 15`,
        body: `ஆண்டின் மிகப் பெரிய கொண்டாட்டம் — திருப்பலி, நவநாள், ஊர்வலம் என்று பத்து நாட்கள் அன்னையைப் போற்றி நடைபெறும் விழா; ஆகஸ்ட் 15 அன்று நிகழும் பெருந்திருவிழாவிற்குச் சுற்றுவட்டாரம் முழுவதிலிருந்தும் திருப்பயணிகள் திரளாக வந்து சேர்கின்றனர்.`,
        schedule: [
          {
            when: `ஆகஸ்ட் 6 · 1-ஆம் நாள்`,
            detail: `கொடியேற்றம் — மாலை 6:00`,
          },
          {
            when: `ஆகஸ்ட் 6 – 14 · 1–9 நாட்கள்`,
            detail: `தமிழ்த் திருப்பலிகள் — காலை 5:00, 6:15, 7:15`,
          },
          {
            when: `ஆகஸ்ட் 14 · 9-ஆம் நாள்`,
            detail: `மலையாளத் திருப்பலி — மாலை 4:00`,
          },
          {
            when: `ஆகஸ்ட் 15 · திருவிழா நாள்`,
            detail: `ஆயரின் திருப்பலி — காலை 5:00 · ஆங்கிலத் திருப்பலி`,
          },
        ],
      },
      yearLabel: `ஆண்டு முழுவதும் திருவிழாக்கள்`,
      list: [
        {
          name: `புனித செபஸ்தியார் ஆலயத் திருவிழா`,
          date: `ஜனவரி 11 – 20`,
          body: `படைவீரரும் இரத்தசாட்சியுமான புனித செபஸ்தியாரின் சிற்றாலயத்தில் பத்து நாட்கள் பக்தி முயற்சிகள் நடைபெறுகின்றன.`,
        },
        {
          name: `காணிக்கை மாதா திருவிழா`,
          date: `ஜனவரி 31 – பிப்ரவரி 2`,
          body: `குழந்தை மரியாளைத் திருக்கோவிலில் காணிக்கையாக ஒப்புக்கொடுத்ததை நினைவுகூரும் மூன்று நாள் திருவிழா; தமிழில் அன்னை காணிக்கை மாதா என்று அழைக்கப்படுகிறார்.`,
        },
        {
          name: `புனித அருளானந்தர் திருவிழா`,
          date: `பிப்ரவரி 3 – 4`,
          body: `1685-ல் எங்கள் பங்கை நிறுவிய இயேசு சபை இரத்தசாட்சி புனித அருளானந்தரைப் போற்றும் திருநாள்.`,
        },
        {
          name: `லூர்து மாதா திருவிழா`,
          date: `பிப்ரவரி 5 – 11`,
          body: `லூர்து நகரில் அன்னை மரியாள் தந்த காட்சியை நினைவுகூரும் நாட்கள்; நோயாளர்களுக்காகச் சிறப்புச் செபங்கள் ஏறெடுக்கப்படுகின்றன.`,
        },
        {
          name: `புனித அந்தோணியார் ஆலயத் திருவிழா`,
          date: `ஜூன் 1 – 13`,
          body: `ஏழைகளுக்குத் துணையாய் நிற்கும் பதுவை நகர் புனித அந்தோணியாரின் திருநாளை நோக்கிச் செல்லும் பதின்மூன்று நாட்கள்.`,
        },
        {
          name: `புனித ஜார்ஜ் ஆலயத் திருவிழா`,
          date: `ஜூன் 18 – 27`,
          body: `படைவீரரும் இரத்தசாட்சியுமான புனித ஜார்ஜின் ஆலயத்தில் பத்து நாட்கள் பக்தி முயற்சிகள் நடைபெறுகின்றன.`,
        },
        {
          name: `வேளாங்கண்ணி மாதா ஆலயத் திருவிழா`,
          date: `ஆகஸ்ட் 30 – செப்டம்பர் 8`,
          body: `வேளாங்கண்ணி ஆரோக்கிய அன்னைக்கு எடுக்கப்படும் நவநாள்; அன்னையின் பிறந்த திருநாளன்று நிறைவடைகிறது.`,
        },
        {
          name: `புனித மிக்கேல் ஆலயத் திருவிழா`,
          date: `செப்டம்பர் 20 – 29`,
          body: `விசுவாசிகளின் பாதுகாவலரான புனித மிக்கேல் அதிதூதரை மிக்கேல்பாளையத்தில் போற்றும் திருவிழா.`,
        },
      ],
      marianLabel: `அன்னையின் சிறப்பு நாட்கள்`,
      marian: [
        {
          name: `அன்னை மரியாளின் பிறந்த திருநாள்`,
          date: `செப்டம்பர் 8`,
          body: `பேறுபெற்ற அன்னையின் பிறந்த நாள்; பங்கு முழுவதும் மகிழ்ச்சியோடு கொண்டாடப்படுகிறது.`,
        },
        {
          name: `மாதாவின் புதுமைக் காட்சி`,
          date: `அக்டோபர் 23`,
          body: `அன்னையின் திருவுருவம் விசுவாசிகளை நோக்கித் தம் திருக்கரங்களை நீட்டியதாகப் போற்றப்படும் மாதா காட்சி இந்நாளில் நினைவுகூரப்படுகிறது.`,
        },
      ],
    },
    saints: {
      label: `வடவை மாதாவின் புனிதர்கள்`,
      title: `எங்கள் பங்கின் புனிதர்கள்`,
      intro: `எங்கள் சிற்றாலயத்தை நிறுவிய மறைப்பணியாளர் முதல், எங்கள் ஆலயத் தீர்த்தத்தில் திருமுழுக்குப் பெற்ற பொதுநிலைப் புனிதர் வரை — இந்த மண் புனித வாழ்வுகளால் ஆசி பெற்றுள்ளது. அவர்களின் திருவிழாக்கள் இன்றும் பாடலோடும் ஊர்வலத்தோடும் எங்கள் மக்களை ஒன்றுதிரட்டுகின்றன.`,
      readMore: `மேலும் படிக்க`,
      list: [
        {
          name: `புனித தேவசகாயம் பிள்ளை`,
          feast: `திருவிழா — ஜனவரி 14`,
          epithet: `இந்தியாவின் முதல் பொதுநிலைப் புனிதர்`,
          body: `1745-ல் இந்த ஆலயத்திலேயே திருமுழுக்குப் பெற்று, 1752-ல் தம் விசுவாசத்திற்காக இரத்தசாட்சியான இவர், 2022-ல் புனிதராக அறிவிக்கப்பட்டார் — இந்தியாவில் பிறந்து பீடத்திற்கு உயர்த்தப்பட்ட முதல் பொதுநிலைக் கத்தோலிக்கர் இவரே.`,
          image: `/images/saints/devasahayam-pillai.jpg`,
          href: `/saints/devasahayam-pillai`,
        },
        {
          name: `புனித ஜான் தெ பிரிட்டோ`,
          feast: `திருவிழா — பிப்ரவரி 4`,
          epithet: `அருளானந்தர் — எங்கள் சிற்றாலயத்தை நிறுவியவர்`,
          body: `தமிழில் அருளானந்தர் என அறியப்படும் இயேசு சபை அருட்தந்தை, 1685-ல் இங்கு எங்கள் முதல் ஓலைச் சிற்றாலயத்தை எழுப்பி, அதைத் திருக்குடும்பத்திற்கு அர்ப்பணித்தார்; 1693-ல் இரத்தசாட்சியாக உயிர்நீத்தார்.`,
          image: `/images/de-britto-grotto.jpg`,
          href: `/history`,
        },
      ],
    },
    saintDevasahayam: {
      back: `எங்கள் பங்கின் புனிதர்கள்`,
      label: `எங்கள் பங்கின் புனிதர்`,
      name: `புனித தேவசகாயம் பிள்ளை`,
      epithet: `தேவசகாயம் — “கடவுளே என் துணை”`,
      intro: `திருவிதாங்கூரின் உயர்குடி மகனும் அரசப் படை வீரருமான இவர், எங்கள் ஆலயத் தீர்த்தத்தில் திருமுழுக்குப் பெற்று, கிறிஸ்துவுக்காகத் தம் உயிரை ஒப்புக்கொடுத்தார். 2022-ல், இந்தியாவில் பிறந்து பீடத்திற்கு உயர்த்தப்பட்ட முதல் பொதுநிலைக் கத்தோலிக்கர் ஆனார் — அவரைப் பிணைத்திருந்த சங்கிலிகளை இன்றும் எங்கள் ஆலயம் பாதுகாத்து வருகிறது.`,
      feast: `திருவிழா — ஜனவரி 14`,
      canonised: `2022 மே 15 அன்று திருத்தந்தை பிரான்சிஸ் அவர்களால் புனிதராக அறிவிக்கப்பட்டார்`,
      facts: [
        {
          label: `பிறப்புப் பெயர்`,
          value: `நீலகண்ட பிள்ளை`,
        },
        {
          label: `பதவி`,
          value: `திருவிதாங்கூர் மன்னர் மார்த்தாண்ட வர்மாவின் அரசவையில் பிரபுவும் படை அதிகாரியும்`,
        },
        {
          label: `திருமுழுக்கு`,
          value: `1745-ல், அருட்தந்தை ஜான்-பாப்டிஸ்ட் புத்தாரி, இ.ச. அவர்களால் — வடக்கன்குளம் பங்கில்`,
        },
        {
          label: `இரத்தசாட்சியம்`,
          value: `1752 ஜனவரி 14, ஆரல்வாய்மொழியில் (காட்டாடிமலை), திருவிதாங்கூர்`,
        },
        {
          label: `அடக்கம்`,
          value: `புனித சவேரியார் ஆலயம், கோட்டாறு (நாகர்கோவில்)`,
        },
        {
          label: `புனிதர் பட்டம்`,
          value: `2022 மே 15, புனித பேதுரு சதுக்கம், ரோம் — திருத்தந்தை பிரான்சிஸ் அவர்களால்`,
        },
      ],
      quote: `ஓ இயேசுவே, உம்மீதுள்ள அன்பினாலேயே நான் துன்பப்படுகிறேன்.`,
      quoteAttribution: `— துன்புறுத்தியவர்களிடம் அந்த இரத்தசாட்சி கூறியது; Le Maduré (அகுஸ்த் ஜான், இ.ச., 1894) நூலில் பதிவாகியுள்ளது`,
      sections: [
        {
          heading: `மன்னரின் வீரர்`,
          body: `திருவிதாங்கூர் அரசில் ஓர் உயர்குடியில், நீலகண்ட பிள்ளை என்னும் பெயரோடு பிறந்தார். அறிவிலும் ஆளுமையிலும் சிறந்து விளங்கியதால், மார்த்தாண்ட வர்மா மன்னரின் அரசவையில் உயர் பதவிக்கு உயர்ந்தார்; அரசப் படைகளில் தலைமைப் பொறுப்பும், அரச கோட்டைகளுள் ஒன்றின் பொறுப்பும் அவரிடம் ஒப்படைக்கப்பட்டன. எனினும், பழைய வரலாற்று நூல்கள் கூறுவதுபோல், “கடவுள் அவரை உயர்ந்ததொரு விதிக்காகக் காத்துவைத்திருந்தார்” — தொடர்ந்து வந்த இடர்களும் இழப்புகளும், பதவியாலோ அரச ஆதரவாலோ ஆற்ற முடியாத துயரத்தில் அவரை ஆழ்த்தின.`,
        },
        {
          heading: `வாழ்வையே மாற்றிய நட்பு`,
          body: `தம் துயரத்தில், அரசப் பணியில் உடன் இருந்த அதிகாரியான யூஸ்தாகியுஸ் தெ லானோய் அவர்களிடம் மனம் திறந்தார் — திருவிதாங்கூரின் வலிமைமிக்க கோட்டைகளுள் ஒன்றின் பொறுப்பு ஒப்படைக்கப்பட்டிருந்த ஐரோப்பியத் தளபதி இவர்; மூல நூல்கள் கூறுவதுபடி “மிகச் சிறந்த கிறிஸ்தவர்.” ஒரே மெய்க் கடவுளுக்குப் பணி செய்வோருக்கு வாக்களிக்கப்பட்டுள்ள அழியா செல்வங்களைக் குறித்து தெ லானோய் அவரிடம் பேசினார். அந்த வார்த்தைகள், பழைய நூல் நினைவுகூர்வதுபோல், “வானகத்திலிருந்து வந்த ஆறுதல் தைலம் போல” அவரது உள்ளத்தில் இறங்கின. தம் பழைய வழிபாட்டின் பொய்மையை உணர்ந்த நீலகண்டர், திருமுழுக்குப் பெறத் தாம் ஆயத்தமாக இருப்பதாக அறிவித்தார்.`,
        },
        {
          heading: `எங்கள் தீர்த்தத்தில் திருமுழுக்கு`,
          body: `தெ லானோய், அப்போது வடக்கன்குளம் கிறிஸ்தவர்களின் பங்குத் தந்தையாக இருந்த இயேசு சபை அருட்தந்தை புத்தாரி அவர்களிடம் அவரை அனுப்பினார். தொடரவிருந்த புயலை முன்கூட்டியே கண்ட அந்தத் தந்தை, நிதானமாக இருக்குமாறு அறிவுறுத்தினார்: சொந்த உறவினர்களின் சீற்றம், அரசவையில் அனைத்து அதிகாரமும் கொண்டிருந்த பிராமணர்களின் பகைமை, அரசப் பதவியின் நிச்சயமான இழப்பு — இவை அனைத்தையும் அவர் எதிர்கொள்ள வேண்டியிருக்கும். ஆனால் அந்த இளைஞர், மெய்க் கடவுளைக் கண்டடைந்த பின், “இவ்வுலகின் எல்லா நலன்களையும், உயிரையுமே இழக்க நேர்ந்தாலும்” ஒருபோதும் அவரைக் கைவிடமாட்டேன் என்று பதிலளித்தார். 1745-ல் அருட்தந்தை புத்தாரி அவருக்குத் திருமுழுக்கு அளித்து, லாசர் என்னும் பெயருக்கு இணையான, “கடவுளே என் துணை” எனப் பொருள்படும் தேவசகாயம் என்னும் பெயரைச் சூட்டினார். விரைவில் அவரது மனைவியும், பின்னர் மற்ற உறவினரும், ஒரு காலத்தில் அவர் தலைமை தாங்கிய படையின் அதிகாரிகளும் திருமுழுக்குப் பெற்றனர்.`,
        },
        {
          heading: `எங்கள் ஆலயத்திற்கான மரத்தால் எழுந்த சச்சரவு`,
          body: `அந்நேரத்தில் அருட்தந்தை புத்தாரி வடக்கன்குளம் ஆலயத்தைக் கட்டிக் கொண்டிருந்தார். அதற்குத் தேவையான மரம் போதவில்லை; எனவே அரச காடுகளில் மரம் வெட்ட அரசின் அனுமதியைப் பெற்றுத் தருமாறு தேவசகாயத்தைக் கேட்டுக்கொண்டார். அரசவையில் பெரும் செல்வாக்குப் பெற்றிருந்த, தமது நெடுநாள் நண்பரான ஒரு பிராமணரைத் தேவசகாயம் அணுகினார் — ஆனால் அந்தப் பிராமணரோ, கிறிஸ்துவை மறுதலிக்குமாறு அவரிடம் கோருவதற்கான வாய்ப்பாகவே அந்தச் சந்திப்பை மாற்றிக்கொண்டார். அதைத் தொடர்ந்து எழுந்த விவாதத்தில் அவர் தோற்றார்; அவமானம் தாங்காமல், “உன் மதத்தை நீ துறக்கும்படி நான் செய்வேன்; இல்லையேல் அதற்கு உன் தலையால் விலை கொடுப்பாய்” எனச் சூளுரைத்தார். தேவசகாயமும் அதே தொனியில் பதிலளித்தார். இவ்வாறு — எங்கள் சொந்த ஆலயத்திற்கு மரம் தேடிச் சென்றதனாலேயே — அவர்மீது புயல் வெடித்தது.`,
        },
        {
          heading: `கைது, தண்டனை, தடுக்கப்பட்ட மரணம்`,
          body: `சூழ்ச்சியாலும் பழிச்சொல்லாலும் அந்தப் பிராமணர் மன்னரிடமிருந்து கைது ஆணையைப் பெற்றார். தேவசகாயம் எவ்வித எதிர்ப்புமின்றிச் சரணடைந்தார்; தம் நண்பர் தெ லானோய் அவர்களிடம் விடைபெற அனுமதி ஒன்றை மட்டுமே கேட்டார். “துணிவாய் இருங்கள்,” என்று அந்தத் தளபதி அவரிடம் கூறினார், “இயேசு கிறிஸ்துவின் தகுதிவாய்ந்த வீரர் நீங்கள் என்பதை நிரூபிக்கும் தருணம் வந்துவிட்டது.” ஒரு மறைப்பணியாளர் இரகசியமாக அழைத்து வரப்பட்டு அவரது பாவசங்கீர்த்தனத்தைக் கேட்டார். மன்னர்முன் நிறுத்தப்பட்டபோது கிறிஸ்துவை அறிக்கையிட்டார்; மரண தண்டனை விதிக்கப்பட்டது — ஆனால் சகுனம் பார்த்த சிலை அர்ச்சகர்கள், அத்தண்டனை நிறைவேற்றப்பட்டால் நாட்டிற்கே பேரிடர் வரும் என்று அறிவித்தனர்; மூடநம்பிக்கை கொண்ட மன்னர் ஆணையைத் திரும்பப் பெற்றார். இரத்தசாட்சி மகுடத்திற்குத் தம்மைக் கடவுள் தகுதியற்றவராகக் கருதிவிட்டாரோ என ஒரு கணம் அஞ்சிய அந்தப் புதிய விசுவாசிக்கு இது பெருந்துயரமாய் இருந்தது.`,
        },
        {
          heading: `அவமானப் பவனி, கொடிய அடி, கடல்நீர்`,
          body: `இப்போது அவரைக் கொல்ல மனமில்லாமல், ஆனால் அவரை மனமுறியச் செய்யத் துணிந்த மன்னர், கைகள் முதுகுக்குப் பின் கட்டப்பட்ட நிலையில் எருமையின் மீது ஏற்றப்பட்டு, நாட்டின் ஊர் ஊராக அவர் இழுத்துச் செல்லப்பட வேண்டும் என ஆணையிட்டார்; கூட்டம் அவரை அவமதிக்கத் தூண்டப்பட்டது. பழைய நூல் கூறுவதுபடி, தம் மீட்பர் அடைந்த அவமானங்களில் தாமும் பங்குபெறுவதாக எண்ணி அதை ஏற்றுக்கொண்டார். பின்பு துன்புறுத்தல் தொடங்கியது: உடல் முழுவதும் ஒரே காயமாகும் வரை முள் பதித்த கழிகளால் அடிக்கப்பட்டார்; அந்தக் காயங்களில் அரைத்த மிளகு தேய்க்கப்பட்டது. அவர் இதை மட்டுமே சொன்னார்: “ஓ இயேசுவே, உம்மீதுள்ள அன்பினாலேயே நான் துன்பப்படுகிறேன்” — சில வேளைகளில், “என் பாவங்களின் பரிகாரத்திற்காகவும்” எனச் சேர்த்துக்கொண்டார். அரிக்கும் அந்தத் தூளைத் துன்புறுத்துவோர் அவரது முகத்தில் தேய்த்தபோது, தம் கண்களையும் விட்டுவைக்க வேண்டாம் என்றார் — “என் இளமையில் அவை பாவத்தின் கருவிகளாக இருந்தன.” ஒருநாள், கடற்கரையின் கொதிக்கும் மணலில் நடத்திச் செல்லப்பட்டு கடுந்தாகத்தால் வாடியபோது நீர் கேட்டார்; காவலர்கள் கடல் நீரைக் கொடுத்தனர். நம்பிக்கையோடு அதைக் குடித்தார் — அது நன்னீராகவும் சிறிதும் கசப்பின்றியும் இருந்தது.`,
        },
        {
          heading: `மரத்தில் சங்கிலியால் பிணைக்கப்பட்ட ஏழு மாதங்கள்`,
          body: `திருவனந்தபுரத்திற்கு மீண்டும் கொண்டுவரப்பட்டு நிலவறைச் சிறையில் அடைக்கப்பட்டபோது, கிறிஸ்தவர்களும் ஆர்வம் மிக்க பிறசமயத்தாரும் — இவர்கள் அனைவருக்கும் அவர் தவறாமல் மறையுண்மைகளைக் கற்பித்தார் — திரளாகக் கூடினர். எனவே மன்னர், மூன்று லீக் தொலைவில் இருந்த ஒரு வனாந்தரத்திற்கு இரவோடு இரவாக அவரைக் கொண்டுசென்று, ஓர் அடி எடுத்து வைக்கவோ நிமிர்ந்து நிற்கவோ முடியாதபடி ஒரு மரத்தில் சங்கிலியால் பிணைத்து வைக்க ஆணையிட்டார். வெயிலுக்கும் புயலுக்கும் வெளிப்பட்டபடி ஏழு மாதங்கள் அவ்வாறே இருந்தார். இறுதியில் காவலர்கள் இரக்கம் கொண்டு சங்கிலியை நீட்டி, அவர் தலைக்கு மேலே ஒரு கீற்றுக் கூரையும் அமைத்தனர். அந்தச் சிறு சுதந்திரத்தைப் பயன்படுத்தி, தம் சிறையிடத்தைத் தெரிவித்து, “வலியோரின் அப்பத்தை” தமக்குக் கொண்டுவரும் ஓர் அருட்தந்தையை அனுப்புமாறு தெ லானோய் அவர்களுக்கு எழுதினார். தெ லானோய் உண்மையோடு அதை நிறைவேற்றினார்; அந்த வனாந்தரத்திற்கே நற்கருணை வந்தது. அவர் மறைந்திருந்த இடம் பற்றிய செய்தி பரவவே, அந்தப் பாழ்வெளி ஒரு திருப்பயணத் தலமாக மாறியது. கிறிஸ்தவர்களும் பிறசமயத்தாரும் நாள்தோறும் திரளாக வந்தனர்; அவரது செபத்தால் அற்புதங்கள் நிகழ்ந்ததாகச் செய்திகள் பரவின. பழைய நூல் கூறுவதுபடி, இது இரண்டு ஆண்டுகள் நீடித்தது.`,
        },
        {
          heading: `இறுதி இரவு`,
          body: `திரண்ட மக்களை அடக்க முடியாமல், மன்னர் இறுதியில் தன் மூடநம்பிக்கையைக் கைவிட்டு மரண தண்டனையை அறிவித்தார். நள்ளிரவில் வந்த வீரர்கள், மற்றொரு சிறைக்கு அவரை மாற்றிக் கொண்டுசெல்வதாக மட்டுமே கூறினர் — ஆனால் மேலிருந்து வந்த ஒளியால் அறிந்திருந்த அவர், “ஏன் மறைக்கிறீர்கள்? என்னை எங்கே அழைத்துச் செல்கிறீர்கள் என்பது எனக்குத் தெரியும்; தாமதிக்காமல் புறப்படுவோம்” என்றார். தண்டனை நிறைவேற்றப்படும் இடத்தை அடைந்ததும் சில கணங்கள் செபிக்க அவகாசம் கேட்டார்; பின்பு எழுந்து, “நான் என் கடமையைச் செய்துவிட்டேன்; இனி உங்கள் கடமையை நீங்கள் செய்யுங்கள்” என்றார். அவர்மீது மூன்று துப்பாக்கிக் குண்டுகள் சுடப்பட்டன. இயேசு, மரியா என்னும் இனிய திருப்பெயர்களை உச்சரித்தபடி அவர் சாய்ந்தார்; இரண்டாம் முறை சுடப்பட்ட குண்டுகள் அவரது இரத்தசாட்சியத்தை நிறைவு செய்தன. மூன்று ஆண்டுக் கொடுந்துன்பத்திற்குப் பின், இந்தக் கிறிஸ்தவ வீரர் இவ்வாறு 1752 ஜனவரி 14 அன்று ஆரல்வாய்மொழியில் உயிர்நீத்தார். அவரது உடல் கோட்டாற்றுக்குக் கொண்டுசெல்லப்பட்டு புனித சவேரியார் ஆலயத்தில் அடக்கம் செய்யப்பட்டது. 2022 மே 15 அன்று திருத்தந்தை பிரான்சிஸ் அவரைப் புனிதர் என அறிவித்தார்.`,
        },
      ],
      bond: {
        label: `எங்கள் பங்குடனான பிணைப்பு`,
        title: `வடக்கன்குளம் அவரைத் தன்னுடையவராகக் கொள்வது ஏன்`,
        intro: `தேவசகாயம் இந்தியா முழுவதும் வணங்கப்படுகிறார்; ஆயினும் அவரது வாழ்க்கை ஒவ்வொரு திருப்பத்திலும் எங்கள் பங்கினூடாகவே பின்னிப் பிணைந்துள்ளது. அவரை ஏற்றுக்கொண்ட திருமுழுக்குத் தொட்டி, அவர் கைது செய்யப்பட்டபோது கட்டப்பட்டுக் கொண்டிருந்த ஆலயம், இன்றும் இங்கேயே பாதுகாக்கப்படும் திருஎச்சங்கள் — அனைத்தும் வடக்கன்குளத்திற்கே உரியவை.`,
        pillars: [
          {
            heading: `எங்கள் தீர்த்தத்தில் திருமுழுக்கு, 1745`,
            body: `இங்கே வடக்கன்குளத்தில்தான், அப்போது பங்குத் தந்தையாக இருந்த இயேசு சபை அருட்தந்தை ஜான்-பாப்டிஸ்ட் புத்தாரி அவர்கள், நீலகண்ட பிள்ளையின் மீது திருமுழுக்கு நீரை வார்த்து, லாசர் என்னும் பெயருக்கு இணையான, “கடவுளே என் துணை” எனப் பொருள்படும் தேவசகாயம் என்னும் பெயரை அவருக்குச் சூட்டினார்கள்.`,
          },
          {
            heading: `எங்கள் ஆலயத்திற்கான மரத்திற்காகவே கைது`,
            body: `அருட்தந்தை புத்தாரி வடக்கன்குளம் ஆலயத்தைக் கட்டிக் கொண்டிருந்தார். அந்தக் கட்டிடத்திற்கே தேவைப்பட்ட மரத்தை அரச காடுகளிலிருந்து பெறத் தேவசகாயம் முயன்றபோதுதான், பின்னாளில் அவரை அழிக்கவிருந்த அந்தப் பிராமணர் அவரை எதிர்கொண்டார்; அத்துடன் அவரது சோதனை முழுவதும் தொடங்கியது. இரத்தசாட்சியமும் எங்கள் ஆலயமும் வேரிலேயே பின்னிப் பிணைந்துள்ளன.`,
          },
          {
            heading: `அவரது சங்கிலிகள் இங்கேயே பாதுகாக்கப்படுகின்றன`,
            body: `1752-ல் அவர் உயிர்நீத்தது முதல் இன்றுவரை, இரத்தசாட்சியத்தின்போது அவர் அணிந்திருந்த ஆடையின் ஒரு பகுதியையும், அவரைப் பிணைத்திருந்த அதே சங்கிலிகளையும் வடக்கன்குளம் ஆலயம் பொக்கிஷமாய்ப் பேணி வருகிறது. (அகுஸ்த் ஜான், இ.ச., Le Maduré, 1894.)`,
          },
          {
            heading: `இரண்டு இயேசு சபை அருட்தந்தையர், ஒரே ஆலயம்`,
            body: `அவருக்குத் திருமுழுக்கு அளித்த அருட்தந்தை புத்தாரி (1707–1757) இந்த ஆலயத்தைக் கட்டத் தொடங்கினார்; வடக்கன்குளத்தில் இன்றும் “ஆசீர்வாதத்தோடு” நினைவுகூரப்படுகிறார். சிக்கலில் தவித்த மற்றொரு மறைப்பணித் தலமான ஆவூரைச் சீர்படுத்த அருட்தந்தை புத்தாரி அனுப்பப்பட்ட பின், அவர் தொடங்கிய ஆலயத்தை அருட்தந்தை கிளெமெந்த் தோமஸினி நிறைவு செய்தார் — மக்கள் அவரை எத்துணை நேசித்தார்கள் என்றால், தங்கள் குழந்தைகளுக்கு அவரது பெயரையே சூட்டினர்; வறட்சிக் காலத்தில் பிறசமயத்தாரும் அவரை மன்றாடி அழைத்தனர்.`,
          },
        ],
      },
      sources: {
        heading: `மூலங்கள்`,
        body: `முக்கியமாக அகுஸ்த் ஜான், இ.ச., Le Maduré: l'ancienne et la nouvelle mission, தொகுதி I (பாரிஸ், 1894), பக். 196–203; மற்றும் ஜோசப் பெர்த்ரான், இ.ச., La Mission du Maduré, தொகுதி IV (பாரிஸ், 1847), பக். 385–420-ல் உள்ள அருட்தந்தை ஜெ.-பா. புத்தாரியின் வாழ்க்கைக் குறிப்பு (Notice sur le P. J.-B. Bouttari) ஆகியவற்றிலிருந்து இது தொகுக்கப்பட்டது. இவ்விரு நூல்களும் பங்கின் மதுரை மறைப்பணி நூலகத்தில் பாதுகாக்கப்படுகின்றன.`,
      },
    },
    saintDeBritto: {
      back: `எங்கள் பங்கின் புனிதர்கள்`,
      label: `எங்கள் பங்கின் நிறுவனர்`,
      name: `புனித ஜான் தெ பிரிட்டோ`,
      epithet: `அருளானந்தர் — “அருளின் ஆனந்தம்”`,
      intro: `1685-இல் வடக்கன்குளத்தில் திருக்குடும்பத்திற்கு உரிய முதல் ஓலைச் சிற்றாலயத்தை எழுப்பிய போர்த்துகீசிய இயேசு சபை மறைப்பணியாளர்; இந்தத் திருத்தலம் முழுவதும் அந்த நிறுவுதலிலிருந்தே வளர்ந்து வந்துள்ளது. 1693-இல் ஓரியூரில் விசுவாசத்திற்காக இரத்தசாட்சியாக மரித்த இவர், தமிழகமெங்கும் அருளானந்தர் என வணங்கப்படுகிறார்.`,
      feast: `திருவிழா — பிப்ரவரி 4`,
      canonised: `1947-இல் திருத்தந்தை பன்னிரண்டாம் பயஸ் அவர்களால் புனிதராக அறிவிக்கப்பட்டார்`,
      facts: [
        {
          label: `இயற்பெயர்`,
          value: `ஜோவான் தெ பிரிட்டோ — 1647 மார்ச் 1, போர்த்துகல் நாட்டு லிஸ்பனில் பிறந்தார்`,
        },
        {
          label: `துறவற சபை`,
          value: `இயேசு சபை — 1662-இல் இணைந்தார்`,
        },
        {
          label: `மறைப்பணி`,
          value: `தென்னிந்திய மதுரை மறைப்பணி, 1673 முதல்; 1685–86-இல் பணித் தலைவர்`,
        },
        {
          label: `இந்தப் பங்கை நிறுவினார்`,
          value: `1685 — வடக்கன்குளத்தில் திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்ட ஓலைச் சிற்றாலயம்; ஏறத்தாழ இருநூறு பேருக்குத் திருமுழுக்கு`,
        },
        {
          label: `இரத்தசாட்சி`,
          value: `1693 பிப்ரவரி 4, ஓரியூரில் — விசுவாசத்திற்காகத் தலை துண்டிக்கப்பட்டார்`,
        },
        {
          label: `புனிதர் பட்டம்`,
          value: `1947 — திருத்தந்தை பன்னிரண்டாம் பயஸ் அவர்களால் (1853-இல் அருளாளர் பட்டம்)`,
        },
      ],
      quote: `உண்மைக் கடவுளின் சட்டத்தைப் போதிக்கிறேன் என்பதே என்மேல் சுமத்தப்பட்ட குற்றம். இத்தகைய அழகிய நோக்கத்திற்காகத் துன்பப்பட்டு மரிப்பது எத்துணை மகிமை!`,
      quoteAttribution: `— தமது மரணத்திற்கு முந்தைய இரவில், ஓரியூர் சிறையில் தாமே எழுதியது, 1693 பிப்ரவரி 3`,
      sections: [
        {
          heading: `லிஸ்பன் நகரப் பிரபு`,
          body: `ஜோவான் தெ பிரிட்டோ 1647 மார்ச் 1-ஆம் நாள் லிஸ்பனில், போர்த்துகீசிய அரசவையின் பிரபுக் குடும்பம் ஒன்றில் பிறந்தார்; சிறுவனாக இருந்தபோது, பின்னாளில் அரசரான இரண்டாம் பேத்ரோவின் தோழராக விளங்கினார். பதினைந்தாம் வயதில் அவ்வுலகம் தந்த எதிர்காலம் அனைத்தையும் துறந்து இயேசு சபையில் இணைந்தார்; காலப்போக்கில், அச்சபை அப்போது அறிந்திருந்த மறைப்பணிக் களங்களுள் மிகக் கடினமானதும் மிகத் தொலைவிலுள்ளதுமான இந்திய மறைப்பணிக்குத் தம்மை அனுப்பும்படி கேட்டுக்கொண்டார்.`,
        },
        {
          heading: `துறவி மறைப்பணியாளர்`,
          body: `தென்னிந்தியாவில் ரொபேர்ட்டோ தெ நொபிலியின் வழிமுறையை அவரும் ஏற்றுக்கொண்டார்: தமிழ் மக்களை அணுகும் பொருட்டு ஐரோப்பியரின் உடையையும் உணவையும் துறந்து, புலால் உண்ணாமல், எவ்வித வசதியும் இன்றி, ஊர் ஊராய்க் காலால் நடந்து செல்லும் பண்டாரசாமியாக — சந்நியாசியாக — வாழ்ந்தார். அயல்நாட்டு உடை அணிந்த ஓர் அயலவர் ஒருபோதும் சென்றிருக்க இயலாத இடங்களுக்கெல்லாம் இவ்வாழ்க்கை நற்செய்தியைக் கொண்டு சேர்த்தது. அவர் பணியாற்றிய மதுரை மறைப்பணி, உள்நாட்டின் பரந்த மதுரை அரசு முழுவதும் பரவி, இத்தென்னாடு வரையிலும் நீண்டிருந்தது.`,
        },
        {
          heading: `இந்தப் பங்கை நிறுவினார், 1685`,
          body: `1685-இல், மதுரை மறைப்பணியின் தலைவராக இருந்தபோது, தெ பிரிட்டோ வடக்கன்குளக் காட்டுவெளிக்கு வந்தார்; ஒரு கிறிஸ்தவப் பெண் அங்கே ஏற்கெனவே ஒரு குருசடியை எழுப்பியிருந்தார். அங்கு ஓலையால் வேயப்பட்ட ஒரு சிற்றாலயத்தை — “கிளைகளால் அமைந்த குடிசை” ஒன்றை — கட்டி, திருக்குடும்பத்திற்கு அர்ப்பணித்து, ஏறத்தாழ இருநூறு பேருக்குத் திருமுழுக்கு அளித்தார். பின்வந்த அனைத்திற்கும் விதை அச்சிற்றாலயமே: 1752-இன் கல் ஆலயம், 1872-இன் பெரிய இரட்டை நடை ஆலயம், 1993-இல் அறிவிக்கப்பட்ட திருத்தலம். சின்ன ரோமாபுரியின் ஒவ்வொரு கல்லும் அவரது குடிசையிலிருந்தே தொடங்குகிறது. இவ்வூரின் கிறிஸ்தவம் “பதினேழாம் நூற்றாண்டின் இறுதி ஆண்டுகளில்” தொடங்கியது என்று காலனிய ஆட்சிக்கால மாவட்டக் குறிப்பேடு தனித்தே குறிப்பிடுகிறது.`,
        },
        {
          heading: `திரும்ப அழைக்கப்பட்டு, மீண்டும் வந்தார்`,
          body: `ஏற்கெனவே ஒருமுறை கைது செய்யப்பட்டு, இறந்துவிட்டார் எனக் கருதி விடப்பட்டிருந்த தெ பிரிட்டோ, 1687-இல் போர்த்துகலுக்குத் திருப்பி அனுப்பப்பட்டார்; அரசவை அவரைப் பெருமையுடன் வரவேற்று, அங்கேயே தங்கிவிடும்படி மன்றாடியது. அவர் மறுத்தார். மறைப்பணிக்குத் திரும்புவது கிட்டத்தட்ட மரணத்திலேயே முடியும் என்று அறிந்திருந்தும், தம் தமிழ்க் கிறிஸ்தவர்களிடமே திரும்பிச் செல்ல அனுமதி கேட்டார்; 1691-இல் மீண்டும் மறைப்பணிக்கு வந்து சேர்ந்தார்.`,
        },
        {
          heading: `ஓரியூரில் இரத்தசாட்சியம்`,
          body: `இரண்டு ஆண்டுகளுக்குள் மீண்டும் பிடிபட்டார். ஓரியூர் சிறையில் அடைக்கப்பட்டிருந்தபோது, மரணத்திற்கு முந்தைய இரவில் அமைதியான மகிழ்ச்சி ததும்பும் இறுதிக் கடிதம் ஒன்றை எழுதினார். 1693 பிப்ரவரி 4-ஆம் நாள் விசுவாசத்திற்காகத் தலை துண்டிக்கப்பட்டார். அவரது உடல் உடனடியாகவே வணக்கத்திற்கு உரியதாயிற்று; அவர் இரத்தம் சிந்திய அந்த நிலத்தில் போர்த்துகல் மன்னர் ஓர் ஆலயத்தை எழுப்பினார்; இன்றளவும் திருப்பயணிகள் ஓரியூருக்குச் செல்கின்றனர். 1853-இல் அருளாளராகவும், 1947-இல் திருத்தந்தை பன்னிரண்டாம் பயஸ் அவர்களால் புனிதராகவும் அறிவிக்கப்பட்டார். தமிழ்த் திருச்சபைக்கு அவர் அருளானந்தர் — “அருளின் ஆனந்தம்”.`,
        },
      ],
      bond: {
        label: `எங்கள் பங்குடனான பிணைப்பு`,
        title: `இந்தத் திருத்தலம் அவரை நிறுவனராகக் கொள்வது ஏன்`,
        intro: `புனித ஜான் தெ பிரிட்டோ தமிழகமெங்கும் போற்றப்படுகிறார்; ஆனால் வடக்கன்குளத்தில் அவர் வணங்கப்படும் புனிதர் மட்டுமல்ல — நிறுவனர். இப்பங்கு அவரது கைகளால் தொடங்குகிறது.`,
        pillars: [
          {
            heading: `முதல் சிற்றாலயத்தை எழுப்பினார், 1685`,
            body: `1685-இல் அவர் இங்கு எழுப்பிய திருக்குடும்ப ஓலைச் சிற்றாலயமே வடக்கன்குளத்தின் முதல் ஆலயம். பங்கும், திருத்தலமும், சின்ன ரோமாபுரியின் முழு வரலாறும் அதிலிருந்தே தொடங்குகின்றன.`,
          },
          {
            heading: `அவரது குடிசையிலிருந்து சின்ன ரோமாபுரி வரை`,
            body: `கிளைகளால் அமைந்த அவரது குடிசையிலிருந்து 1752-இன் கல் ஆலயம், 1872-இல் ஆசீர்வதிக்கப்பட்ட பெரிய இரட்டை நடை ஆலயம், 1993-இல் அறிவிக்கப்பட்ட திருத்தலம் வரை அறுபடாத ஒரு வரிசை நீள்கிறது. ஒரே நிலத்தில் நான்கு ஆலயங்கள் — அவற்றுள் முதலாவது அவருடையதே.`,
          },
          {
            heading: `இங்கே அருளானந்தராக வணங்கப்படுகிறார்`,
            body: `தாம் தொடங்கிய பங்கிலேயே இந்த இரத்தசாட்சி-நிறுவனர் பக்தியுடன் போற்றப்படுகிறார் — திருத்தல வளாகத்திலுள்ள ஜான் தெ பிரிட்டோ குகையிலும் அவருக்கு வணக்கம் உண்டு; அங்கே புனித மிக்கேல், புனித ரபேல் ஆகிய அதிதூதர்களுக்கு நடுவே அருளானந்தராக நிற்கிறார்.`,
          },
        ],
      },
      sources: {
        heading: `ஆதாரங்கள்`,
        body: `ஜூசெப்பே போயெரோ, இ.ச., Vita del beato Giovanni de Britto (ரோம்: La Civiltà Cattolica, 1853); 1693 பிப்ரவரி 3-இல் தெ பிரிட்டோ தாமே சிறையிலிருந்து எழுதிய கடிதம் — ஜோசப் பெர்த்ரான், இ.ச., La Mission du Maduré, தொகுதி III-இல் அச்சிடப்பட்டது; F. W. Faber, The Lives of… the Ven. John de Britto (லண்டன், 1851) ஆகியவற்றிலிருந்து தொகுக்கப்பட்டது. திருத்தலத்தின் ஆதாரங்கள் பக்கத்தைக் காண்க.`,
      },
    },
    gallery: {
      label: `காட்சிப் பயணம்`,
      title: `அருளின் காட்சிகள்`,
      intro: `ஒளியும் பக்தியும் அமைதியும் நிறைந்த புகைப்படங்கள் — எங்கள் பங்கிலும் அதைச் சுற்றியும் பதிவு செய்யப்பட்ட தருணங்கள்.`,
    },
    architecture: {
      label: `ஆலயம்`,
      title: `சின்ன ரோமின் கட்டிடக்கலை`,
      intro: `கவராயம் திறந்தாற்போல் விரிந்து, ஒரே பலிபீடத்தில் சந்திக்கும் இரு நடைகள். சுண்ணாம்பிலும் பதனீரிலும் எழுப்பப்பட்ட இருபத்து நான்கு வளைவுகள் — இரும்பே இல்லாத ஒரு கூரையைத் தாங்கி நிற்கின்றன. தொண்ணூற்றிரண்டு அடி உயரமான இரட்டைக் கோபுரங்கள் — அவற்றால்தான் இவ்வூருக்கே ஒரு புதிய பெயர் கிடைத்தது.`,
      heroAlt: `தெளிந்த வானின் பின்னணியில், வடக்கன்குளம் திருக்குடும்ப ஆலயத்தின் வெண்ணிறக் கோத்திக் முகப்பு — இரட்டை எண்கோணக் கோபுரங்களும் சிகரங்கள் நிறைந்த கூரையோரமும்`,
      peel: {
        label: `ஆலயத்தின் காட்சிப்படம்`,
        title: `சின்ன ரோமாபுரி எழுகிறது`,
        sub: `மெதுவாக உருட்டுங்கள். 1685-இல் தனித்து நின்ற ஒரு குருசடியிலிருந்து ஆலயம் உங்கள் கண்முன்னே எழுகிறது — சிற்றாலயம், கல் ஆலயம், அடிக்கல், வளைவுகள், கோபுரங்கள் — இறுதியில் 1872-இன் கதவுகள் திறக்க, உள்ளே அன்னை எழுந்தருளியுள்ளார்.`,
        hint: `உருட்டி ஆலயத்தை எழுப்புங்கள்`,
        chapters: [
          {
            y: `1685`,
            t: `மணலில் ஒரு சிலுவை`,
            b: `சாந்தாயி அம்மையாரின் குருசடிக்கு அருகில், புனித அருளானந்தர் ஓலை வேய்ந்த ஒரு சிற்றாலயத்தை ஆசீர்வதிக்கிறார்; இருநூறு பேர் திருமுழுக்குப் பெறுகின்றனர்.`,
          },
          {
            y: `1752`,
            t: `கல் ஆலயம்`,
            b: `அருட்தந்தை புத்தாரியின் சிலுவை வடிவ ஆலயம் வெள்ளையடித்த கல்லில் எழுகிறது — 1803-இல் கண்ணீர் சிந்திய திருவுருவமும், அப்புதுமையை ஊருக்கு அறிவித்த மணியும் இந்த ஆலயத்தினுடையவையே.`,
          },
          {
            y: `1855`,
            t: `அடிக்கல்`,
            b: `ஆயர் கனோஸ் அடிக்கல்லை ஆசீர்வதிக்கிறார்: Templum sit duplex, ara sed una — ஆலயம் இரட்டையாக இருக்கட்டும், பலிபீடம் ஒன்றே.`,
          },
          {
            y: `1855–1872`,
            t: `எழுந்த பதினேழு ஆண்டுகள்`,
            b: `அருட்தந்தை கிரகோயர் வழிநடத்த, சகோதரர் பெர்கந்தால் பொறியியலை வகுக்க — சுண்ணாம்பிலும் செங்கல்லிலும் பனங்கள்ளிலும் இருபத்து நான்கு வளைவுகள்; சிமெண்டோ இரும்போ இல்லை.`,
          },
          {
            y: `1872`,
            t: `சின்ன ரோமாபுரி`,
            b: `சாரங்கள் விலகுகின்றன: தொண்ணூற்றிரண்டு அடி இரட்டைக் கோபுரங்கள், பதினாறு சிகரங்கள் — இந்த ஆலயத்தால் ஊருக்கே புதுப் பெயர்.`,
          },
          {
            y: `இன்று`,
            t: `திறக்கும் ஆலயம்`,
            b: `கல் வாயில்கள் விரிகின்றன — உள்ளே, தாவரச் சாயங்களால் தீட்டப்பட்ட வளைவுகளும் தூண்களும் 150 ஆண்டுகளாக மங்காமல் நிற்கின்றன.`,
          },
          {
            y: `வடவை மாதா`,
            t: `ஒரே பலிபீடம், ஒரே அன்னை`,
            b: `ஒரே பலிபீடத்தில் 1803-ல் கண்ணீர் சிந்திய அன்னையின் திருவுருவம் ஒளிர்கிறது — ஊர் என்றென்றும் திருத்தலமாயிற்று.`,
          },
        ],
      },
      overtureLabel: `எண்ணம்`,
      overtureLead: `விசுவாசப் பிரமாணத்தைப் போலப் படிக்கக்கூடிய ஆலயம் இது — கல்லில் அமைந்த ஒவ்வொரு எண்ணும் விசுவாசத்தின் ஒரு உண்மையைச் சுட்டி நிற்கும் கட்டிடம்.`,
      overtureP1: `வடக்கன்குளத்தின் மூன்றாவதும் மிகப் பெரியதுமான ஆலயத்தை எழுப்ப இயேசு சபையினர் புறப்பட்டபோது, அருட்தந்தை ஜோசப் கிரகோயர் அதற்கு வேறெங்கும் அரிதாகவே காணக் கிடைக்கும் ஒரு வடிவம் தந்தார்: திறந்த கவராயம் போன்ற ஒரே கட்டிடம் — வாசல்களில் அகன்று விரிந்து, கிழக்கு நோக்கிச் செல்லச் செல்ல நெருங்கி, ஒரே பலிபீடத்தில் சந்திக்கும் இரு நடைகள்.`,
      overtureP2: `இதைக் கட்டி முடிக்கப் பதினேழு ஆண்டுகள் சென்றன. எழுந்த கட்டிடம் எந்த அளவுக்கு வழக்கத்திற்கு மாறானது என்றால், “ஒருவேளை உலகிலேயே இணையற்றது” என்று ஓர் இயேசு சபை வரலாற்றாசிரியர் அத்திட்டத்தைக் குறிப்பிட்டார். அன்று முதல் இவ்வூர் சின்ன ரோமாபுரி.`,
      numbers: [
        {
          v: `17`,
          k: `ஆண்டு உழைப்பு`,
        },
        {
          v: `24`,
          k: `வளைவுகள்`,
        },
        {
          v: `92`,
          k: `அடி உயரக் கோபுரம்`,
        },
        {
          v: `5`,
          k: `வாசல்கள்`,
        },
        {
          v: `0`,
          k: `கூரையில் இரும்பு`,
        },
        {
          v: `1`,
          k: `பலிபீடம்`,
        },
      ],
      churchesLabel: `இதற்கு முன்`,
      churchesTitle: `ஒரே நிலம், மூன்று ஆலயங்கள்`,
      churchesBody: `1872-இன் மாபெரும் ஆலயம் இந்நிலத்தில் எழுந்த மூன்றாவது ஆலயம். முதல் இரண்டு ஆலயங்களும், அவற்றைக் கட்டிய மக்களுக்கே போதாமல் போயின.`,
      churches: [
        {
          year: `1685`,
          title: `ஓலை வேய்ந்த சிற்றாலயம்`,
          body: `சாந்தாயி அம்மையாரின் குருசடிக்கு அருகில், புனித அருளானந்தர் ஓலை வேய்ந்த ஒரு சிற்றாலயத்தை ஆசீர்வதிக்கிறார்; ஏறத்தாழ இருநூறு பேர் திருமுழுக்குப் பெறுகிறார்கள்.`,
        },
        {
          year: `1752`,
          title: `கல் ஆலயம்`,
          body: `அருட்தந்தை புத்தாரி தொடங்கி, அருட்தந்தை தோமஸினி பெருங்குடியின் அகன்ற செங்கற்களால் முடித்த சிலுவை வடிவக் கல் ஆலயம். 1803-இல் கண்ணீர் சிந்திய திருவுருவமும், வந்து காணுமாறு ஊரை அழைத்த மணியும் இந்த ஆலயத்தினுடையவையே.`,
        },
        {
          year: `1872`,
          title: `மாபெரும் ஆலயம்`,
          body: `1855-இல் ஆயர் கனோஸ் அடிக்கல்லை ஆசீர்வதிக்கிறார். பதினேழு ஆண்டுகளுக்குப் பின் அவரே மீண்டும் வந்து, இன்று நிற்கும் இக்கட்டிடத்தை அர்ப்பணிக்கும் திருப்பலியை நிறைவேற்றுகிறார்.`,
        },
      ],
      churchesCaption: `பங்கின் பழைய புகைப்படம் ஒன்றில் ஆலயம்`,
      planDrawTitle: `திருக்குடும்ப ஆலயத்தின் தரை வரைபடம்: ஒரே பீடப்பகுதி, ஒன்றை நோக்கி நெருங்கும் இரு நடைகள், ஐந்து வாசல்கள்`,
      planNote: `அ. சிவசுப்பிரமணியன், “கிறித்தவமும் சாதியும்” (2001) நூலின் வரைபடம் 5-இலிருந்து மீள்வரையப்பட்டது — அச்சில் உள்ள இவ்வாலயத்தின் ஒரே அளவீட்டு வரைபடம்.`,
      motto: `TEMPLVM SIT DVPLEX, ARA SED VNA;
FIDES VNA SIT, VNAQVE MENS.`,
      mottoTr: `ஆலயம் இரட்டையாக இருக்கட்டும், ஆனால் பலிபீடம் ஒன்றே; விசுவாசம் ஒன்றாக, மனமும் ஒன்றாக இருக்கட்டும்.`,
      mottoCaption: `1855 ஆகஸ்ட் 9-இல் ஆசீர்வதிக்கப்பட்ட அடிக்கல்லில் பொறிக்கப்பட்டது`,
      craftLabel: `கட்டமைப்பு`,
      craftTitle: `இரும்பு ஆணி ஒன்று கூட இல்லை`,
      craftBody: `உட்புறத்தில் இருபத்து நான்கு வளைவுகள்; அவற்றுள் பன்னிரண்டு பலிபீடத்திற்கு மேல் ஒரே மகுடமாய்ச் சேர்கின்றன. ஒன்றைக்கூடச் சிமெண்டோ, இரும்போ, மர உத்திரமோ தாங்கவில்லை — சுண்ணாம்புச் சாந்தில் எழுப்பப்பட்டு, நூற்றைம்பது ஆண்டுகளாகத் தாமே தாங்கி நிற்கின்றன. இந்தப் பொறியியல் நுட்பம், இயேசு சபையின் துணைச் சகோதரரான ஜோசப் பெர்கந்தால் அவர்களுடையது — இவ்வாலயம் பற்றிய குறிப்புகள் எவையும் அவர் பெயரைச் சொல்வதே இல்லை எனலாம்.`,
      craftNegatives: [
        {
          t: `சிமெண்ட் இல்லை`,
          d: `முழுவதும் சுண்ணாம்புச் சாந்து`,
        },
        {
          t: `இரும்பு இல்லை`,
          d: `வளைவுகளில் ஒரு கம்பி கூட இல்லை`,
        },
        {
          t: `மரம் இல்லை`,
          d: `உத்திரமோ, தூணோ, சட்டமோ இல்லை`,
        },
      ],
      recipeTitle: `சாந்தில் கலந்தவை`,
      recipe: [
        {
          ta: `பதனீர்`,
          tr: `padaneer`,
          gloss: `பனஞ்சாறு`,
          d: `புளிக்கும் முன் பனையிலிருந்து இறக்கப்பட்டது`,
        },
        {
          ta: `சுண்ணாம்பு`,
          tr: `chunnambu`,
          gloss: `சுண்ணாம்பு`,
          d: `சுட்ட சங்கும் சுண்ணாம்புக் கல்லும் — பிணைப்பான்`,
        },
        {
          ta: `கடுக்காய்`,
          tr: `kadukkai`,
          gloss: `கடுக்காய்`,
          d: `Terminalia chebula — சாந்தை இறுகச் செய்யும் டானின் சத்து`,
        },
        {
          ta: `முட்டை`,
          tr: `muttai`,
          gloss: `முட்டை`,
          d: `கல் போல் இறுகும் சாந்துக்காகக் கலக்கப்பட்டது`,
        },
      ],
      recipeNote: `பங்கு தானே தரும் செய்முறை இது. ஆங்கிலப் பங்கு வரலாறு “கள்” (புளித்த சாறு) என்கிறது; தமிழ் ஆதாரங்கள் “பதனீர்” என்கின்றன. சுண்ணாம்பு, கடுக்காய், முட்டை — இவற்றில் அனைத்து ஆதாரங்களும் ஒன்றுபடுகின்றன.`,
      craftCaption: `பீடப்பகுதிக்கு மேலுள்ள வளைவு — இரும்போ, உத்திரமோ, சட்டமோ இன்றி எழுப்பப்பட்டது`,
      creedLabel: `பொருள்`,
      creedTitle: `விசுவாசப் பிரமாணமாய் நிற்கும் ஆலயம்`,
      creedBody: `தன் கட்டிடத்தையே எண்களாகப் படிக்கிறது இப்பங்கு. இங்கு எதுவும் வெறும் கட்டமைப்பு அல்ல — ஒவ்வொரு எண்ணும் ஒரு மறையுண்மை. வரைபடத்தையே ஒரு விசுவாசப் பிரமாணமாய்ப் படியுங்கள் — ஒரு வரியைத் தொட்டால் அது வரைபடத்தில் ஒளிரும் — பின், பலிபீடத்தில் காத்திருக்கும் எண்களைப் பங்கின் சொந்தக் கையெழுத்திலேயே படியுங்கள்.`,
      creedReadTitle: `வரைபடம், ஒரு விசுவாசப் பிரமாணமாய்`,
      creedReadHint: `ஒரு வரியைத் தொட்டு வரைபடத்தில் ஒளியேற்றுங்கள்.`,
      creedReadings: [
        {
          n: `5`,
          anchor: `doors`,
          means: `ஐந்து காயங்கள்`,
          what: `வரைபடத்தின் ஐந்து வாசல்கள்`,
        },
        {
          n: `12`,
          anchor: `piers`,
          means: `பன்னிரு சீடர்கள்`,
          what: `இரு நடைகளிலும் நிற்கும் பன்னிரு தூண்கள்`,
        },
        {
          n: `3`,
          anchor: `arrows`,
          means: `மூன்று ஆணிகள்`,
          what: `மூன்று நுழைவுத் திசைகள் — ஒவ்வொன்றும் சிலுவையை நோக்கி`,
        },
        {
          n: `1`,
          anchor: `altar`,
          means: `ஒரே ஆண்டவர்`,
          what: `இரு நடைகளும் சந்திக்கும் ஒரே பலிபீடம்`,
        },
      ],
      creedAltarTitle: `பீடத்தில் காத்திருப்பவை`,
      creedAltarHint: `ஒரு வரியைத் தொட்டு பீடத்தில் ஒளியேற்றுங்கள்.`,
      altarpieceTitle: `பீடத்தின் அடையாள வரைவு`,
      altarpieceNote: `அடையாள விளக்கம் — அளவெடுத்து வரைந்த படம் அல்ல`,
      creed: [
        {
          n: `14`,
          anchor: `steps`,
          what: `சிலுவைக்கு ஏறும் படிகள்`,
          means: `பதினான்கு ஸ்தலங்கள்`,
        },
        {
          n: `5`,
          anchor: `upperArches`,
          what: `பீடத்தின் மேல் வரிசை வளைவுகள்`,
          means: `ஐந்து காயங்கள், மீண்டும் ஒருமுறை`,
        },
        {
          n: `9`,
          anchor: `flowers`,
          what: `பூங்கொத்துச் சிலைகள்`,
          means: `ஒன்பது கூட்டச் சம்மனசுகள்`,
        },
        {
          n: `4`,
          anchor: `lowerArches`,
          what: `கீழ் வரிசை வளைவுகள்`,
          means: `மத்தேயு, மாற்கு, லூக்கா, யோவான்`,
        },
        {
          n: `3`,
          anchor: `trinity`,
          what: `எல்லாவற்றின் நடுவில்`,
          means: `தந்தை, மகன், தூய ஆவி`,
        },
      ],
      creedNoteCaption: `பங்கின் சொந்தக் குறிப்பு — “திருக்குடும்ப ஆலயம்: கட்டிடத்தின் தத்துவம்”`,
      creedFootnote: `இக்குறிப்பில் கையொப்பமும் இல்லை, தேதியும் இல்லை. பங்கு தன் ஆலயத்தை எப்படிப் படிக்கிறது என்பதை இது சொல்கிறது — 1855-இல் கட்டியவர்களின் நோக்கம் இதுவே என்பதற்கு ஆவணம் அல்ல.`,
      towersLabel: `ஊரின் வான்கோடு`,
      towersTitle: `சின்ன ரோமாபுரி என்று ஏன் அழைக்கிறார்கள்`,
      towersBody: `முகப்பிற்கு மேல் 92 அடி உயரத்தில் இரு வெண்கோபுரங்கள் — அடி முதல் சிகரம் வரை எண்கோண வடிவம்; கூரையைச் சுற்றி 16 சிறு கோபுரங்கள். ஒவ்வொரு கோபுரத்திலும், 1861-இல் பிரான்சில் வார்க்கப்பட்டுக் கடல் கடந்து வந்த இரட்டை மணிகளில் ஒன்று தொங்குகிறது. இக்கோபுரங்களை முன்னிட்டே, 1926-இல், தூத்துக்குடியின் முதல் ஆயர் இவ்வூருக்குச் சின்ன ரோமாபுரி எனப் பெயரிட்டார்கள் — இன்றும் இவ்வூர் அப்பெயராலேயே அழைக்கப்படுகிறது.`,
      towerStats: [
        {
          v: `92 அடி`,
          k: `இரட்டை எண்கோணக் கோபுரங்கள்`,
        },
        {
          v: `16`,
          k: `சிறு கோபுரங்கள்`,
        },
        {
          v: `1861`,
          k: `பிரெஞ்சு மணிகள் — கோபுரத்திற்கு ஒன்று`,
        },
      ],
      towersCaption: `இரட்டைக் கோபுரங்களும், சிகரங்கள் சூழ்ந்த கூரையும்`,
      bellsLabel: `ஆலய மணிகள்`,
      bellsTitle: `பிரான்சின் இரட்டை மணிகள்`,
      bellsBody: `இரு கோபுரங்களில் ஒவ்வொன்றிலும் உயரத்தில் ஒரு வெண்கல மணி தொங்குகிறது — 1861-இல் பிரான்சில் வார்க்கப்பட்டுக் கடல் கடந்து வடக்கன்குளம் வந்தவை. நூற்றைம்பது ஆண்டுகளுக்கும் மேலாக அவை பங்கு மக்களைச் செபத்திற்கு அழைத்து வருகின்றன.`,
      bellsBeats: [
        {
          year: `1861`,
          title: `பிரான்சில் வார்ப்பு`,
          body: `காசிமிர் கிரகோயர் என்னும் பிரெஞ்சு அறக்கொடையாளரே இம்மணிகளை ஆலயத்திற்கு அளித்தார் — எல்லாக் குறிப்புகளின்படியும் அவர் பங்குத் தந்தை ஜோசப் கிரகோயர் அவர்களின் உறவினர். கோபுர மணியின் வெண்கலத்தில் இன்றும் அவரது பெயர் பொறிக்கப்பட்டுள்ளது: “Donateur Casimir Grégoire”.`,
        },
        {
          year: `கடல் வழி`,
          title: `நீண்ட பயணம்`,
          body: `மரப் பெட்டிகளில் அடைக்கப்பட்டு, கப்பலில் வந்து, சென்னைத் துறைமுகத்தில் இறங்கி, திருநெல்வேலி ஆட்சியர் அலுவலகம் வழியாகத் தெற்கே ஆலயத்தை அடைந்தன.`,
        },
        {
          year: `1872`,
          title: `கோபுரங்களில் ஏற்றம்`,
          body: `ஆலயம் அர்ப்பணிக்கப்பட்ட அதே ஆண்டில், இரட்டைக் கோபுரங்களில் ஒவ்வொன்றுக்கும் ஒரு மணி என ஏற்றப்பட்டன — செப வேளைகளிலும் ஒவ்வொரு திருவிழாவிலும் இன்றும் அவை ஒலிக்கின்றன.`,
        },
      ],
      bellsOlderLead: `இங்கு ஒலித்த முதல் மணிகள் இவை அல்ல.`,
      bellsOlder: `1752-இல் கட்டி முடிக்கப்பட்ட கல் ஆலயத்தில் ஒரு பழைய மணி தொங்கியது — 1803 அக்டோபர் மாதத்து ஒரு காலைப் பொழுதில், கண்ணீர் சிந்தத் தொடங்கிய அன்னையின் சொரூபத்தை வந்து காண ஊர் முழுவதையும் அழைத்தது அம்மணியே.`,
      bellsFootnote: `மணிகளின் வரலாறு பங்கின் சொந்தப் பதிவு. வெளியான குறிப்புகள் லியோன் நகரின் பர்டின் வார்ப்பகத்தைக் குறிப்பிட்டு வந்தன; ஆனால் மணியின் வெண்கலத்தில் “Vve Grégoire de Valence (Drôme)” என்றே வார்க்கப்பட்டுள்ளது — பதிவும் வெண்கலமும் வேறுபடும் இடத்தில், வெண்கலத்தின் சொல்லே இறுதி.`,
      bellsCaption: `கோபுரத்தில் தொங்கும் மணி — “Vve Grégoire de Valence (Drôme) — Donateur Casimir Grégoire” என வார்க்கப்பட்டது`,
      lightLabel: `ஒளியும் நிறமும்`,
      lightTitle: `கண்ணாடி, சாயம், பொன்`,
      lightBody: `ஆலயத்தின் 23 சாளர வேலைப்பாடுகளிலும் வண்ணக் கண்ணாடி பதிக்கப்பட்டுள்ளது — தொடக்கத்தில் சாதாரணக் கண்ணாடியே; 1972 நூற்றாண்டு விழாவின்போது ரத்தினம் போன்ற வண்ணக் கண்ணாடித் தகடுகளால் மாற்றப்பட்டது. பக்கச் சுவர்களிலுள்ள 16 சாளரங்கள், இயேசு சபையின் நிர்வாகக் காலம் முழுவதும் “குளிர் காரணமாக” அடைக்கப்பட்டே இருந்தன; பின்னரே திறக்கப்பட்டன. உள்ளே, கூரை வளைவுகள், வில்வளைவுகள், தூண்கள் என எங்கும் பூக்களும் இயற்கைக் காட்சிகளும் தீட்டப்பட்டுள்ளன — வண்ணப் பூச்சாலோ ரசாயனத்தாலோ அல்ல, மரம், செடிகளிலிருந்து எடுத்த இயற்கைச் சாயங்களால். இன்று வரை மங்காமல், ஒருமுறை கூட மீண்டும் பூசப்படாமல் நிற்கின்றன.`,
      glassCaptions: [
        `வர்ணக் கண்ணாடி இதழ்ச் சாளரம், வண்ணம் தீட்டிய வளைவில்`,
        `1972 நூற்றாண்டு விழாவில் வண்ணமேற்றப்பட்ட நீள் சாளரங்கள்`,
        `வைர வடிவக் கண்ணாடிக் கட்டங்களும் மும்மடல் ரோஜா வடிவங்களும்`,
        `நடையின் வழியே கிழக்கு வாசல் நோக்கி விழும் ஒளி`,
      ],
      imagesLabel: `ஆலயம் சுமப்பவை`,
      imagesTitle: `கட்டிடம் தாங்கும் இரு சொரூபங்கள்`,
      imagesBody: `ஆலயம் எதற்காக என்பதை இரு சொரூபங்கள் சொல்கின்றன: நீங்கள் நுழையும் வாசலுக்கு மேல் ஒன்று; நீங்கள் சென்றடையும் பீடத்திற்கு மேல் ஒன்று.`,
      figures: [
        {
          title: `வாசலுக்கு மேல்`,
          body: `தலை வாயிலுக்கு மேல், முகப்பு மண்டபத்துக்குள், திருக்குடும்பத்தின் வண்ணப் புடைப்புச் சிற்பம்: மேலே பொன் ஒளிவட்டத்தில் ஒரு புறா, உச்சியில் முக்கோணத்துள் ஒரு கண். இது எதிர்ச் சீர்திருத்தக் காலத்தில் தோன்றிய “இரு திரித்துவங்கள்” எனும் பழைய உருவகம் — விண்ணகத் திரித்துவமும் மண்ணகத் திரித்துவமும் குழந்தை இயேசுவில் சந்திக்கின்றன. உருவங்கள் மட்டும் பழையவை; அவற்றைச் சூழ்ந்த பொன் முலாமும் பின்னணி நீல வானமும் புதியவை — அப்பகுதி 2016-க்கும் 2022-க்கும் இடையில் மீண்டும் வண்ணம் தீட்டப்பட்டது.`,
          caption: `நடு வாசலுக்கு மேலுள்ள “இரு திரித்துவங்கள்” சிற்பம்`,
        },
        {
          title: `பீடத்திற்கு மேல்`,
          body: `பெரும் பீடத்தில், குவிமாடம், கண்ணாடிக் கோபுரம், சிகரம் ஆகியவற்றின் கீழ் ஆறு சொரூபங்கள்: நடுவே சிலுவையில் அறையப்பட்ட கிறிஸ்து, அவருக்கு அருகில் அன்னை மரியாளும் புனித சூசையப்பரும், அவர்களுக்கு மேலே புனித செபஸ்தியார், புனித அந்தோணியார், புனித சவேரியார். தரை மொசைக் கற்களால் பதிக்கப்பட்டது. மரவேலைப்பாடு முழுவதும் பொன் முலாம் — பங்கு இன்று வரை மங்க விடாமல் காத்து வரும் பொன்.`,
          caption: `பொன் முலாம் பூசிய, மங்காத பெரும் பீடம்`,
        },
      ],
      inscription: `மரியே வாழ்க`,
      inscriptionGloss: `முகப்பு மண்டபத்தின் முகட்டில், தமிழ் எழுத்துகளில் புடைத்து நிற்கும் வாசகம் — ஆலயத்தை நோக்கி வருபவரிடம் அது சொல்லும் முதல் சொல்.`,
      colophonLabel: `ஆவணக் குறிப்பு`,
      colophonTitle: `கட்டியவர்கள், மணிகள், ஆதாரங்கள்`,
      builders: [
        {
          role: `வழிநடத்திய பங்குத் தந்தை`,
          name: `அருட்தந்தை ஜோசப் கிரகோயர், இ.ச.`,
        },
        {
          role: `கட்டிடக் கலைஞரும் பொறியாளரும்`,
          name: `அருட்சகோதரர் ஜோசப் பெர்கந்தால், இ.ச.`,
        },
        {
          role: `அர்ப்பணித்தவர்`,
          name: `ஆயர் அலெக்சிஸ் கனோஸ், இ.ச., 1872`,
        },
        {
          role: `மணிகள்`,
          name: `Vve Grégoire வார்ப்பகம், வாலென்ஸ் (Drôme), 1861`,
        },
        {
          role: `மணிகளை அளித்தவர்`,
          name: `காசிமிர் கிரகோயர்`,
        },
      ],
      sourcesNote: `திருக்குடும்ப ஆலயத்தின் பங்கு வரலாறு; அ. சிவசுப்பிரமணியன், “கிறித்தவமும் சாதியும்” (2001); அகுஸ்த் ஜான், “Le Maduré” (1894); எச். ஆர். பேட், “Madras District Gazetteer: Tinnevelly” (1917); பங்கில் பாதுகாக்கப்படும் ஒரு கையெழுத்துக் குறிப்பு — இவற்றிலிருந்து கட்டிடக்கலை விவரங்கள்.`,
      sourcesCta: `இப்பக்கத்தின் ஆதாரங்கள்`,
    },
    mass: {
      label: `வழிபாடும் கொண்டாட்டங்களும்`,
      title: `திருப்பலியும் திருவிழாக்களும்`,
      intro: `எங்களோடு இணைந்து செபிக்க அனைவரையும் அன்புடன் வரவேற்கிறோம். வாரந்தோறும் நிகழும் திருப்பலி நேரங்கள், மாதந்தோறும் நடைபெறும் பக்தி முயற்சிகள், ஆண்டு முழுவதும் எங்கள் பங்கு கொண்டாடும் திருவிழாக்கள் ஆகியவற்றை இங்கே காணலாம்.`,
      weeklyLabel: `வாரந்தோறும் வழிபாடு`,
      cards: [
        {
          title: `தினசரி திருப்பலி`,
          subtitle: `திங்கள் – சனி`,
          times: [
            `காலை 5:00`,
            `காலை 6:10`,
          ],
        },
        {
          title: `ஞாயிறு திருப்பலி`,
          subtitle: `ஒவ்வொரு ஞாயிறும்`,
          times: [
            `காலை 5:00`,
            `காலை 7:00`,
            `காலை 9:30`,
          ],
        },
        {
          title: `மாலை வழிபாடு`,
          subtitle: `தினமும்`,
          times: [
            `மாலை 6:30 — திருச்செபமாலை`,
            `மாலை 7:00 — நற்கருணை ஆசீர்வாதம்`,
            `ஞாயிறு — மாலை 5:30 முதல்`,
          ],
        },
      ],
      devotionsLabel: `பிற மொழித் திருப்பலிகளும் மாதந்தோறும் பக்தி முயற்சிகளும்`,
      devotionsNote: `மாதம் ஒருமுறை நடைபெறும். திருவிழா நாட்களில் நேரங்கள் மாறக்கூடும் — பங்கு அலுவலகத்தில் உறுதிப்படுத்திக் கொள்ளுங்கள்.`,
      devotions: [
        {
          when: `முதல் ஞாயிறு`,
          time: `மாலை 5:00`,
          service: `ஆங்கிலத் திருப்பலி`,
        },
        {
          when: `முதல் திங்கள்`,
          time: `காலை 11:00`,
          service: `மலையாளத் திருப்பலி`,
        },
        {
          when: `முதல் வெள்ளி`,
          time: `பிற்பகல் 3:00`,
          service: `இறையிரக்க வழிபாடு`,
        },
        {
          when: `முதல் சனி`,
          time: `காலை 10:00`,
          service: `தமிழ்த் திருப்பலி`,
        },
        {
          when: `முதல் சனி`,
          time: `மாலை 6:30`,
          service: `மாதா ஊர்வலமும் ஆராதனையும்`,
        },
        {
          when: `இரண்டாம் வெள்ளி`,
          time: `மாலை 6:30`,
          service: `புனித தேவசகாயம் பிள்ளை ஊர்வலமும் ஆராதனையும்`,
        },
        {
          when: `கடைசி வெள்ளி`,
          time: `மாலை 6:30`,
          service: `சகாய மாதா ஆலயம்`,
        },
      ],
    },
    contact: {
      label: `வாருங்கள் · எழுதுங்கள் · செபியுங்கள்`,
      title: `திருத்தலத்திற்கு வாருங்கள்`,
      intro: `திருக்குடும்பத் திருத்தலத்தின் கதவுகள் 1685 முதல் திறந்தே இருக்கின்றன. நீங்கள் திருப்பயணம் ஒன்றைத் திட்டமிட்டாலும், பங்கு அலுவலகத்தைத் தொடர்புகொள்ள விரும்பினாலும், இங்கிருந்தே தொடங்குங்கள்.`,
      address: `திருக்குடும்பத் திருத்தலம், கிழக்குத் தெரு, வடக்கன்குளம், ராதாபுரம் வட்டம், திருநெல்வேலி மாவட்டம், தமிழ்நாடு 627116, இந்தியா`,
      directions: `வழி காட்டுங்கள்`,
      status: {
        staticSummary: `தினமும் திருப்பலி`,
        staticHours: `சிற்றாலயம் காலை 9:00 முதல் இரவு 8:00 வரை திறந்திருக்கும்`,
        mass: `திருப்பலி நடந்து கொண்டிருக்கிறது`,
        open: `திருத்தலம் திறந்துள்ளது`,
        closed: `திருத்தலம் அமைதியாக உள்ளது`,
        nextMass: `அடுத்த திருப்பலி`,
        inTime: `இன்னும்`,
        atFirstLight: `விடியலில் கதவுகள் திறக்கும்`,
        hourUnit: `மணி`,
        minuteUnit: `நிமிடம்`,
        unitSep: ` `,
      },
      actions: {
        call: `பங்குக்கு அழையுங்கள்`,
        callShort: `அழையுங்கள்`,
        whatsapp: `வாட்ஸ்அப்`,
        directions: `வழி காட்டுங்கள்`,
        copy: `நகலெடுங்கள்`,
        copied: `நகலெடுக்கப்பட்டது`,
      },
      tablet: {
        dedication: `திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்டது`,
        patroness: `விண்ணேற்பு மாதா`,
        founded: `1685-ல் புனித அருளானந்தரால் நிறுவப்பட்டது`,
        shrineSince: `1993 முதல் திருத்தலம்`,
        littleRome: `1926 முதல் சின்ன ரோமாபுரி என அழைக்கப்படுகிறது`,
        prayerLine: `வடக்கன்குளத்து அன்னையே, எங்களுக்காக வேண்டிக்கொள்ளும்.`,
      },
      purpose: {
        kicker: `எங்களை அணுகுங்கள்`,
        heading: `எதற்காக வந்திருக்கிறீர்கள்?`,
        hint: `ஒன்றைத் தேர்ந்தெடுங்கள், உங்களைச் சரியான இடத்திற்கு அழைத்துச் செல்கிறோம்.`,
        visit: `வருகையைத் திட்டமிடுங்கள்`,
        visitNote: `நேரங்கள், பயணம், அங்கே எதிர்பார்க்கக் கூடியவை`,
        massIntention: `திருப்பலி ஒப்புக்கொடுங்கள்`,
        massIntentionNote: `உயிருடன் உள்ளோருக்காக அல்லது இறந்தோருக்காக`,
        sacrament: `ஓர் அருட்சாதனம்`,
        sacramentNote: `திருமுழுக்கு, திருமணம், நோயில் பூசுதல்`,
        certificate: `ஒரு சான்றிதழ்`,
        certificateNote: `பங்குப் பதிவேட்டிலிருந்து`,
        sickCall: `நோயாளிக்கான அழைப்பு`,
        sickCallNote: `அவசரம் — இது பங்கு அலுவலகத்தை அழைக்கும்`,
        offering: `காணிக்கை செலுத்துங்கள்`,
        offeringNote: `திருவிழாவிற்கு அல்லது திருத்தலத்திற்கு`,
        other: `வேறு ஏதேனும்`,
        otherNote: `பங்கு அலுவலகத்திற்கு எழுதுங்கள்`,
        sentenceLead: `நான்`,
        sentenceTail: `வந்துள்ளேன்`,
        visitPhrase: `திருத்தலத்தைத் தரிசிக்க`,
        massIntentionPhrase: `திருப்பலி ஒப்புக்கொடுக்க`,
        sacramentPhrase: `ஓர் அருட்சாதனம் கேட்க`,
        certificatePhrase: `ஒரு சான்றிதழ் கேட்க`,
        sickCallPhrase: `இப்போதே ஓர் அருட்தந்தையை அழைக்க`,
        offeringPhrase: `காணிக்கை செலுத்த`,
        otherPhrase: `வேறு ஏதேனும் சொல்ல`,
        ctaVisit: `வழியைக் காட்டுங்கள்`,
      },
      sickCall: {
        title: `தயவுசெய்து அழையுங்கள், எழுத வேண்டாம்.`,
        body: `அருட்தந்தையை மிக விரைவாக அணுகும் வழி தொலைபேசியே. யாரேனும் கடுமையாக நோய்வாய்ப்பட்டிருந்தாலோ மரணத் தறுவாயில் இருந்தாலோ, இப்போதே பங்கு அலுவலகத்திற்கு அழைத்து, பணியில் இருக்கும் அருட்தந்தையைக் கேளுங்கள்.`,
        cta: `இப்போதே பங்குக்கு அழையுங்கள்`,
      },
      express: {
        heading: `பேச விரும்புகிறீர்களா?`,
        body: `பெரும்பாலானோர் தொலைபேசி மூலம் பங்கை விரைவாக அணுகுகிறார்கள்.`,
      },
      form: {
        heading: `பங்குக்கு எழுதுங்கள்`,
        name: `உங்கள் பெயர்`,
        phone: `தொலைபேசி எண்`,
        phoneNote: `பங்கு உங்களைத் தொடர்புகொள்வதற்கு`,
        email: `மின்னஞ்சல்`,
        optional: `கட்டாயமில்லை`,
        message: `உங்கள் செய்தி`,
        intentionType: `திருப்பலி யாருக்காக`,
        living: `உயிருடன் உள்ளோர்`,
        departed: `இறந்த விசுவாசிகள்`,
        intentionNames: `நினைவுகூர வேண்டிய பெயர் அல்லது பெயர்கள்`,
        preferredDate: `விரும்பும் தேதி`,
        anyDate: `எந்தத் தேதியும் சரி`,
        sacramentType: `எந்த அருட்சாதனம்`,
        sacraments: {
          baptism: `திருமுழுக்கு`,
          "first-communion": `முதல் நற்கருணை`,
          confirmation: `உறுதிபூசுதல்`,
          marriage: `திருமணம்`,
          anointing: `நோயில் பூசுதல்`,
          funeral: `இறுதிச் சடங்கு`,
        },
        recordType: `எந்தப் பதிவு`,
        records: {
          baptism: `திருமுழுக்குச் சான்றிதழ்`,
          marriage: `திருமணச் சான்றிதழ்`,
          confirmation: `உறுதிபூசுதல் சான்றிதழ்`,
        },
        recordName: `பதிவேட்டில் எழுதப்பட்டுள்ள பெயர்`,
        recordYear: `தோராயமான ஆண்டு`,
        relationship: `அந்த நபருடன் உங்கள் உறவு`,
        submit: `பங்குக்கு அனுப்புங்கள்`,
        submitting: `அனுப்புகிறோம்…`,
        successTitle: `பங்குப் பதிவேட்டில் பதிவு செய்யப்பட்டது.`,
        successBody: `உங்கள் செய்தி அலுவலகத்தை அடைந்துவிட்டது. முடிந்தவரை விரைவில் பதிலளிப்போம்.`,
        successUrgent: `விஷயம் அவசரமானதாக இருந்தால், தயவுசெய்து அழையுங்கள்`,
        errorSummary: `தயவுசெய்து பின்வருவனவற்றை மீண்டும் பாருங்கள்:`,
        errors: {
          required: `இது தேவை`,
          email: `இது மின்னஞ்சல் முகவரி போல் தெரியவில்லை`,
          phone: `இது தொலைபேசி எண் போல் தெரியவில்லை`,
          tooShort: `தயவுசெய்து இன்னும் கொஞ்சம் எழுதுங்கள்`,
          tooLong: `இது மிக நீளமாக உள்ளது`,
          year: `1685 முதல் இன்று வரையிலான ஆண்டை உள்ளிடுங்கள்`,
        },
        unconfiguredTitle: `இணையத் தபால் இன்னும் இயங்கவில்லை.`,
        unconfiguredBody: `உங்கள் வார்த்தைகள் இங்கேயே உள்ளன — எதுவும் தொலைந்துவிடவில்லை. இன்று பங்கைத் தொடர்புகொள்ள மிகவும் உறுதியான வழி தொலைபேசி அழைப்பே. முதலில் உங்கள் செய்தியை நகலெடுத்துக் கொள்ளலாம்.`,
        copyMessage: `என் செய்தியை நகலெடுங்கள்`,
        failedTitle: `உங்கள் செய்தி சென்று சேரவில்லை.`,
        failedBody: `எங்கள் பக்கத்தில் ஏதோ தவறு நேர்ந்துவிட்டது; உங்கள் பக்கத்தில் அல்ல. தயவுசெய்து உங்கள் செய்தியை நகலெடுத்துக் கொண்டு, பங்கு அலுவலகத்திற்குத் தொலைபேசியில் அழையுங்கள்.`,
        botRejected: `நீங்கள் மனிதர் என்பதை உறுதிப்படுத்த முடியவில்லை. தயவுசெய்து மீண்டும் ஒருமுறை முயற்சி செய்யுங்கள்.`,
      },
      directory: {
        heading: `யாரை அழைப்பது`,
        intro: `பங்கைத் தொடர்புகொள்ள ஒரே ஒரு தொலைபேசி இணைப்பு; மற்ற அனைத்தும் அதன் வழியாகவே செல்கின்றன.`,
        office: `பங்கு அலுவலகம்`,
        officeNote: `பங்கு வெளியிட்டுள்ள ஒரே தொலைபேசி இணைப்பு`,
        priest: `பங்குத் தந்தை`,
        priestNote: `பங்கு அலுவலகத்தின் வழியாக அணுகலாம்`,
        chapel: `ஆராதனைச் சிற்றாலயம்`,
        chapelNote: `தினமும் காலை 9:00 – இரவு 8:00 வரை திறந்திருக்கும்`,
        houses: `கிராமத்தில் உள்ள துறவற இல்லங்கள்`,
        housesNote: `இவை கன்னியர் மடங்களும் ஆசிரமமும் — பங்கு அலுவலகம் அல்ல. பங்கு தொடர்பான தேவைகளுக்குத் தயவுசெய்து இவற்றை அழைக்க வேண்டாம்.`,
        diocese: `தூத்துக்குடி மறைமாவட்டம்`,
        dioceseNote: `அலுவல்முறைக் கடிதப் போக்குவரத்திற்கு`,
        dioceseCta: `மறைமாவட்டத் தொடர்புப் பக்கம்`,
      },
      map: {
        heading: `நாங்கள் இருக்கும் இடம்`,
        intro: `திருத்தலம் கிராமத்தின் மையத்தில், கிழக்குத் தெருவில் அமைந்துள்ளது. அதன் இரட்டை வெண்கோபுரங்கள் நெடுஞ்சாலையிலிருந்தே தெரியும்.`,
        iframeTitle: `வடக்கன்குளம் திருக்குடும்பத் திருத்தலத்தைக் காட்டும் வரைபடம்`,
        directionsGoogle: `வழிகாட்டுதல்`,
        openApple: `ஆப்பிள் வரைபடம்`,
        copyCoords: `ஆயத்தொலைவுகளை நகலெடுங்கள்`,
        coordsCopied: `ஆயத்தொலைவுகள் நகலெடுக்கப்பட்டன`,
      },
      travel: {
        heading: `இங்கு வருவது எப்படி`,
        intro: `நாகர்கோவிலுக்கும் திருநெல்வேலிக்கும் இடையில், NH-44-ஐ ஒட்டி வடக்கன்குளம் அமைந்துள்ளது; இந்தியாவின் தென்கோடியிலிருந்து சுமார் ஒரு மணி நேரப் பயணம்.`,
        rail: `ரயிலில்`,
        road: `சாலை வழியாக`,
        air: `விமானத்தில்`,
        railNote: `நான்கு நிலையங்களும் நாகர்கோவில்–திருநெல்வேலி ரயில் பாதையில் உள்ளன. ஒவ்வொரு நிலையத்திற்கு வெளியேயும் ஆட்டோக்களும் ஷேர் டாக்ஸிகளும் காத்திருக்கும்.`,
        roadNote: `அரசுப் பேருந்துகளும் தனியார் பேருந்துகளும் வடக்கன்குளத்தில் நிற்கின்றன. வள்ளியூர், பனகுடி அல்லது நாகர்கோவில் செல்லும் பேருந்தைக் கேளுங்கள்.`,
        airNote: `திருவனந்தபுரம்தான் அருகிலுள்ள சர்வதேச விமான நுழைவாயில்.`,
        km: `கி.மீ`,
        mins: `நிமிடம்`,
        away: `தொலைவில்`,
        directionsFrom: `இங்கிருந்து வழிகாட்டுதல்`,
        locate: `நான் எவ்வளவு தொலைவில்?`,
        locating: `உங்களைக் கண்டறிகிறோம்…`,
        youAre: `நீங்கள் சுமார்`,
        straightLine: `நேர்க்கோட்டுத் தொலைவில்`,
        locateDenied: `பரவாயில்லை — முகவரி மேலே உள்ளது.`,
      },
      visit: {
        heading: `எப்போது வருவது`,
        massHeading: `திருப்பலி`,
        weekday: `திங்கள் – சனி`,
        sunday: `ஞாயிறு`,
        chapel: `ஆராதனைச் சிற்றாலயம்`,
        chapelHours: `தினமும், காலை 9:00 – இரவு 8:00`,
        devotions: `மாலைப் பக்தி முயற்சிகள்`,
        devotionsHours: `செபமாலை மாலை 6:30 · ஆசீர்வாதம் மாலை 7:00`,
        fullTimings: `அனைத்துத் திருப்பலி நேரங்களையும் திருவிழாக்களையும் பாருங்கள்`,
        workingChurch: `இது வழிபாடு நடைபெறும் பங்கு ஆலயம்; அருங்காட்சியகம் அல்ல. திருப்பலியோ இறுதிச் சடங்கோ நடந்துகொண்டிருந்தால், தயவுசெய்து அமைதியாக வாருங்கள்.`,
        feastTitle: `திருவிழாவின் போது, ஆகஸ்ட் 6 – 15`,
        feastBody: `பத்து நாள் திருவிழா ஆகஸ்ட் 6-ல் கொடியேற்றத்துடன் தொடங்கி, ஆகஸ்ட் 15-ல் விண்ணேற்புத் திருநாளுடன் நிறைவடைகிறது; அன்று நடக்கும் தேர் ஊர்வலத்தில் சுமார் ஒரு லட்சம் பேர் திரள்கிறார்கள். சாலைகள் மூடப்படும்; ஆலயத்தை ஒட்டி வாகனம் நிறுத்த இடம் இருக்காது; ஊரே உறங்காது. முன்கூட்டியே வாருங்கள்; நடந்தே வாருங்கள்.`,
        questions: [
          {
            q: `வடக்கன்குளம் திருத்தலத்தில் திருப்பலி நேரங்கள் என்ன?`,
            a: `திங்கள் முதல் சனி வரை காலை 5:00, 6:10 மணிக்கும், ஞாயிறு அன்று காலை 5:00, 7:00, 9:30 மணிக்கும் திருப்பலி நிறைவேற்றப்படுகிறது. நற்கருணை ஆராதனைச் சிற்றாலயம் தினமும் காலை 9:00 முதல் இரவு 8:00 வரை திறந்திருக்கும்.`,
          },
          {
            q: `வடக்கன்குளம் திருக்குடும்பத் திருத்தலத்திற்கு எப்படி வருவது?`,
            a: `திருத்தலம் கிழக்குத் தெரு, வடக்கன்குளம், திருநெல்வேலி மாவட்டம், தமிழ்நாடு 627116-ல், NH-44-ஐ ஒட்டி அமைந்துள்ளது. அருகிலுள்ள ரயில் நிலையம் வடக்குப் பனகுடி, சுமார் 15 கி.மீ தொலைவில்; நாகர்கோவில் சந்திப்பு 26 கி.மீ, திருநெல்வேலி சந்திப்பு 66 கி.மீ. அருகிலுள்ள விமான நிலையம் திருவனந்தபுரம், சுமார் 95 கி.மீ தொலைவில்.`,
          },
          {
            q: `எந்த நேரத்திலும் திருத்தலத்திற்கு வரலாமா?`,
            a: `திருத்தலம் வழிபாடு நடைபெறும் பங்கு ஆலயம். ஆராதனைச் சிற்றாலயம் தினமும் காலை 9:00 முதல் இரவு 8:00 வரை திறந்திருக்கும்; திருப்பலி நேரங்களைச் சுற்றி ஆலயமும் திறந்திருக்கும். ஆண்டுத் திருவிழாவின் போது, ஆகஸ்ட் 6 முதல் 15 வரை, கிராமம் நெரிசலாக இருக்கும்; ஆலயத்தை ஒட்டிய சாலைகள் வாகனங்களுக்கு மூடப்படும்.`,
          },
        ],
      },
      notes: {
        heading: `வருவதற்கு முன்`,
        dress: `உடை`,
        dressBody: `இந்தியாவின் எந்த ஆலயத்திலும் போலவே, அடக்கமான உடை அணிந்து வாருங்கள். தோள்களும் முழங்கால்களும் மூடப்பட்டிருக்க வேண்டும்.`,
        photography: `புகைப்படங்கள்`,
        photographyBody: `ஆலயத்திற்கு வெளியேயும் ஆலயத்தின் பின்பகுதியிலும் புகைப்படம் எடுக்கலாம். திருப்பலியோ இறுதிச் சடங்கோ நடக்கும்போது தயவுசெய்து புகைப்படம் எடுக்க வேண்டாம்.`,
        access: `அணுகல்`,
        accessBody: `ஆலயம் தரைமட்டத்தில் உள்ளது. சக்கர நாற்காலியில் வருபவர்களுக்கோ, வயது முதிர்ந்த திருப்பயணிகளுக்கோ உதவி தேவைப்பட்டால், பயணத்திற்கு முன் பங்கு அலுவலகத்திற்குத் தொலைபேசியில் அழையுங்கள்; அவர்கள் ஏற்பாடு செய்வார்கள்.`,
        offeringTitle: `காணிக்கைகள்`,
        offeringBody: `திருப்பலிகளுக்கும், திருவிழாவிற்கும், திருத்தலத்தின் பராமரிப்பிற்கும் உரிய காணிக்கைகள் பணிமனையில் நேரில் பெறப்படுகின்றன. தயவுசெய்து ரசீது கேளுங்கள்.`,
        offeringUpi: `அல்லது UPI மூலம் காணிக்கை செலுத்துங்கள்`,
        colophon: `விசுவாசத்தில், அமைதியில், ஒளியில்.`,
      },
    },
    footer: {
      tagline: `விசுவாசம், செபம், சமூகம் ஆகியவற்றின் புகலிடம்.`,
      explore: `மேலும் அறிய`,
      visit: `வருகை`,
      connect: `தொடர்பு`,
      rights: `அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.`,
    },
  },
} as const;

export type Dict = typeof dict.en;
