export type Lang = "en" | "ta";

export const dict = {
  en: {
    nav: {
      home: "Home",
      history: "History",
      priests: "The Parish Register",
      mass: "Mass & Festivals",
      festivals: "Festivals",
      gallery: "Gallery",
      architecture: "Architecture",
      contact: "Contact",
      faq: "Questions & Answers",
      sources: "Sources",
      britto: "St. John de Britto",
      devasahayam: "St. Devasahayam Pillai",
      acknowledgements: "Acknowledgements",
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

      /* ── III · The Chronicle ────────────────────────────────────────────
         The home page's door into /history. Seven frames out of fifty-six
         moments, chosen so the strip visibly does not finish: the reader is
         meant to notice how much is still off the right-hand edge.

         Every line here is drawn from a moment that already exists on
         /history, with its citation and its tier. Nothing is written up. The
         1803 line in particular says "the village says" for the same reason
         the history page does — it is devotion tier, not documented. */
      /* ⚠ {n} {c} {y} ARE FILLED AT RENDER, NOT TYPED IN. `n` is a count of
         moments, `c` a count of chapters, `y` the last year on the carousel —
         all three read off the dictionary itself (see chronicleCounts in
         lib/chronicle.ts). This is not decoration: the previous copy said
         "fifty-six moments" when /history had fifty-eight, because a number
         written into a sentence has no way of noticing that a year was added
         to a chapter. Keep the braces. */
      chronicleLabel: "The Chronicle",
      chronicleTitle: "Everything that happened here was written down",
      chronicleBody:
        "{n} moments, from a woman's cross in a forest clearing to a canonisation in Rome. Not one of them is claimed here without the book it came out of — and where the books disagree, this parish prints both.",
      chronicleCta: "Read the chronicle",
      chronicleDoorTitle: "It does not end at {y}",
      chronicleDoorBody:
        "{n} more moments wait across the {c} chapters — and the last one is still open. This parish has not gone a single year without a priest since 1697, and it is still being written into.",
      chronicleFrames: [
        {
          year: "c.1680",
          chapter: "A Clearing in the Forest",
          title: "It began with one woman",
          line:
            "Santhaayi Ammaiyar stopped where there was nothing but bush, trees and a tank, built her house, and raised a cross in the open ground facing her door. Everything here grew around it.",
        },
        {
          year: "1685",
          chapter: "A Clearing in the Forest",
          title: "The priest on the forest road",
          line:
            "She was out gathering cotton when a priest rode past. She ran and asked him to bless her cross, and he stopped his horse and did. It was John de Britto. He had come this far south and no further.",
        },
        {
          year: "1745",
          chapter: "The Statue and the Saint",
          title: "There is no cause for delay",
          line:
            "The priest kept postponing him — a convert of that rank would draw persecution. The king's officer answered: “I shall even give up my life to maintain the Truth.” He was baptised here on 14 May. He did.",
        },
        {
          year: "1803",
          chapter: "The Weeping Madonna",
          title: "The bell at the wrong hour",
          line:
            "It rang on a Friday forenoon in Aippasi, and the village came in from the fields to find out why. What they said they saw, the parish has commemorated every October for the two hundred and twenty-three years since.",
        },
        {
          year: "1872",
          chapter: "The Great Two-Nave Church",
          title: "Seventeen years, and no iron in it",
          line:
            "Lime and palm-toddy mortar, twenty-four arches, two towers of ninety-two feet — and two naves that run side by side the whole length of the church to meet at one altar. There is not another like it.",
        },
        {
          year: "1926",
          chapter: "Little Rome",
          title: "Chinna Romapuri",
          line:
            "The first Bishop of Tuticorin came, looked at the village, and called it Little Rome. He meant the church, the schools, the convents and the four thousand. A century later it is still what people call it.",
        },
        {
          year: "2022",
          chapter: "The Shrine and the Saint",
          title: "The turban and the chains",
          line:
            "The officer baptised at this font became the first Indian layman ever declared a saint. The chains he was bound in for seven months are kept here, in the church where it started.",
        },
      ],

      /* ── The 1803 moment ────────────────────────────────────────────────
         A pattern interrupt, and the page's emotional peak.

         THE TIER IS THE POINT. This is `devotion` in citations.ts — a local and
         diocesan tradition, never a Vatican investigation — and the copy must
         never quietly promote it. `weepingHonest` is close to the sentence
         history.ts calls `APPARITION.honestStatement`; do not soften it into
         an assertion, and do not delete it to make the section read stronger.
         It reads stronger because it is there. */
      weepingLabel: "23 October 1803",
      weepingTitle: "They said her face was wet",
      weepingBody1:
        "It was a Friday forenoon in the Tamil month of Aippasi, in a village that had been without a Jesuit for a generation. The bell rang at the wrong hour and the people came in from the fields to find out why.",
      weepingBody2:
        "What they told afterwards, and have gone on telling for two hundred and twenty-three years, is that the statue Fr Buttari had taken out of a box from the sea was weeping.",
      weepingHonest:
        "This is a local and diocesan devotional tradition, recorded by the Jesuit historian Léon Besse. It has never been the subject of a Vatican investigation. The parish has commemorated it on 22–23 October ever since — and the date is settled at 1803, not 1805.",
      weepingCta: "Read the three accounts",

      /* ── IV · The Fathers of Vadavai ────────────────────────────────────
         The door into /priests, which until now was reachable from nowhere on
         this site — not the navbar, not the footer, not one page.

         The hook is the asymmetry, not the number. Eleven faces survive out of
         sixty-nine men; the honest sentence about the other fifty-four is what
         makes this section worth stopping for, and it is the same sentence the
         register page opens with. Keep it. */
      fathersLabel: "The Parish Register",
      fathersTitle: "Sixty-nine priests. Not one year without one.",
      fathersBody:
        "This parish has numbered its priests since 1697 and has kept the name of every single one. For about fifteen of them the Jesuit archives in Rome, the French mission histories and the parish's own diaries preserve a life — what he built, what he refused, how he died.",
      fathersBody2:
        "Eleven faces survive. Fifty-four of these men are a name and a span of years, and that is the honest shape of a three-hundred-year record, not a hole in it.",
      fathersStat1: "pastorates",
      fathersStat2: "since",
      fathersStat3: "faces that survive",
      fathersCta: "Open the register",

      /* ── VI · The parish year & the parish week ─────────────────────────
         Festivals and Mass times were two full sections pointing at one page.
         They are one section now, in two bands. */
      rhythmLabel: "The Parish Rhythm",
      rhythmTitle: "When we gather",
      rhythmYearBand: "The year",
      rhythmWeekBand: "The week",
      rhythmCta: "Full calendar & timings",
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
              title: `A straw for a pen`,
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
              title: `The first to stay`,
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
              title: `A house where a father lived`,
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
              title: `There is no cause for delay`,
              body: `Neelakanta Pillai was already a man of standing when he came to the font: an officer at the court of the king of Travancore, of good family, and thirty-two years old. It was Eustache de Lannoy, an officer of the king's own army, who first spoke to him of the Christian faith and sent him on to Fr Buttari, the priest of Vadakkankulam. Buttari could see the persecution such a convert would draw, and he did not hurry. He “judged it necessary to defer the grace he so ardently desired; and, having tested him long, admitted him to the sacrament of regeneration.” A Protestant historian of Travancore records what the waiting man said to the hesitating priest: “There is no cause for delay. This is no compulsory baptism. I came here to receive the sacraments not by force, but by my own free will and desire. I shall even give up my life to maintain the Truth of which I received the light and of which I am convinced.” He would. The instruction ran nine months. On 14 May 1745 the water was poured in the church here, with the catechist Gnanaprakasam Pillai standing as his godfather, and the officer took the name Lazarus, and in Tamil Devasahayam, God is my help.`,
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
              title: `The sweet names of Jesus and Mary`,
              body: `Three years of it: paraded through the towns on a buffalo, scourged, and chained for months to a tree in the wilderness. On 14 January 1752 they took him out to the Travancore lines at the Aralvaimozhi gap and shot him, and “the martyr expired, repeating the sweet names of Jesus and Mary”. His body was gathered into the church of St Francis Xavier at Kottar, where the Bishop of Cochin had the Te Deum sung and preached the martyr's panegyric himself. Vadakkankulam kept what it could of him: a part of his garment, and the chains he had been bound with. His wife, baptised Gnanapoo Theresa, lies in the parish cemetery, under a stone that gives the year of her death as 1766.`,
            },
            {
              year: `1773–1775`,
              title: `The last of the old fathers`,
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
              title: `The years no Jesuit came`,
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
              body: `On the forenoon of Friday, 21 October 1803, in the Tamil month of Aippasi of the year 979, a man named Savarimuthu Pillai, who had come from Tirunelveli to see Mr Bilderbeck, a European settled in the village, went into the church to pray. The statue of Our Lady of the Assumption stood above the altar in a recess closed by a double door, and that morning both its leaves were open. As he knelt, a thin transparent cloud gathered behind her and wrapped her round. Her eyes lifted toward heaven and filled, and the tears ran down her cheeks; her face turned sorrowful; and her folded hands parted and stretched out until they touched the walls of the recess. And every other statue on the altar, the record says, “expressed compassion and mourning”. “I am the subject of an illusion,” he thought. He looked again, harder, and it had not stopped.`,
            },
            {
              year: `1803`,
              title: `The bell at the wrong hour`,
              body: `The catechist Madurendira Annaviyar climbed up to the altar and wiped her face, and the tears came again, and would not stop. Then they rang the bell. It was not an hour at which the bell was ever rung, and the whole village came in from the fields and the houses to see why. They stood and looked, and then they wept and prayed, and sang the old penitential chant that is sung when a people is afraid: “Parce Domine, parce populo tuo.” Spare, O Lord, spare your people. And as they prayed, the statue and all the other images “resumed their customary aspect”, and the face above the altar was an ordinary carved face again.`,
            },
            {
              year: `1803`,
              title: `Her eyes like stars`,
              body: `To be sure of it, Savarimuthu went for the catechist Yagappar Pillai. The catechist came into the church and saw the Mother of God wrapped in smoke and darkness, her face desolate, her arms open, her eyes raised to heaven and running with tears. Then they sent in haste for Mr Bilderbeck's daughter, Henriette, and the girl ran to the church and saw it in her turn. Looking into Our Lady's face, she saw her eyes “like stars”, and the tears breaking from them so abundantly that “they ran to the ground and wetted it”; and the statues of the saints, all of them together, bowing their heads in sorrow.`,
            },
            {
              year: `1803`,
              title: `The schoolmaster's song`,
              body: `The first account of that morning was not written by a priest, and it was not written in prose. It was a song. The village schoolmaster made it immediately after, five stanzas of verse, and he had been in the church and seen the whole of it with his own eyes. He was a worshipper of Siva. Everything printed since has been built on what he composed that day: the hour before noon, the open doors of the niche, the cloud that gathered behind her, the tears, the hands reaching out until they touched the walls. When a Jesuit set the account down in print a century later, he chose to give “the substance of the song and its commentary, leaving aside the poetry and the rhythm”. The story survives. The verse of it did not.`,
            },
            {
              year: `1803–1817`,
              title: `The family in the church that morning`,
              body: `The Bilderbecks were flesh and blood, and they can be named. Christopher Bilderbeck, born about 1758, was a merchant of European descent who settled at Vadakkankulam late in the eighteenth century and died here in 1817. They were people of standing, holding the revenue-farm of Nangunery; and Henriette, who had examined the statue that morning, was his daughter. A son, John, was born in 1809, six years after the weeping; and when John died in 1880 an English missionary journal recorded of him that he had been “born in India… of a Roman Catholic family, and trained for the priesthood of that Church.” The family that stood in this church that morning left a paper trail of its own, in Protestant hands, kept by people with no reason at all to flatter a Catholic shrine.`,
            },
            {
              year: `1838`,
              title: `Those who could still be asked`,
              body: `When the Jesuits came back in 1838, that morning was still inside living memory. Thirty-five years lay between the fathers who arrived and the day itself, and many of the people who had been in the church were still alive to be asked. The first of them to reach Vadakkankulam found themselves, as a Jesuit of this mission afterwards wrote, “as if wrapped and steeped in the powerful atmosphere of that tradition”; they had only to listen to what the village willingly told them to learn the whole of it, and they became in their turn its witnesses. And there was one thing the village always put in, which no one who ever told the story left out: how the church had filled and the many candles of the altar were lit and everyone was on their knees, and how someone went up to wipe the tears and could not stop them or make them less. That helpless kindness was what broke the people. They beat their breasts, they said “Lord, have mercy on us,” and they sang the Salve Regina.`,
            },
            {
              year: `1905`,
              title: `He tried to move her hands`,
              body: `A hundred years after that morning a Jesuit of this mission came to see for himself. The village had made a working copy of the statue: wires and rods inside a hollow imitation, so that one pull raised the head, lifted the eyes to heaven, parted the hands and opened the arms, and a second pull put everything back again. “They kindly re-did the miracle for us,” he wrote. It did not go smoothly, and the man working it tangled his strings more than once. Then he went to the statue itself, standing alone in its place of honour above the tabernacle, and put his own hands on it. He tried to straighten the head, to lift the eyelids, to roll the eyes, and above all to separate those two hands carved from a single piece and force the rigid arms apart. Wasted labour. It was the dead resistance of raw matter, of a dried tree-trunk. He gave up what he called his usurped office of inquisitor of the Faith, and he gave it up gladly, and knelt.`,
            },
            {
              year: `1914`,
              title: `Three witnesses, in three hands`,
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
              title: `A most touching explosion of joy`,
              body: `In 1838 the restored Society of Jesus came back into the southern mission with two French fathers, Martin and du Ranquet, and in June Fr Martin came south to Vadakkankulam — “a Christian community considerable in the number and the nobility of its inhabitants, who received us with a most touching explosion of joy.” The next day deputations came running in from all the villages round about with their gifts, begging him to visit their own churches, “long deprived of their pastors.” That afternoon forty-five children were baptised. After sixty-three years there was a Jesuit again in the brick church of 1752, and a congregation that had gone on growing.`,
            },
            {
              year: `1839`,
              title: `On horseback at half past two`,
              body: `In 1839 the superior of the whole Madurai mission stayed behind here while his bishop went down alone to the coast, so as to keep the village's great novena and the solemn feast of St Francis Xavier. Fr Joseph Bertrand rode the last stage in the dark. “The 23rd. On horseback at half past two; at eight o'clock, arrival at Vadakencoulam, mass and the opening of the novena and of the administration.” That Mass opened nine days of feast, and with them the year's round of confessions and communions for the whole congregation.`,
            },
            {
              year: `1848`,
              title: `What the Bishop asked for`,
              body: `Coming back into his mission from the Malabar coast in 1848, Bishop Alexis Canoz entered it by this village. In his own account of the year he set this place down as “Vadakencoulam, a great and good Christian community, of which I made the visitation.” He came on the 21st of June, and before he went he asked the people to begin putting money aside for a large new church. They were not a rich village. It took them seven years. Then he came back and blessed the stone.`,
            },
            {
              year: `by 1855`,
              title: `A bishop, a village, and a childless house`,
              body: `The money came from three places. The bishop carried it longest: for eighteen years Canoz sent at least two thousand francs a year toward the building. The village raised its share out of its own pockets, a little at a time, through seven years. And one family gave in thanksgiving. Christopher Bilderbeck was the European merchant of the village, and he and his wife had been married twenty-seven years without a child; he was past fifty by then, which is the age at which a man stops asking. They asked anyway. They prayed to Our Lady of this church, and before the year was out a son was born to them. Over all of it stood the parish priest: it is to Fr Joseph Grégoire's “persevering energy”, wrote the mission's own chronicler, that “this fine Christian community owes its great church.”`,
            },
            {
              year: `1855`,
              title: `Templum sit duplex, ara sed una`,
              body: `Fr Grégoire got the plan accepted in 1854, and it was not easily done. On 9 August 1855 the bishop came and blessed the foundation stone of the church that stands today. One of the priests made a motto for the design, and it is the whole building in four words: “Templum sit duplex, ara sed una.” Let the temple be twofold, but the altar one — and that one altar for all. Two naves would open apart at their doors and lean toward each other down their length until they met, and where they met there would be one sanctuary and one altar, for everyone who came in at either door.`,
            },
            {
              year: `1855–1872`,
              title: `Twenty-four arches, and no iron in them`,
              body: `It took seventeen years. The work was driven by Fr Joseph Grégoire, whom his chronicler calls the apostle of Vadakenkoulam, and the building was engineered by a Jesuit lay-brother named Joseph Bergenthal, whose office the Society's Roman register for 1872 gives in two words: Ædif. eccl., builder of the church. Between them they turned twenty-four arches that carry their own weight, in lime and palm-toddy mortar, without cement, without iron, and without one wooden beam holding anything up. Halfway through, in 1861, the bishop came again, and three thousand Christians were waiting for him on the road.`,
            },
            {
              year: `1861`,
              title: `Two bells out of France`,
              body: `The bells were cast at Valence in 1861, by the foundry of the widow Grégoire, and the man who paid for them put his name in the bronze: Casimir Grégoire. Fr Joseph Grégoire, who was building the church while they were being made, had been born at Valence himself — donor, founder and priest, one name and one town. They did not ring here for another eleven years. The crates came by sea and got as far as the District Collector's office at Tirunelveli, and there they stayed. What moved them in the end was the metal itself: someone looked at the bells and saw the cross cast into them, and Our Lady with the Child in her arms, and knew they belonged in a Catholic church, and said so to the Collector. In 1872 they were hung at last, one in each of the two towers. People here still say that when the two ring together there is a sweetness in the sound that is heard nowhere else in this country.`,
            },
            {
              year: `1863`,
              title: `What it cost, written in stone`,
              body: `What the seventeen years cost is written beside the church. “The piety of the Christians of Vadakenkoulam raised, near their church, a modest tomb to Fr Eugène Rossignol, who died on 25 January 1863.” He had caught the cholera nursing the Christians of Callikoulam. He was not the last to be laid there. Fr Victor Delpech came back to this village at the end, and the fevers took him, and he died in the arms of Fr Pouget; his stone gives the day, 16 January 1887, and the year of his birth, 1835. Fr Remigius Fernandez followed him in 1899, at seventy-eight. The stones are still legible, and the Latin at the foot of Delpech's says who set them there: his brethren raised this tomb, and the ones around it.`,
            },
            {
              year: `c.1864`,
              title: `A government clerk remembered them`,
              body: `In the mission's returns for about 1864 a British district manual counted three convents in the whole Jesuit mission of Tinnevelly: one at Tuticorin, one at Adeikalapuram, and “A Convent for Native Nuns at Vadakankulam.” It was the only one away from the fishery coast. There were seventeen Indian sisters in the whole mission and twelve European ones, and a house of the Indian sisters stood here, inland, while the great church was still a building site. They were not yet an order: the mission had been gathering Indian women into religious life since 1859, but did not constitute them as a congregation until 1876, so the sisters in this village belonged to those patient years before there was a rule to profess. No parish paper remembers them. A government clerk did.`,
            },
            {
              year: `1872`,
              title: `An open compass, closing on one altar`,
              body: `In 1872 it was finished. The district gazetteer sets the building down without ornament: “two converging naves which meet in a common chancel.” Auguste Jean saw it as an open compass, two arms splayed at the doors, drawing nearer down the length of the building, closing at last on one shared sanctuary. A German visitor put it more simply still: a double church, with one common high altar — in its way a masterpiece of architecture, he thought, bearing brilliant witness to the talent of “our Br Bergenthal”. Over it stand two octagonal towers of ninety-two feet, and inside, the vaults were painted in dyes drawn from plants and trees.`,
            },
            {
              year: `1872`,
              title: `The two days in June`,
              body: `On the 27th of June the bishop arrived, and the village received him at the little church of St Aloysius. Br Bergenthal was there too: the man who had drawn the plan and stood over the work came to see it blessed. The blessing was at five that evening. Then they kept the bishop's own silver jubilee, for it was twenty-five years since his consecration. And on the 29th, the feast of the Holy Apostles, Canoz sang the Pontifical Mass in the new church and declared it dedicated to the Holy Family.`,
            },
            {
              year: `1873`,
              title: `The Red Sea`,
              body: `“What the building of this sanctuary cost him in cares and fatigues, God alone knows,” wrote his chronicler — and a sharper pain came to him afterwards. On the very day the people took possession of their new church, the congregation broke apart. The quarrel went to law, and Fr Grégoire, who had given seventeen years to the building, was obliged to stand up in court and give evidence against a part of his own flock. It made him lose his eating and his sleeping. His strength never came back, and they sent him home to France to see whether it would. Fr Victor Delpech went with him. The ship had just entered the Red Sea when the delirium declared itself; at six the next morning he opened his eyes and could not speak. Delpech anointed him, and about two in the afternoon he gave his soul back to God, after thirty years a missionary. Seventeen of them had gone into this church. It has stood now a century and a half.`,
            },
          ],
        },
        {
          id: `little-rome`,
          span: `1889–1944`,
          heading: `Little Rome`,
          blurb: `A stranger at midnight Mass, a festival chariot, a wall taken down, a new diocese — and the two words a bishop said in 1926 that became the village's second name.`,
          dots: [
            {
              year: `1889`,
              title: `A stranger at the midnight Mass`,
              body: `A traveller came up the road one Christmas Eve and wrote down what he found: at four in the afternoon, the church at the end of a long street hung with bunting, two thousand people waiting to receive him with shouts. He returned before midnight to find both naves nearly full, and none of the noise he had expected. “Silently and stealthily as ghosts the Christians, draped in their long white cloths, entered the church, glided barefoot over the flagstones, and knelt down on the ground, the pale light of a large candelabrum falling upon their gleaming features.” They knelt around a wax Infant Jesus, his arms stretched out towards them, and the two naves sang in turn, each led by its own catechist. Then Communion, and everyone rose: “all distinctions were lost sight of at the Holy Table; they were all the children of God, of one heart, one soul.” One altar for all: what the foundation stone had promised in 1855, a stranger saw happen at the rail.`,
            },
            {
              year: `1891`,
              title: `Over the hills, behind her`,
              body: `Every year in August this village sets Our Lady on a car and takes her through its streets, and every year people come over the hills from Kerala to walk behind her. They were doing it long before anyone now living can remember. A church historian of Travancore, writing in 1903 about a feast kept here generations earlier, set it down as ordinary settled custom: the Assumption festival at this church, “where several inhabitants of Malabar are accustomed to go annually”. He was not a Catholic and had no reason to flatter the place. In 1891 the village built the car itself — a ther thirty-five feet high, carved by local sculptors out of jackfruit, teak and neem. It carried her through these streets for more than a hundred years, and rests now as the cradle of the Pilgrims' Mother; a newly designed ther has taken its road since 2014. The procession still goes out in the small hours of 15 August, and something close to a hundred thousand people walk with it.`,
            },
            {
              year: `c.1910`,
              title: `The wall inside the church`,
              body: `For a generation a partition ran down the inside of the church Fr Grégoire had built, dividing one nave from the other. About 1910 Fr Adrien Caussanel had it pulled down. When the government's gazetteer of Tinnevelly wanted the truth about this parish, it went to him and printed what he told it. In the government office the priest was reputed to mock at Authority, and the district Collector rode out, as he put it, to track “the dragon” to his lair. He found a man so thin he had never seen the like: for eighteen years, Caussanel told him, he had eaten no solid food, only milk and gruel, and there was no piety in it: it was the one way he could master his dyspepsia. He knew drugs and simples, and was doctor to that village as much as priest. A furious quarrel was running between him and a good part of his congregation, and the Collector noticed that he served them anyway: “his affection for his wayward sheep seemed unaffected by their waywardness.” When he died in 1930 his own Society's necrology said it without hedging: for nearly forty years, “the great missionary, the saint of the mission.” What the motto on the foundation stone had promised in 1855, the building was finally allowed to be: twofold, and one.`,
            },
            {
              year: `c.1905–1920`,
              title: `The priest who sat up with the old papers`,
              body: `Some time about 1905 a Frenchman came to this parish and stayed the better part of fifteen years. What he did with his evenings the Jesuits' own magazine records without ceremony: Fr Adrien Caussanel wrote “diaries, a history of the country”, and he “searches out the old manuscripts and deciphers them”. Somewhere in this village lay older papers: registers, letters, whatever two centuries of priests had left behind. He sat down with them, night after night, and worked out what they said. He was the parish priest of an inland village a long way from anywhere, and he spent the hours he had left gathering up its past, so that the people among whom he lived would not lose it. The book he made out of those papers outlived him, and is kept in the Society's archive still.`,
            },
            {
              year: `1923`,
              title: `Filed among the fishing villages`,
              body: `In 1923 the Diocese of Tuticorin was erected, and Vadakkankulam passed out of the old Diocese of Trichinopoly into the new see. Its first bishop was Francis Tiburtius Roche: a Jesuit, and, as Stephen Neill records, the first Indian bishop of the Latin rite. The Catholic Directory of the following year prints a diocese still being drawn: “The Limits of this new Diocese are not yet quite determined. — It is impossible to give at present the number of Parishes that compose it.” Inside it there is as yet only one district, the Fishery Coast, and this inland parish is filed among the fishing villages: “Vadakankulam (Tinnevelly Dt.) — Revv. Y. Ignatius, G. Michael, Asst. — Cath. 4,765, vills. 17: Churches: brick 1, clay 4.” Neither priest was a Jesuit. After more than two centuries, the care of this parish had passed to the diocesan clergy, in the very year its new bishop was himself a Jesuit.`,
            },
            {
              year: `1926`,
              title: `Chinna Romapuri`,
              body: `Vadakkankulam has a second name: Chinna Romapuri — Little Rome. The village remembers it being given in 1926 by Bishop Roche, the first bishop of Tuticorin, for the church he had come to see; and the parish says what he meant was the design. The souvenir puts it plainly: this building was raised after the manner of the great basilica of Rome, and outside Rome there is nothing else like it. The claim is less extravagant than it sounds. Thirty years before anyone called this place Little Rome, the mission's own historian had already written that seventeen years of Fr Grégoire's labour had given Vadakkankulam “a church probably without equal in the world”. And the name was never only about the building. A government gazetteer, setting the village down with no interest whatever in flattering it, records that after Kamanayakkanpatti this was “the second centre of advance of the ancient Madura mission into Tinnevelly”, and that “in course of time it became the chief centre of the mission in this district.” For the better part of a century the inland mission was run from here. Little Rome was not a compliment paid to a village; it was a description of what the village had been. It has been Little Rome ever since: on the lips of pilgrims, on the boards at the roadside, and in the way people from the next district still tell you where they are going.`,
            },
            {
              year: `1930`,
              title: `The bell heard in the wood`,
              body: `In Rome, Bishop Roche laid his people's homage before Pope Pius XI, and the Pope sent mementoes back for the most deserving Christians of Tuticorin. One of them went to the old sacristan of Vadakenkoulam, brother to a vicar general and to the superior of a convent, and still, at eighty-two, keeping the sacristy of this church. He was given the Bene Merenti medal. The Jesuits' magazine printed his years and his office, and forgot to print his name. It need not have troubled: the office was older than the man. Forty years before, a visitor had been told that the sacristanship here had been held in one family for two hundred years, and had been given the reason. A man and his wife, on pilgrimage to a pagoda, lost their road in a wood full of tigers. Night came down on them; they called on their gods, and nothing answered; and then, a long way off, they heard a bell. They went towards it and came to the door of a hut, where an old man set rice and bananas before them and gave them a bed for the night. In the morning they asked him the way on to the pagoda. He raised his eyes to Heaven, made the sign of the Cross, and began instead to speak to them of the God they had never heard of, and he spoke so well that they went no further. In a short time they were the most fervent Christians in the village. The husband was made sacristan of this church, and thought it no small privilege to ring the bell that had been the means of his own salvation. “The descendants of these good pilgrims are many in number,” the visitor wrote; “I have known several of them who are exemplary priests.”`,
            },
            {
              year: `1944`,
              title: `Fatima Giri`,
              body: `The Rosarians, the first contemplative order of men founded in Asia, were begun at Jaffna in 1928 by Fr B. A. Thomas, and came to Vadakkankulam on 13 February 1944. Antony Susainather, whom the order honours as a Servant of God, had bought four acres with the diocese's help and raised a small chapel and living quarters on it; and on the day the monks arrived, Bishop Roche came out and blessed the place: the same bishop who, eighteen years before, had called this village Little Rome. It was the first Rosarian house on Indian soil. The Fathers keep it still, and with the Servite and the Bethany Sisters they belong to the ordinary week of the parish.`,
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
              title: `The girls were taught their letters`,
              body: `Long before the sisters came, this village is said to have had a girls' school: the Church Missionary Society's Rhenius and Schmid are remembered as opening one here in 1821, and teaching needlework and lace along with the letters. The Sisters of Our Lady of the Seven Sorrows were Indian religious, formed at Trichinopoly in 1876. By 1892 there were sixty-five of them, and of the four houses they kept beyond that city, one was here. Their particular work was the education of girls, and everywhere, it was written of them, “they direct flourishing schools”. The Society's Roman register sets the priest of Vadakkankulam down as chaplain of that convent and director of its school — in 1900, and again in 1914 under Fr Caussanel. In a country where most girls were never taught to read, the girls of this village were taught to read.`,
            },
            {
              year: `c.1922`,
              title: `Lace, thread and the needle`,
              body: `An inspector came to the sisters' needlework school in 1921. From 1922 they were teaching needlework, embroidery, lace, knitting and dress-making, and in 1966 the tailoring school passed wholly into their charge. The R.C. Lace Industrial School and the Osanam Sewing Institute are counted among the works of this parish to this day. They were the second rung of the ladder the village built for its daughters: letters first, then a trade in the fingers, and a wage that did not depend on the rain.`,
            },
            {
              year: `1970`,
              title: `Faith, letters, and no doctor`,
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
              title: `A shrine, and a First Saturday`,
              body: `On 6 August 1993 Bishop S. T. Amalanathar of Tuticorin consecrated the Holy Family Church and proclaimed it a sacred shrine. With the honour came the First Saturday of every month — a novena and adoration that pilgrims have kept from that year to this one.`,
            },
            {
              year: `2014`,
              title: `A new chariot takes the road`,
              body: `In 2014 the parish had a new festival chariot of the Assumption designed and built, and the car the village had carved in 1891 came off the road after a hundred and twenty-three years of processions. In those same years the Calvary chapel of the Apparition shrine was completed, and statues were set up of St Devasahayam and St Arulanandar — the man who was baptised here, and the man who founded the place.`,
            },
            {
              year: `2021`,
              title: `The kodimaram`,
              body: `On 6 August 2021 Bishop Stephen Antony consecrated the flag-mast, the kodimaram, set up under the parish priest Fr John Britto. It was the opening day of the ten-day Perunkoor feast that runs to the Assumption on the fifteenth — and the same day of the year on which this church had been declared a shrine, twenty-eight years before.`,
            },
            {
              year: `2022`,
              title: `The turban and the chains`,
              body: `On 15 May 2022 Pope Francis canonised Devasahayam Pillai, baptised in this church on 14 May 1745 — the first Indian layman ever raised to the altars. What this church holds of him, it has held a long time. At Christmas 1888 a visiting priest wrote that the most precious memory of his day here was the martyr: “Vadakenkoulam possesses the turban he wore, and the chains taken off at his death.” Fr Pouget opened the reliquary and let them look. That head-cloth, worn by an officer of the Travancore court, is kept here still, and every 15 August it is set out in a glass case for the pilgrims to venerate.`,
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
          // His own page, not /history. The card says "Read more" and used to
          // land the reader on the timeline, where he is one moment among
          // fifty-six.
          href: "/saints/john-de-britto",
        },
      ],
    },
    saintDevasahayam: {
      back: "Saints of Our Parish",
      label: "Saint of Our Parish",
      name: "St. Devasahayam Pillai",
      epithet: "Devasahayam — “God is my help”",
      intro:
        "The officer of Travancore who came to this church in 1745 to be baptised — a baptism the Holy See's own record places here, by name. He was shot for the faith at the Aralvaimozhi lines in 1752 and canonised in 2022, the first layman of Indian birth raised to the altars. His wife lies in this parish's ground.",
      feast: "Feast — 14 January",
      canonised: "Canonised 15 May 2022 by Pope Francis",
      facts: [
        { label: "Birth name", value: "Neelakanta Pillai — born 23 April 1712 at Nattalam, in Travancore" },
        { label: "In the king's service", value: "Officer of King Marthanda Varma; he “held office in the court of the Raja”" },
        { label: "Brought to the faith by", value: "Eustachius De Lannoy, the Fleming who commanded Travancore's armies" },
        { label: "Instructed", value: "Nine months, by Fr Giovanni Battista Buttari, S.J., of this parish" },
        { label: "Baptised", value: "14 May 1745, at the church of Vadakkankulam — the place recorded by the Holy See" },
        { label: "The name he took", value: "Devasahayam — “God is my help”, the Tamil for Lazarus" },
        { label: "Arrested", value: "23 February 1749; about three years in chains" },
        { label: "Martyred", value: "The night of 14–15 January 1752, shot at the Aralvaimozhi lines; buried at Kottar" },
        { label: "Canonised", value: "15 May 2022, St Peter's Square — the first layman of Indian birth to be canonised" },
      ],
      quote:
        "There is no cause for delay. This is no compulsory baptism. I came here to receive the sacraments not by force, but by my own free will and desire. I shall even give up my life to maintain the Truth of which I received the light and of which I am convinced.",
      quoteAttribution:
        "What he answered at this font when Fr Buttari hesitated — set down by C. M. Agur, a Protestant historian of Travancore, in 1903. A nineteenth-century writer reporting an eighteenth-century conversation: transmitted speech, not a minuted record",
      lifeLabel: "His Life",
      lifeTitle: "From the Court of Travancore to the Lines at Aralvaimozhi",
      lifeIntro:
        "Forty years, of which the last three were spent in chains. What follows is told from the books, and each chapter says what it rests on.",
      noteLabel: "Note",
      alts: {
        court:
          "Painting — a Travancore nobleman in a white dhoti kneels in prayer on a rock above a river, gold ornaments at his neck and wrists, the palace and its towers behind him in the morning light",
        font:
          "Painting — inside a candlelit chapel, a Jesuit in a black cassock pours water over the head of a kneeling man while a catechist holds a candle; the convert's turban and jewels lie set aside on a table",
        timber:
          "Painting — a mounted courtier in a purple coat raises his hand to a bowing man on a forest road, beside a bullock cart loaded with squared timber, a half-built stone church rising behind",
        chained:
          "Painting — St Devasahayam kneeling in chains on rocky ground at first light, hands clasped at his breast, spearmen watching from the shadows, a water pot beside him",
        gnanapoo:
          "Photograph — the tomb of Gnanapoo Ammal in the parish ground: a white arched memorial sheltering an old dark stone cross, with a Tamil plaque naming her",
      },
      sections: [
        {
          key: "court",
          heading: "A Soldier of the King",
          body: "He was born Neelakanta Pillai on 23 April 1712 at Nattalam, in the kingdom of Travancore, and entered the army of King Marthanda Varma in 1729. He rose to high office at the court and was entrusted with command. A British administrator writing the religious history of Travancore in 1901 — a Protestant with no interest whatever in this parish — records him plainly as a man who “held office in the court of the Raja”, and gives his age at his conversion as thirty-two. Then came a run of reverses: livestock dead, crops ruined, losses that rank and royal favour could do nothing about, and a sorrow that settled on him and would not lift. The priest who later instructed him called him, simply, melancholic.",
          note: "",
        },
        {
          key: "lannoy",
          heading: "The Fleming Who Told Him the Story of Job",
          body: "Eustachius De Lannoy had arrived in Travancore as an enemy. Taken prisoner at Colachel in 1741, he was brought into the king's service instead of executed, and rose to command his armies; he was also, the chronicles say, “a most excellent Christian”. To the grieving officer beside him he spoke of the imperishable goods promised to those who serve the one true God, and he told him the story of Job — a man stripped of everything who did not let go. The words fell on him, the old account remembers, “like a heavenly balm”.",
          note: "",
        },
        {
          key: "font",
          heading: "Baptised at This Font, 14 May 1745",
          body: "De Lannoy sent him here with a letter of recommendation, to Fr Giovanni Battista Buttari, the Jesuit then serving the Christians of Vadakkankulam. Buttari instructed him for nine months and was in no hurry: he foresaw exactly what a conversion at that rank would cost — the anger of his own people, the enmity of the court, the certain loss of his office — and judged it necessary to defer the grace. The man's answer was that having found the true God he would not leave him, though it cost him every advantage of this world and life itself. On 14 May 1745 Fr Buttari baptised him and gave him the name Lazarus, which in Tamil is Devasahayam: God is my help.\n\nThis is the best-attested fact this village possesses, and none of it comes from us. Vatican News names “the Catholic church of Vadakkankulam village”. L'Osservatore Romano — in a notice written by the Vice-Postulator of the cause — names the priest, the nine months and the day.",
          note: "14 May is the best-attested date; a minority of canonisation-era accounts give 17 May. Note also that the rite of canonisation itself recites only the name: the place and the date come from the Holy See's biographical record, which is why this page says the baptism here is recognised by the Holy See, and never that it was proclaimed at the canonisation.",
        },
        {
          key: "godfather",
          heading: "His Godfather, the Man Who Followed a Bell",
          body: "His godfather was this parish's own catechist, Gnanaprakasam Pillai. He had been Chidambaram Pillai, a temple priest of Vittapuram near Palayamkottai, and he was on pilgrimage to Cape Comorin with his wife when, somewhere near this village, he heard the sound of a church bell. He followed it to the chapel of the Holy Family, found the Mass being said, asked for instruction, and was baptised — taking the name Gnanaprakasam, the light of knowledge, his wife taking the name Anandai. A house was built for him here and he was made catechist, travelling with the missionary through Travancore and the Pandiyan country. Years later he stood as godfather to the martyr. He is also, as it happens, the man to whom one modern scholar attributes the establishment of this church, in place of de Britto.",
          note: "The parish's own history dates his conversion to the time of Fr Prosper Giuliani, 1728–33, and elsewhere heads the same entry 1743. That is an inconsistency inside the parish's own record rather than a dispute between sources, and it is left standing.",
        },
        {
          key: "timber",
          heading: "The Errand for Timber",
          body: "Fr Buttari was building a church and was short of wood for it, and he asked Devasahayam to go and obtain the timber from the king's government. The errand brought him before a man of great credit at court who had long been his friend — and who used the meeting to demand that he give up his new faith. A dispute followed, and the friend lost it. Humiliated, he swore: “Either I will make you renounce your religion, or you will pay for it with your head.” Devasahayam answered him in kind, and the insult was never forgiven. The whole storm broke, in the end, over a request for building timber.",
          note: "Mismatch, and both readings are kept. The parish has always told this as the timber for the church HERE — which is why it holds that its own building and the martyrdom are bound together at the root. Besse, the mission's own historian, writes instead that Fr Buttari was building a church for the community at Nemam, and sent him to the prime minister, Rama Ayan Dalawa, for that wood. Nothing on this page decides between them.",
        },
        {
          key: "seized",
          heading: "Arrest, 23 February 1749",
          body: "The warrant was got from the king by intrigue. Devasahayam surrendered without resistance and asked only to say goodbye to De Lannoy. “Courage,” the captain told him; “the moment has come to prove you are a worthy soldier of Jesus Christ.” A missionary was brought to him secretly to hear his confession. Brought before the king he confessed Christ and was sentenced to death — and then the sentence was lifted, the auguries having declared that the execution would bring calamity on the kingdom. The chronicle records the convert's reaction to his own reprieve: he was in great regret, “fearing for a moment that God did not judge him worthy of the crown”.",
          note: "",
        },
        {
          key: "buffalo",
          heading: "Paraded on a Buffalo",
          body: "Unwilling now to kill him but set on breaking him, the king had him carried from village to village with his hands bound behind him, mounted on a buffalo and garlanded with erukku, the crowds urged to abuse him as he passed. He took it, says the chronicle, as a share in the humiliations of his Saviour. Then came the beatings — rods set with thorns until his body was one wound, and ground pepper rubbed into the cuts. To all of it he said only: “O Jesus, it is for love of you that I suffer”, and sometimes added, “and for the expiation of my sins.” When they ground the powder into his face he told them not to spare his eyes, “for in my youth they were instruments of sin.”",
          note: "The chroniclers also tell that when his guards gave him sea-water on the burning sand he drank it and found it fresh and without bitterness. That is told as a wonder in a devotional life, not as an investigated miracle, and the page passes it on as exactly that.",
        },
        {
          key: "chained",
          heading: "Chained to a Tree, Seven Months",
          body: "Shut in a dungeon at Trivandrum he drew such crowds — Christians and the merely curious, whom he never failed to teach — that the king had him taken out at night to a desert place three leagues off and chained to a tree, unable to take a step or even to stand upright. He stayed so for seven months, in the sun and in the storms, until his guards were moved to pity and lengthened the chain and raised a thatch over him. He used that small liberty to write to De Lannoy, telling him where he was and asking for a priest who would bring him “the Bread of the strong”. De Lannoy did as he asked, and the Eucharist came to him in the wilderness. Word of the place spread, and the desert became a pilgrimage.",
          note: "",
        },
        {
          key: "night",
          heading: "The Night of 14 January 1752",
          body: "Unable to silence the crowds, the king at last pronounced the sentence. Soldiers came in the middle of the night and told him he was being moved to another prison. “Why do you dissimulate?” he answered them. “I know where you are taking me; let us go without delay.” At the place he asked for a few moments to pray, then rose: “I have done my duty; it is for you to do yours.” They shot him — the Vice-Postulator's account says five bullets — and he fell pronouncing the names of Jesus and Mary, and a second volley finished it. It was a little before midnight, between the fourteenth and the fifteenth of January 1752, at the Travancore lines by the Aralvaimozhi gap.",
          note: "Two things this page will not smooth over. The spot is universally called Kattadimalai today, but no source of the period names it — the witnesses describe the lines at the Aralvaimozhi gap and go no closer than that. And Auguste Jean's text of 1894 prints the year as 1742, which is impossible against a baptism in 1745; the Holy See's own “Lazarus, known as Devasahayam (1712–1752)” settles it.",
        },
        {
          key: "kottar",
          heading: "The Body That Could Not Come Here",
          body: "His body was gathered up and carried to Kottar, near Nagercoil, and buried in the church of St Francis Xavier. The Te Deum was sung for him in the cathedral at Cochin, and the bishop preached the panegyric himself. This parish wanted him. A Malayalam life of the martyr, printed in 1930, records why it did not get him: there was no royal order permitting a body to be carried out of the kingdom, and so the intention of bringing Devasahayam Pillai's sacred body to Vadakkankulam “could not be achieved.”",
          note: "That Malayalam life of 1930 is not in the shrine's bibliography — it surfaced only when the corpus was searched in Malayalam script — so it carries no chip below. It is recorded here as what it is: one late witness to an intention.",
        },
        {
          key: "gnanapoo",
          heading: "Gnanapoo Ammal, Who Stayed",
          body: "His wife was Bhargavi Ammal, baptised here after him with the name Theresa — in Tamil, Gnanapoo, the flower of knowledge. Eight days before his death he sent her word to hold to the faith, and to settle at Vadakkankulam. She did. She died in 1766 and lies in the parish's own ground, and her tomb is still standing: the Tamil plaque names her as the wife of the martyr Devasahayam Pillai and gives the year of her death — a date no book on this project supplied. An old black cross cut with INRI stands in the arch behind it, plainly older than the tiled surround built around it since.",
          note: "The stone calls her Gnanappu Ammal; Ammal is the Tamil honorific, “lady”. Theresa is her baptismal name from the written sources. Both are right, and neither should be “corrected” into the other.",
        },
        {
          key: "altars",
          heading: "Venerable, Blessed, Saint — and Patron",
          body: "The cause was opened as a diocesan inquiry in 1993 and closed in 2008; Rome found it valid in 2010. He was declared Venerable on 28 June 2012 and beatified at Nagercoil on 2 December 2012, before something like a hundred thousand people. A healing in 2013 was recognised as the miracle on 21 February 2020. On 15 May 2022 Pope Francis canonised him in St Peter's Square, one of ten that day — “Lazzaro, detto Devasahayam” — the first layperson of Indian birth ever raised to the altars; forty-nine people of this parish were in Rome to see it, led by their parish priest. And on 15 October 2025 he was proclaimed Patron of the Laity in India.",
          note: "",
        },
      ],
      evidence: {
        label: "The Evidence",
        title: "How Much of This Is Proved",
        intro:
          "This shrine cites its sources, and it will not dress a tradition as a document. On this page the balance falls the other way from the founder's: nearly everything here is externally documented, and the few things that are not are named as such.",
        rows: [
          {
            tier: "documented",
            heading: "The strongest fact this village has",
            body: "That he was baptised at this church, in 1745, by Fr Buttari. Vatican News names the church; L'Osservatore Romano, in a notice by the Vice-Postulator of the cause, names the priest, the nine months and the day; and the canonisation of 15 May 2022 seals “Lazarus, known as Devasahayam (1712–1752)”. Alongside the Holy See stand two Protestant historians of Travancore, Mackenzie in 1901 and Agur in 1903, who had no reason on earth to flatter a Catholic parish and who independently give the man's standing, his age, the place — and his own words at the font.",
          },
          {
            tier: "tradition",
            heading: "What descends from a single telling",
            body: "The tortures in their detail, the sweetened sea-water, the seven months on the chain, the words spoken on the last night. These reach us through the Jesuit chroniclers writing a century later — Bertrand in 1847, Auguste Jean in 1894 — and both descend from Fr Buttari's own manuscript account of the man he had baptised. They are one witness family, however many books repeat them, and the page does not stack them to look like corroboration.",
          },
          {
            tier: "tradition",
            heading: "Where the sources disagree",
            body: "The timber: the parish says it was for the church here, Besse says it was for Nemam. The place of death: everyone now says Kattadimalai, no source of the period names it. And the relic. Auguste Jean, writing in 1894, says this church holds “a part of his garment and the chains with which he was bound”; the 1915 genealogy of the village's catechist families says a turban and a sword; another scholar says a turban and a shawl; the diocese today speaks of the turban. The chains, at least, are accounted for — they were not lost, but given to Rome for the cause.",
          },
        ],
        closing:
          "The parish's claim on him needs none of the doubtful parts. He came to this church to be baptised, and he went out from it to die.",
      },
      bond: {
        label: "Our Parish Bond",
        title: "Why Vadakkankulam Holds Him as Its Own",
        intro:
          "Devasahayam belongs to the whole Indian Church now. But four things about him are ours and can be nobody else's: the font, the errand, the grave in our ground, and the relics on our altar.",
        pillars: [
          {
            heading: "Baptised at this font, 1745",
            body: "Not parish memory — the Holy See's own record of the cause names this church as the place, and gives the day. Whatever else is uncertain in three hundred years of this village's history, this is not.",
          },
          {
            heading: "It began with timber for a church",
            body: "The errand that destroyed him was a request for building wood. The parish has always held that the wood was for this church, so that its own walls and his martyrdom begin in the same moment — though the mission's own historian puts that church at Nemam, and the page says so.",
          },
          {
            heading: "His wife is buried in our ground",
            body: "Eight days before he died he told Gnanapoo Ammal to keep the faith and settle here. She did, she died in 1766, and her tomb stands in the parish cemetery with its old stone cross — the one thing in this story you can still walk up to and touch.",
          },
          {
            heading: "His relics are kept here",
            body: "As long ago as 1894 a Jesuit historian recorded that the church of Vadakkankulam possesses a part of the garment he wore and the chains with which he was bound. They have been on this ground since the year he died.",
          },
        ],
      },
      today: {
        label: "In This Parish",
        title: "Devasahayam Today",
        intro:
          "The saint canonised in Rome in 2022 is kept here in three ordinary, continuous ways.",
        items: [
          {
            heading: "The relics",
            body: "A part of his garment and his captivity chains have been kept at this church since his death — attested in print as early as 1894. The diocese today speaks of the turban among them; the chains themselves were taken to Rome for the cause, which is where they went and not, as is sometimes said, lost on the road.",
          },
          {
            heading: "His grotto, and his statue",
            body: "A St Devasahayam grotto stands at Mangammal Salai in the parish. In the Calvary chapel of the Apparition shrine his statue was set up beside Arulanandar's under Fr Thadeus Rajan, parish priest from 2013 to 2018 — the man baptised here and the man the parish counts as its founder, side by side.",
          },
          {
            heading: "Two days in the year",
            body: "14 January is the martyr's feast, kept wherever he is honoured. 14 May is the day he was baptised — and that day belongs to this church in a way it can belong to no other.",
          },
        ],
      },
      related: {
        heading: "Read on",
        items: [
          {
            title: "St John de Britto",
            body: "Arulanandar — the Jesuit from whose coming in 1685 this parish counts its founding, and the martyr of Oriyur.",
            href: "/saints/john-de-britto",
            cta: "His page",
          },
          {
            title: "The full history of the parish",
            body: "Three hundred years in eight chapters, from Santhaayi's cross to the shrine — every moment sourced, and every doubt printed.",
            href: "/history",
            cta: "The history",
          },
          {
            title: "Feasts and Mass times",
            body: "The parish year, including the martyr's feast on 14 January and the day of his baptism in May.",
            href: "/mass-timings",
            cta: "The calendar",
          },
        ],
      },
      sources: {
        heading: "Sources",
        body: "This page is built from the Holy See's own record of the cause — Vatican News, L'Osservatore Romano of 5 December 2012 by the Vice-Postulator, and the canonisation of 15 May 2022; from two Protestant historians of Travancore, Samuel Mackenzie (1901) and C. M. Agur (1903); from the Jesuit mission histories of Joseph Bertrand (1847) and Auguste Jean (1894), both preserved in the parish's Maduré Mission library; from Besse's history of the mission in the parish's own English typescript; from Margherita Trento's work on the catechists and J. Rosario Narchison on how this tradition descends; from the tomb of Gnanapoo Ammal itself; and from the parish's own records. Each chapter above names the witnesses it rests on. Every one of them is listed in full on the Sources page.",
        chipsLabel: "Every source on this page",
      },
    },
    saintDeBritto: {
      back: "Saints of Our Parish",
      label: "The Founder of Our Parish",
      name: "St John de Britto",
      // “The joy of grace”, harmonised with the history page, which renders
      // Arulanandar the same way. The two pages used to gloss the one name two
      // different ways on one site.
      epithet: "Arulanandar — “the joy of grace”",
      intro:
        "The Portuguese Jesuit who reached this village on horseback in the years when the whole Madurai Mission was in his charge, and whom Vadakkankulam has remembered ever since as the founder of its first chapel. He was beheaded for the faith at Oriyur on 4 February 1693, and to the Tamil Church he is Arulanandar.",
      feast: "Feast — 4 February",
      canonised: "Canonised 1947 by Pope Pius XII",
      facts: [
        { label: "In Tamil", value: "Arulanandar (அருளானந்தர்) — “the joy of grace”" },
        { label: "Born", value: "1 March 1647, Lisbon — into a noble house of the Portuguese court" },
        { label: "Society of Jesus", value: "Entered 1662, aged fifteen; studied at Coimbra" },
        { label: "Sailed for India", value: "March 1673; Goa that September, the Madurai Mission from 1674" },
        { label: "The mission in his charge", value: "Succeeded to the charge of the Madura Mission in 1683; Superior of the Mission, 1685–86" },
        { label: "At Vadakkankulam", value: "The first chapel, 1685 — by the parish's own tradition" },
        { label: "Arrested", value: "8 January 1693; tried and condemned on the 28th; brought to Oriyur on the 31st" },
        { label: "Martyred", value: "4 February 1693 at Oriyur, aged forty-five — nineteen years in the mission" },
        { label: "Raised to the altars", value: "Beatified 21 August 1853 by Pius IX; canonised 22 June 1947 by Pius XII" },
      ],
      quote:
        "On the twenty-eighth of January I was tried and condemned to be shot… I await death, and I await it impatiently. The whole crime of which I am accused is teaching the law of the true God and taking from the idols their worshippers. How glorious to suffer and to die for such a crime!",
      quoteAttribution:
        "From the prison of Oriyur, 3 February 1693 — written the night before his death to the superior of the mission, with a straw for a pen and powdered charcoal for ink",
      lifeLabel: "His Life",
      lifeTitle: "From a Palace in Lisbon to a Stake at Oriyur",
      lifeIntro:
        "Forty-five years, nineteen of them in the Tamil country. What follows is told from the books, and each chapter says what it rests on.",
      noteLabel: "Note",
      alts: {
        forestRoad:
          "Painting — a Jesuit in a pale cloak halts his horse on a red forest road while a woman with a basket of cotton speaks to him; a stone cross stands under a banyan tree behind her",
        chapel:
          "Painting — a Jesuit priest raises his hand in blessing before a small whitewashed chapel of thatch with a wooden cross on its gable, a village family gathered around him",
        harvest:
          "Painting — a Jesuit pours water over the head of a kneeling man outside the thatched chapel while a long line of villagers waits, a catechist reading beside him",
        oriyur:
          "Painting — St John de Britto seated on prison straw by a small oil lamp, writing on a sheet with a straw pen, a guard's spear at the barred window behind him",
      },
      sections: [
        {
          key: "lisbon",
          heading: "A Nobleman of Lisbon",
          body: "João de Brito was born in Lisbon on 1 March 1647, into a noble house of the Portuguese court; his father had been a viceroy of Brazil, and the boy was raised in the palace as a companion of the future King Pedro II. At fifteen he laid aside everything that world had promised him and entered the Society of Jesus. He studied at Coimbra and asked for the Indies — the hardest and most distant field the Society then had. He sailed in March 1673, reached Goa that September, and by 1674 was in the Madurai Mission.",
          note: "",
        },
        {
          key: "sannyasi",
          heading: "The Pandaraswami",
          body: "Seventy years earlier Roberto de Nobili had found every door in Madurai shut against a European, and had opened them by ceasing to look like one. De Britto took the same road. He put off European dress and European food, ate no meat, went on foot from village to village as a pandaraswami — a wandering ascetic — and was known by a Tamil name rather than a Portuguese one. It carried the Gospel into country where a foreigner in foreign clothes could not have gone at all.",
          note: "",
        },
        {
          key: "charge",
          heading: "The Whole Mission in His Charge, 1683",
          body: "“In 1683 Father John de Britto succeeded to the charge of the Madura Mission.” The sentence is not the parish's; it is the district gazetteer's, written by a British civil servant with no interest in this village. Two years later he was made Superior of the Mission outright. Those were the years he spent in the Marava forests, building churches “between the two borders of Muni and Marava, where the peoples of both states could come to be instructed” — and, where there was no church, raising an altar in the open country under a hut of branches.",
          note: "",
        },
        {
          key: "forestRoad",
          heading: "The Priest on the Forest Road",
          body: "This village stood on the old road between Travancore and the Pandiyan country — a convenient halting place for anyone travelling either way, which is exactly why the mission would later put a house here. About 1680 a Christian woman named Santhaayi Ammaiyar had settled in the forest and raised a small roadside cross in the open ground facing her door. The parish's memory is that she was out gathering cotton when a priest came riding by; that she ran to him and asked him to bless her house and her cross; and that he stopped his horse and did. Pate's gazetteer, which owes this parish nothing, records that Fr de Britto “had penetrated as far south as Vadakkankulam.” The cotton field, the horse and the blessing are the village's own memory.",
          note: "The parish's own history offers an alternative and does not hide it: the priest on the road may have been Fr Ignatius da Costa, who would have travelled this way from Malabar to the Fishery Coast. Both readings are kept.",
        },
        {
          key: "chapel",
          heading: "A Chapel of Thatch, 1685",
          body: "More families came, and the cross by Santhaayi's door could no longer hold them. By 1685 there was a church here — a small thing of thatch. That much is not the parish remembering itself: Hardgrave, writing the social history of the Nadar community, states it flatly — “a church was built in 1685” — and both Pate and Bishop Neill attest a congregation formed here by that year. Whose hands raised it is the harder question, and the honest answer is below.",
          note: "No source of the period names the chapel's dedication. The Holy Family title is documented here from the church of 1752, which Besse says was dedicated “just like the first”.",
        },
        {
          key: "harvest",
          heading: "The First Harvest",
          body: "The parish remembers about two hundred baptisms — the first Christians the village ever had, men, women and children brought to the water together. The diocese's own account says “more than 200 people in 1686”, and Bishop Stephen's jubilee message has him come, baptise and build in that year. No book outside the parish's own family carries the number, and we do not pretend otherwise. It is, at least, a modest figure for this man: his biographer counted two thousand seven hundred catechumens baptised in a single stretch of two months.",
          note: "The parish sources put the baptisms in 1685, “on the same occasion” as the chapel; the diocese and Bishop Stephen date them to 1686 and describe a return. The page holds both and asserts neither.",
        },
        {
          key: "recalled",
          heading: "Recalled to Lisbon, and Returned",
          body: "In 1686 he went into the Marava and baptised thousands in a few months. Then he was seized with his catechists, beaten, left for dead and expelled; and in 1687 the mission sent him back to Portugal as its procurator. The court that received him — the king he had grown up beside — pressed him to stay, and offered him what a man of his birth could expect. He refused it. He asked instead to be returned to his Tamil Christians, knowing quite well what that would cost, sailed again in 1690, and was back at his mission by 1691.",
          note: "",
        },
        {
          key: "arrest",
          heading: "Arrested, 8 January 1693",
          body: "He was seized on 8 January 1693. On the twenty-eighth he was tried and condemned to be shot; on the thirty-first he was brought to Oriyur, where sentence was to be carried out. All three dates come from the man himself — he set them down in the letter he wrote on his last night, and it is the reason this part of the story needs no corroboration at all.",
          note: "",
        },
        {
          key: "oriyur",
          heading: "Oriyur, 4 February 1693",
          body: "The governor Murugappa Pillai pronounced the sentence; a soldier named Perumal, famous for his bravery and his ferocity, carried it out. His hands and his feet were struck off and the body fixed to a stake so that no Christian could carry it away — and for three nights, it was said, a light stood over the place, and even the Dutch Calvinists of the coast reported it. The relics were gathered to the superior Francisco Laínez, sent to Pondicherry and on to the Jesuit college at Goa. He was, writes Boero, “forty-five years of age… and nineteen years in the Madurai Mission”. Four years later a Latin martyrology printed at Antwerp fixed the date in its very title: killed in hatred of the faith, the fourth day of February 1693.",
          note: "Faber says the ink of the prison letter was powdered charcoal moistened with his own spittle; Auguste Jean says charcoal diluted in water. The page follows Faber. Both are printed mission historians and neither is parish-side — a genuine conflict, kept in the register.",
        },
        {
          key: "afterwards",
          heading: "What Followed the Blood",
          body: "The King of Portugal obtained from the Raja of Marava the ground where he had died, and had a small church built on it. By 1736 the Bishop of Mylapore was writing to Pope Clement XII that every Wednesday a great multitude went out to the place of the martyrdom; that the Raja had given leave for a church there and supplied most of the materials; and that it had been “erected and dedicated to the Most Blessed Virgin”. Perumal, who had beheaded him, was among the pilgrims — he became a Christian. In the months after the death Laínez baptised fourteen thousand. A martyr's ground that turns into a Marian shrine with a weekly pilgrimage is a pattern this parish would live out, in its own way, a century later.",
          note: "",
        },
        {
          key: "altars",
          heading: "Beatified 1853, Canonised 1947",
          body: "Pius IX beatified him on 21 August 1853; the Roman life by Giuseppe Boero, still one of the fullest accounts of his death, was written for that year. Pius XII canonised him on 22 June 1947, six weeks before India became independent. His feast is kept on 4 February, the day he died — in Rome, across the Tamil country, and in this village.",
          note: "The two papal acts are the public record of the Church rather than a finding of this project's books, all but one of which were printed before 1947.",
        },
      ],
      evidence: {
        label: "The Evidence",
        title: "How Much of This Is Proved",
        intro:
          "This shrine cites its sources, and it will not dress a tradition as a document. Here is exactly what stands behind the story above — including the part that does not stand on anything but memory.",
        rows: [
          {
            tier: "documented",
            heading: "What outside witnesses establish",
            body: "That a church was built at Vadakkankulam in 1685, and that a congregation was formed here by that year. That de Britto succeeded to the charge of the Madura Mission in 1683 and penetrated as far south as this village. That he was condemned, imprisoned at Oriyur and beheaded on 4 February 1693 — attested by his own letter of the night before, by a Latin martyrology printed at Antwerp four years later, and by the Roman life written for his beatification.",
          },
          {
            tier: "tradition",
            heading: "What is the parish's own memory",
            body: "That the priest Santhaayi met on the forest road was de Britto. That he raised the chapel himself and dedicated it to the Holy Family. That about two hundred were baptised. Besse, the mission's own historian, would not assert it either: the missionary who built the church in the new village, he wrote, “is said to be no other than Fr John de Britto, and the year 1685.” He then drew his own line — “here tradition is met with historic documents” — and produced the Annual Letter of 1701.",
          },
          {
            tier: "tradition",
            heading: "What the books do not say",
            body: "No biography of de Britto names this village — not Faber, not Boero, not the 1854 abridgement — and his own prison letter never mentions it; Oriyur is two hundred kilometres north of here. One modern scholar attributes the establishment of the Vadakkankulam church mainly to the catechist Chidambaram Pillai, baptised here as Gnanaprakasam. And the fabric of the village's first stone church is documented to other hands entirely: Fr Buttari laid its foundations and Fr Thomassini completed it in 1752.",
          },
        ],
        closing:
          "None of that unmakes the devotion; it places it. Vadakkankulam's claim on Arulanandar is a claim of memory and of unbroken veneration — and the village has never needed a document in order to keep his feast.",
      },
      bond: {
        label: "Our Parish Bond",
        title: "Why This Shrine Calls Him Its Founder",
        intro:
          "St John de Britto is honoured across the Tamil land. At Vadakkankulam he is honoured as the beginning — the priest the village believes stopped his horse for one woman's cross, and from whom it counts everything that came after.",
        pillars: [
          {
            heading: "The first church, 1685",
            body: "A church of thatch stood here in 1685; the parish has always named him as the one who raised it. Every building since has stood on that ground, and the parish counts its age from that year.",
          },
          {
            heading: "From a hut of branches to Little Rome",
            body: "An unbroken line runs from the thatch to Fr Buttari's brick church of 1752, to the great two-nave church blessed in 1872, to the shrine proclaimed in 1993. Four churches on one piece of ground — and his is the first of them.",
          },
          {
            heading: "The name the village uses",
            body: "Nobody here says “de Britto”. He is Arulanandar, as he was to the catechists who gave evidence at the Roman inquiry of 1695 — the Tamil name he took when he put off his own.",
          },
          {
            heading: "Kept, not merely remembered",
            body: "His feast on 4 February is one of the fixed days of the parish year, his grotto stands in the shrine grounds, and two of the village's anbiyams — the small communities the parish is divided into — carry his name.",
          },
        ],
      },
      today: {
        label: "In This Parish",
        title: "Arulanandar Today",
        intro:
          "He is not a figure the parish reads about. He is a place you can walk to on any evening of the year.",
        items: [
          {
            heading: "The grotto in the shrine grounds",
            body: "A wooden Gothic shrine under a neem tree holds his statue, flanked by St Michael and St Raphael. It was consecrated on 6 August 2019 — the opening day of the ten-day Assumption feast — and the neighbouring families built it with the parish.",
          },
          {
            heading: "Beside St Devasahayam in the Calvary chapel",
            body: "In the Calvary chapel of the Apparition shrine his statue stands beside St Devasahayam's — the man who founded the place and the man baptised in it. Both were set up under Fr Thadeus Rajan, parish priest from 2013 to 2018, who kept the First Saturday devotion there.",
          },
          {
            heading: "His feast, 4 February",
            body: "The parish keeps the martyr's day every February, one of the fixed feasts of a calendar that runs from St Sebastian in January to the ten-day Perunkoor of the Assumption in August.",
          },
        ],
      },
      related: {
        heading: "Read on",
        items: [
          {
            title: "The full history of the parish",
            body: "Three hundred years in eight chapters, from Santhaayi's cross to the shrine — every moment sourced, and every doubt printed.",
            href: "/history",
            cta: "The history",
          },
          {
            title: "St Devasahayam Pillai",
            body: "The layman baptised at this font in 1745 and canonised in 2022 — the parish's second saint, and the best-attested fact about this village.",
            href: "/saints/devasahayam-pillai",
            cta: "His page",
          },
          {
            title: "Feasts and Mass times",
            body: "The parish year, including the feast of St John de Britto on 4 February.",
            href: "/mass-timings",
            cta: "The calendar",
          },
        ],
      },
      sources: {
        heading: "Sources",
        body: "This page is built from the saint's own letter from the prison of Oriyur (3 February 1693); the earliest printed martyrology of his death (Antwerp, 1697); the Roman life written for his beatification by Giuseppe Boero, S.J. (1853); F. W. Faber's English life (London, 1851); Joseph Bertrand's La Mission du Maduré; the Madras District Gazetteer of Tinnevelly (1917); Bishop Stephen Neill and Robert Hardgrave; Besse's history of the mission in the parish's own English typescript; and the parish's own records. Each chapter above names the witnesses it rests on. Every one of them is listed in full on the Sources page.",
        chipsLabel: "Every source on this page",
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
        "Two naves open like a pair of compasses and meet at a single altar. Twenty-four arches turn in lime and palm sap, holding up a roof with no iron in it at all. Twin towers rise ninety-two feet into the sky, and gave the whole village a new name.",
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

      overtureLabel: "Before You Look Up",
      overtureLead:
        "Long before the parish ever said so itself, a stranger did. In 1894, a French Jesuit chronicler looked at this church and wrote that it was “probably without equal in the world.”",
      overtureP1:
        "Others agreed, each in their own words. A German Catholic monthly praised it in 1885 as “a masterpiece of architecture,” and gave the credit to the man who built it: Brother Bergenthal. Even the British gazetteer of the district, with nothing to gain by flattering a mission church, called it simply “the handsome church.”",
      overtureP2:
        "Behind that praise stood two men. Fr Joseph Grégoire spent seventeen years as the building priest, and the plan was his: two naves opening wide at the doors, drawing together as they run east, until they meet at one shared altar. Brother Joseph Bergenthal made it real. Once a soldier in Westphalia, later a Jesuit brother who had studied architecture and walked the great cathedrals of Germany and France, he drew the plans and stood over the builders himself. Between 1855 and 1872 they raised the whole church on lime mortar alone. No iron. No cement. Not one wooden beam holds up the arches overhead.",
      overtureP3:
        "What follows is not a list of those seventeen years. It is the church itself, met the way you would actually meet it: what you would see first, what you would hear, what catches the light once you step inside, and only at the end, what it all means.",
      numbersKicker: "The building, in brief",
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
        "The great church of 1872 is the third to rise on this ground. Both of the churches before it were loved, and both were outgrown.",
      churches: [
        {
          year: "1685",
          title: "A chapel of palm thatch",
          body: "Beside Santhaayi’s wayside cross, St John de Britto blesses a small thatched chapel. Some two hundred people are baptised.",
        },
        {
          year: "1752",
          title: "The church of stone",
          body: "Fr Buttari’s cross-shaped stone church, finished by Fr Tomassini in broad brick from Perungudi. Above its altar the Marian statue stood in a recess with doors that could open or shut. They were open on that October morning in 1803, when the statue began to weep and the bell called the whole village to come and see.",
        },
        {
          year: "1872",
          title: "The great church",
          body: "Bishop Canoz blesses the foundation stone in 1855, under the parish priest Fr Joseph Grégoire, whom his own mission called “the apostle of Vadakkankulam.” Seventeen years later, Canoz returns: a benediction on 27 June 1872, then the solemn dedication Mass two days after. Grégoire dies not long after, at sea, sailing home for his health.",
        },
      ],
      churchesCaption: "The church in an early parish photograph",

      planDrawTitle:
        "The floor plan of the Holy Family Church: one sanctuary, two naves converging, five doors",
      planNote:
        "Redrawn from வரைபடம் 5 in A. Sivasubramanian, Kiristhavamum Sathiyum (2001), the only measured plan of this church ever printed.",
      motto: "TEMPLVM SIT DVPLEX, ARA SED VNA;\nFIDES VNA SIT, VNAQVE MENS.",
      mottoTr:
        "Let the temple be twofold, but the altar one; may they be of one faith, and of one mind.",
      mottoCaption: "Set at the altar of the church blessed in 1872",

      craftLabel: "The Structure",
      craftTitle: "Not a Nail of Iron",
      craftBody:
        "Twenty-four arches span the interior. Twelve of them meet in a single crown over the altar, and not one is carried by cement, iron or a wooden beam. They were turned in lime mortar alone, and they have stood on their own weight for a century and a half. The man behind them was Brother Joseph Bergenthal, a Jesuit lay brother almost no account of this church bothers to name. He had once been a soldier in Westphalia. Asked, later, if he could draw the plan of a building, he simply said he had studied architecture and walked the great monuments of Germany and France. Eleven months after the church was blessed, he died.",
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
          d: "burnt shell and limestone, the binder",
        },
        {
          ta: "கடுக்காய்",
          tr: "kadukkai",
          gloss: "Myrobalan",
          d: "Terminalia chebula, the tannin that hardens it",
        },
        {
          ta: "முட்டை",
          tr: "muttai",
          gloss: "Egg",
          d: "beaten in, for a mortar that sets like stone",
        },
      ],
      recipeNote:
        "This is the recipe the parish itself hands down. The English parish history calls the sap toddy, already fermented; the Tamil sources call it padaneer, fresh from the tree. On the lime, the kadukkai and the egg, every source agrees.",
      craftCaption:
        "The vault above the sanctuary, arches turned without iron, beam or centring",

      creedLabel: "The Meaning",
      creedTitle: "The Church as a Creed",
      creedBody:
        "The parish reads its own building as a set of numbers. It is a tradition kept alive by word of mouth and by a handwritten sheet in the parish's own hand, not by anything the builders of 1855 ever wrote down. Nothing here is merely structural. Every count is a doctrine. Tap a line below and watch it light up on the plan, then read the rest the same way, in the numbers waiting up at the altar.",
      creedReadTitle: "The plan, read as a creed",
      creedReadHint: "Tap a reading to light it on the plan.",
      // `means` is the title of the reading, `what` the feature of the fabric it
      // counts, `note` one sentence of gloss. Titles are capitalised as titles —
      // two of the nine are proper names (the Evangelists, the Trinity), and a
      // list that capitalised only those read as an accident.
      creedReadings: [
        {
          n: "5",
          anchor: "doors",
          means: "The Five Wounds",
          what: "the five doors of the plan",
          note: "The two hands, the two feet, and the side opened by the lance.",
        },
        {
          n: "12",
          anchor: "piers",
          means: "The Twelve Piers",
          what: "four down each nave, set on the measured plan",
          note: "Twelve to carry the roof, as twelve men were sent to carry the Church.",
        },
        {
          n: "3",
          anchor: "arrows",
          means: "The Three Nails",
          what: "three directions in, each one turned toward the cross",
          note: "Three ways into one church, as three nails held one body.",
        },
        // The fourteen moved here from the altar list in July 2026: the parish
        // reads it as the walk itself — the central door up to the cross — so
        // it belongs on the plan, where two arrows now carry it up the corridor.
        {
          n: "14",
          anchor: "stations",
          means: "The Fourteen Stations",
          what: "the walk in, from the central door to the cross",
          note: "The Way of the Cross, walked in fourteen halts from the sentence to the tomb.",
        },
        {
          n: "1",
          anchor: "altar",
          means: "One Lord",
          what: "the single altar every nave meets at",
          note: "However many ways in, there is one table at the end of them.",
        },
      ],
      creedAltarTitle: "And what waits at the altar",
      creedAltarHint: "Tap a reading to find it on the altar.",
      altarPhotoAlt:
        "The carved screen behind the high altar: five arched niches with their statues, the crucifix at the centre, and the dove above it",
      altarPhotoNote: "The high altar, where the rest of the reading waits",
      // Honesty note under the altar list. Two of these four have never been
      // counted on site (KB 02 §4.7c), so they are given without a hotspot;
      // keep this line as long as that is true, and delete it when it isn't.
      creedAltarUncounted:
        "The nine carvings and the arches of the lower row have not yet been counted on the altar itself. They are set down here as the parish's note gives them.",
      creed: [
        // The fourteen used to open this list; it now lives in creedReadings,
        // on the plan, where it can be lit on the centre path.
        {
          n: "5",
          anchor: "upperArches",
          what: "the arches in the upper row of the altarpiece",
          means: "The Five Wounds, Told Again",
          note: "The same five, counted a second time in carved stone above the altar.",
        },
        {
          n: "9",
          anchor: "flowers",
          what: "the flower-cluster carvings",
          means: "The Nine Choirs of Angels",
          note: "Angels, Archangels, Principalities, Powers, Virtues, Dominions, Thrones, Cherubim, Seraphim.",
        },
        {
          n: "4",
          anchor: "lowerArches",
          what: "the arches in the lower row",
          means: "Matthew, Mark, Luke and John",
          note: "The four Evangelists, an arch apiece, set under everything else the altar carries.",
        },
        {
          n: "3",
          anchor: "trinity",
          what: "at the centre of it all",
          means: "Father, Son and Holy Spirit",
          note: "The dove above, the crucified Son below, on the altar's own axis.",
        },
      ],
      creedNoteCaption:
        "The parish’s own note, திருக்குடும்ப ஆலயம்: கட்டிடத்தின் தத்துவம், “the philosophy of the building”",

      towersLabel: "The Skyline",
      towersTitle: "Why They Call It Little Rome",
      towersBody:
        "The name was never really about how tall the towers are. The parish tells it with one simple comparison: the church was built, it says, “like the world-famous great basilica of Rome,” a design found nowhere else in the world except Rome itself. Nothing in the district looked like this before. Soaring twin towers, octagonal from base to spire. A ring of smaller pinnacles crowning them. All raised in a grand Western style no church for miles around had ever attempted. A small Tamil village had taken on the silhouette of a Roman basilica, and in 1926, that was reason enough for the first Bishop of Tuticorin to give Vadakkankulam the name it still answers to: Chinna Romapuri, Little Rome.",
      towersCaption: "The twin towers and the pinnacled roofline",

      bellsLabel: "The Bells",
      bellsTitle: "The Twin Bells from France",
      bellsBody:
        "High in each tower hangs a bronze bell, cast in France in 1861 and carried here by sea. For more than a century and a half, they have called the parish to prayer.",
      bellsBeats: [
        {
          year: "1861",
          title: "Cast in France",
          body: "Casimir Grégoire, a French benefactor, gave the bells to the church. By every account he was kin to the parish priest, Fr Joseph Grégoire, and the bell in the tower still carries his name cast into its bronze: “Donateur Casimir Grégoire.” Beside the lettering sits a cross and an image of the Mother of God bearing the Child Jesus, cast into the same metal. Published accounts have credited the Burdin foundry of Lyon. The bronze itself says otherwise: “Vve Grégoire de Valence (Drôme).” Where the two disagree, the bell gets the last word.",
        },
        {
          year: "By sea",
          title: "The long carriage",
          body: "Packed in wooden crates, the bells cross the sea by ship, land at the port of Madras, and pass through the Collector's office at Tirunelveli before reaching the church.",
        },
        {
          year: "1872",
          title: "Raised into the towers",
          body: "They are hung the very year the church is consecrated, one bell to each tower, and they still ring today, at prayers and at every festival.",
        },
      ],
      bellsOlderLead: "These were not the first bells to sound here.",
      bellsOlder:
        "An older bell once hung in the stone church of 1752. It was that bell that rang out one October morning in 1803, calling the whole village to come and see the Mother whose statue had begun to weep.",
      bellsCaption:
        "The bell in its tower, cast “Vve Grégoire de Valence (Drôme)” and “Donateur Casimir Grégoire”",

      lightLabel: "Light & Colour",
      lightTitle: "Glass, Dye and Gold",
      lightBody:
        "For its first hundred years, the church told a plainer story in glass. The twenty-three traceries around it held ordinary, unmatched panes, and sixteen more windows along the side walls stayed sealed completely shut. They were kept airtight through the whole of the Jesuit years, for a reason the parish still gives simply as “the cold.” Then came 1972, the church's centenary, and the parish filled every tracery with coloured glass at last, and finally let the sealed windows open. What you see today is that gift, a hundred years late: diamond lattices of red, blue and yellow glass caught inside pointed Gothic arches, trefoil rosettes catching the light at their centres, and high over the nave, a rose window sits in the painted vault like a wheel cut from jewels. Inside, the vaults, arches and pillars are painted with flowers and scenery, made not from paint or chemical but from the dyes of plants and trees. Nothing has faded. Nothing has ever been repainted.",
      glassCaptions: [
        "A rose window of jewelled glass set in painted vaulting",
        "Lancet traceries, coloured at the 1972 centenary",
        "Diamond panes and trefoil rosettes",
        "Light falling through the nave toward the eastern doors",
      ],

      imagesLabel: "What It Carries",
      imagesTitle: "The Two Images the Building Holds",
      imagesBody:
        "Two images say what this church is for. One waits over the door you enter by. One waits above the altar you come to.",
      figures: [
        {
          title: "Over the door",
          body: "Above the head-door, inside the porch, stands a polychrome relief of the Holy Family. A dove rests above them in a golden halo, and at the very top, an eye is set inside a triangle, an old Christian symbol for God the Father, in church use a century before Freemasonry ever borrowed it. This is the Counter-Reformation figure of the Two Trinities, heaven and earth crossing together at the Child. It was fixed as a devotional print in Antwerp around 1600, and Jesuit churches have carried it ever since. The figures themselves are original. The gilding and the blue sky behind them are not; that ground was repainted between 2016 and 2022. The parish has its own words for what the relief says: the Holy Family at the head-door invites you in with a gracious face. “Beloved people, come inside and give us your heart!”",
          caption: "The Two Trinities relief over the central door",
        },
        {
          title: "Above the altar",
          body: "Six statues stand at the high altar, beneath its dome, its glass tower and its minaret. The crucified Christ is at the centre, with Our Lady and St Joseph beside him, and above them, St Sebastian, St Antony and St Francis Xavier. The floor is laid in mosaic. The woodwork carries gold leaf, பொன் முலாம், and the parish has never once let it fade.",
          caption: "The high altar, gilded and unfaded",
        },
      ],
      inscription: "மரியே வாழ்க",
      inscriptionGloss:
        "“Hail Mary,” raised in Tamil letters across the gable of the porch. It is the first thing the building says to anyone walking up to it.",

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
      // Three columns, because the footer is the only way in to most of this
      // site — the navbar carries five links and there are a dozen pages.
      // Story · practical · provenance.
      shrine: "The Shrine",
      visit: "Visit",
      record: "The Record",
      rights: "All rights reserved.",
      builtBy: "Website by",
    },
  },
  ta: {
    nav: {
      home: `முகப்பு`,
      history: `வரலாறு`,
      priests: `அருட்தந்தையர் பட்டியல்`,
      mass: `திருப்பலி & திருவிழாக்கள்`,
      festivals: `திருவிழாக்கள்`,
      gallery: `புகைப்படங்கள்`,
      architecture: `கட்டிடக்கலை`,
      contact: `தொடர்பு`,
      faq: `வினா & விடை`,
      sources: `ஆதாரங்கள்`,
      britto: `புனித ஜான் தெ பிரிட்டோ`,
      devasahayam: `புனித தேவசகாயம் பிள்ளை`,
      acknowledgements: `நன்றி`,
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
      // {n} {c} {y} are filled at render — see the note on the English block.
      chronicleLabel: `வரலாற்று ஏடு`,
      chronicleTitle: `இங்கு நடந்த அனைத்தும் எழுதி வைக்கப்பட்டுள்ளன`,
      chronicleBody: `காட்டுவெளியில் ஒரு பெண்மணி எழுப்பிய குருசடி முதல் உரோமையில் ஒரு புனிதர் பட்டம் வரை — {n} தருணங்கள். எந்த ஒன்றும் அது வந்த நூல் இல்லாமல் இங்கே கூறப்படவில்லை; நூல்கள் ஒன்றோடொன்று முரண்படும் இடங்களில் இரு கூற்றுகளையும் இப்பங்கு வெளியிடுகிறது.`,
      chronicleCta: `வரலாற்று ஏட்டைப் படிக்க`,
      chronicleDoorTitle: `{y}-உடன் இது முடிந்துவிடவில்லை`,
      chronicleDoorBody: `{c} அத்தியாயங்கள் முழுவதிலும் இன்னும் {n} தருணங்கள் காத்திருக்கின்றன — கடைசி அத்தியாயம் இன்னும் முடியவில்லை. 1697 முதல் இந்தப் பங்கில் அருட்தந்தை இல்லாத ஓராண்டும் இல்லை; இன்றும் இதில் புதிய பக்கங்கள் சேர்ந்துகொண்டே இருக்கின்றன.`,
      chronicleFrames: [
        {
          year: `கி.பி. 1680 வாக்கில்`,
          chapter: `காட்டிடையே ஒரு வெளி`,
          title: `ஒரு பெண்மணியில் தொடங்கியது`,
          line: `புதரும் மரங்களும் ஒரு குளமும் மட்டுமே இருந்த இடத்தில் சாந்தாயி அம்மையார் தங்கி, வீடு கட்டி, தன் வாசலுக்கு எதிரே வெட்டவெளியில் ஒரு குருசடியை எழுப்பினார். இங்குள்ள அனைத்தும் அதைச் சுற்றியே வளர்ந்தன.`,
        },
        {
          year: `1685`,
          chapter: `காட்டிடையே ஒரு வெளி`,
          title: `காட்டுப் பாதையில் வந்த அருட்தந்தை`,
          line: `பருத்தி பறித்துக்கொண்டிருந்தபோது ஓர் அருட்தந்தை குதிரையில் கடந்து சென்றார். ஓடிச் சென்று தன் குருசடியை ஆசீர்வதிக்கும்படி கேட்டார்; அவரும் குதிரையை நிறுத்தி ஆசீர்வதித்தார். அவர்தான் புனித அருளானந்தர். தெற்கே இவ்வூர் வரை வந்தார், அதற்கு மேல் செல்லவில்லை.`,
        },
        {
          year: `1745`,
          chapter: `திருவுருவமும் புனிதரும்`,
          title: `தாமதிக்க எந்தக் காரணமும் இல்லை`,
          line: `அத்தகைய உயர்நிலையினரின் மனமாற்றம் துன்புறுத்தலைக் கொண்டுவரும் என்பதால் அருட்தந்தை தள்ளிப்போட்டுக்கொண்டே இருந்தார். அரசரின் அதிகாரி பதிலளித்தார்: “நான் அறிந்த சத்தியத்தைக் காக்க என் உயிரையும் தருவேன்.” மே 14 அன்று இங்கே திருமுழுக்குப் பெற்றார். சொன்னபடியே செய்தார்.`,
        },
        {
          year: `1803`,
          chapter: `கண்ணீர் சிந்திய அன்னை`,
          title: `நேரமல்லாத நேரத்தில் ஒலித்த மணி`,
          line: `ஐப்பசி மாதத்து ஒரு வெள்ளிக்கிழமை முற்பகலில் மணி ஒலிக்க, ஏன் என்று அறிய ஊரார் வயல்களிலிருந்து ஓடிவந்தனர். அன்று அவர்கள் கண்டதாகச் சொன்னதை, அதற்குப் பிந்தைய இருநூற்று இருபத்து மூன்று ஆண்டுகளாக ஒவ்வோர் ஐப்பசியிலும் பங்கு நினைவுகூர்ந்து வருகிறது.`,
        },
        {
          year: `1872`,
          chapter: `மாபெரும் இரட்டை மண்டப ஆலயம்`,
          title: `பதினேழு ஆண்டுகள், இரும்பே இல்லாமல்`,
          line: `சுண்ணாம்பும் பனங்கள்ளும் சேர்ந்த சாந்து, இருபத்து நான்கு வளைவுகள், தொண்ணூற்று இரண்டு அடி உயர இரு கோபுரங்கள் — ஆலயத்தின் முழு நீளத்திற்கும் பக்கம் பக்கமாகச் சென்று ஒரே பீடத்தில் சங்கமிக்கும் இரு மண்டபங்கள். இதைப் போன்ற இன்னொன்று இல்லை.`,
        },
        {
          year: `1926`,
          chapter: `சின்ன ரோமாபுரி`,
          title: `சின்ன ரோமாபுரி`,
          line: `தூத்துக்குடியின் முதல் ஆயர் இங்கு வந்து, ஊரைக் கண்டு, அதைச் “சின்ன ரோமாபுரி” என்று அழைத்தார். ஆலயம், பள்ளிகள், துறவு மடங்கள், நான்காயிரம் கத்தோலிக்கர் — இவற்றையே அவர் கருதினார். நூறு ஆண்டுகளுக்குப் பிறகும் ஊர் அதே பெயரால்தான் அறியப்படுகிறது.`,
        },
        {
          year: `2022`,
          chapter: `திருத்தலமும் புனிதரும்`,
          title: `தலைப்பாகையும் சங்கிலிகளும்`,
          line: `இந்தத் தீர்த்தத்தில் திருமுழுக்குப் பெற்ற அந்த அதிகாரி, இந்தியாவின் முதல் பொதுநிலைப் புனிதரானார். ஏழு மாதங்கள் அவரைப் பிணைத்திருந்த சங்கிலிகள், அனைத்தும் தொடங்கிய இந்த ஆலயத்திலேயே பாதுகாக்கப்படுகின்றன.`,
        },
      ],
      weepingLabel: `1803 ஐப்பசி 7 · அக்டோபர் 23`,
      weepingTitle: `அன்னையின் திருமுகம் நனைந்திருந்தது என்றார்கள்`,
      weepingBody1: `ஒரு தலைமுறைக் காலமாக இயேசு சபை அருட்தந்தை எவரும் இல்லாதிருந்த ஊரில், ஐப்பசி மாதத்து ஒரு வெள்ளிக்கிழமை முற்பகல். நேரம் அல்லாத நேரத்தில் மணி அடிக்க, ஏன் என்று அறிய மக்கள் வயல்களிலிருந்து ஓடிவந்தனர்.`,
      weepingBody2: `கடலிலிருந்து வந்த பெட்டியிலிருந்து அருட்தந்தை புத்தாரி எடுத்து வைத்த அந்தத் திருவுருவம் கண்ணீர் சிந்திக்கொண்டிருந்தது என்பதே அன்று அவர்கள் சொன்னது; இருநூற்று இருபத்து மூன்று ஆண்டுகளாகச் சொல்லிக்கொண்டே வருவதும் அதுவே.`,
      weepingHonest: `இது ஊரிலும் மறைமாவட்டத்திலும் நிலவும் ஒரு பக்தி மரபு; இயேசு சபை வரலாற்றாசிரியர் லெயோன் பெஸ் இதைப் பதிவுசெய்துள்ளார். இது வத்திக்கானின் விசாரணைக்கு உட்பட்டது அல்ல. அன்று முதல் ஒவ்வோர் ஆண்டும் அக்டோபர் 22–23 அன்று பங்கு இதனை நினைவுகூர்ந்து வருகிறது — ஆண்டு 1803, 1805 அல்ல.`,
      weepingCta: `மூன்று பதிவுகளையும் படிக்க`,
      fathersLabel: `பங்கு அருட்தந்தையர் பட்டியல்`,
      fathersTitle: `அறுபத்தொன்பது அருட்தந்தையர். அருட்தந்தை இல்லாத ஓராண்டும் இல்லை.`,
      fathersBody: `1697 முதல் இந்தப் பங்கு தன் அருட்தந்தையரை எண்ணிட்டு வருகிறது; ஒவ்வொருவரின் பெயரையும் காத்து வைத்திருக்கிறது. அவர்களுள் சுமார் பதினைந்து பேரின் வாழ்க்கையை — அவர் கட்டியது, அவர் மறுத்தது, அவர் இறந்த விதம் — ரோமிலுள்ள இயேசு சபைச் சுவடிக் கிடங்கும், பிரெஞ்சு மறைப்பணி வரலாறுகளும், பங்கின் சொந்த நாட்குறிப்புகளும் காத்து வைத்துள்ளன.`,
      fathersBody2: `பதினொரு முகங்கள் மட்டுமே எஞ்சியுள்ளன. மீதி ஐம்பத்து நான்கு பேர் ஒரு பெயரும், அவர் பணியாற்றிய ஆண்டுகளும் மட்டுமே. முந்நூறு ஆண்டு ஆவணத்தின் நேர்மையான வடிவம் இதுதான் — இது ஒரு குறையல்ல.`,
      fathersStat1: `பணிக்காலங்கள்`,
      fathersStat2: `முதல்`,
      fathersStat3: `எஞ்சிய முகங்கள்`,
      fathersCta: `பட்டியலைத் திறக்க`,
      rhythmLabel: `பங்கின் தாளலயம்`,
      rhythmTitle: `நாங்கள் ஒன்றுகூடும் நேரங்கள்`,
      rhythmYearBand: `ஆண்டு`,
      rhythmWeekBand: `வாரம்`,
      rhythmCta: `முழு நாட்காட்டியும் நேரங்களும்`,
    },
    history: {
      label: `எங்கள் பாரம்பரியம்`,
      title: `தலைமுறைகள் சுமந்து வந்த கதை`,
      intro: `ஒரே ஊரின் முந்நூறு ஆண்டுகள், தொடக்கம் முதல் இறுதிவரை ஒரே கதையாக — தென்னகக் காட்டில் ஒரு பெண்மணி தம் வீட்டு வாசலில் நட்டு வைத்த சிலுவையிலிருந்து, சின்ன ரோமாபுரி என்று அழைக்கப்படும் மாபெரும் இரட்டை மண்டப ஆலயம் வரை.`,
      contentsLabel: `உள்ளடக்கம்`,
      contentsHint: `கீழே உள்ள அத்தியாயங்களில் ஒன்றைத் தேர்ந்தெடுத்தால் நேராக அங்கேயே செல்லலாம்; முந்தையவற்றை உருட்டிக் கடக்க வேண்டியதில்லை.`,
      chapterWord: `அத்தியாயம்`,
      biblioLink: `முழு நூற்பட்டியல்`,
      noteLabel: `குறிப்பு`,
      navPrev: `முந்தையது`,
      navNext: `அடுத்தது`,
      navPrevChapter: `முந்தைய அத்தியாயம்`,
      navNextChapter: `அடுத்த அத்தியாயம்`,
      navTapAgain: `செல்ல மீண்டும் தட்டுங்கள்`,
      eras: [
        {
          id: `clearing-in-the-forest`,
          span: `1542–1693`,
          heading: `காட்டிடையே ஒரு வெளி`,
          blurb: `பங்கு உருவாவதற்கு முன் இருந்தவை மூன்றே: ஒரு கடற்கரை, காட்டைக் கிழித்துச் சென்ற ஒரு பாதை, தம் வீட்டு வாசலுக்கு வெளியே ஒரு சிலுவையை நட்டு வைத்த ஒரு பெண்மணி.`,
          dots: [
            {
              year: `1542–1544`,
              title: `ஏற்கெனவே கிறிஸ்தவமாய் இருந்த கடற்கரை`,
              body: `1542-ஆம் ஆண்டின் இறுதியில், தென்கோடியின் முத்துக்குளிக்கும் கடற்கரையில் பாஸ்க் நாட்டு அருட்தந்தை ஒருவர் கரையிறங்கினார்; பணி ஏற்கெனவே தொடங்கிவிட்டிருப்பதைக் கண்டார். அதற்குப் பத்தாண்டுகளுக்கு முன்பே, அருட்தந்தை மிக்கேல் வாஸ் அவர்களும் அவருடன் இருந்த குருக்களும் முப்பது கிராமங்களைச் சேர்ந்த இருபதாயிரம் பரவர் மீனவ மக்களைத் திருச்சபையில் ஏற்றுக்கொண்டதாகச் சொல்லப்பட்டது. அவர்களுக்குக் கற்பிக்கவே சவேரியார் வந்தார். கையில் ஒரு மணியை ஏந்தி ஊர் ஊராய் நடந்தார்; முதலில் குழந்தைகளைக் கூட்டி, பிறகு அவர்களின் பெற்றோரையும் கூட்டி, விசுவாசப் பிரமாணத்தையும் செபங்களையும் தமிழில் சொல்லிக் கொடுத்தார் — முப்பது ஊர்களும் அவரைக் கேட்டு முடிக்கும் வரை. ஆனால் அவர் ஒருபோதும் உள்நாட்டை நோக்கித் திரும்பவில்லை. மணலின் மேல் எழுந்த அந்த இயக்கத்தில் உள்நாட்டு ஊர் ஒன்றுகூடச் சேரவில்லை; அலைகளுக்குக் கிழக்கே ஒரு நாள் நடைத் தூரத்தில் கிடந்த காட்டுநாடு, எப்போதும் போலவே தன் போக்கில் சென்றுகொண்டிருந்தது.`,
            },
            {
              year: `1606`,
              title: `உள்நாட்டை நோக்கித் திரும்பிய பணிக்களம்`,
              body: `அதன் பிறகும் அறுபது ஆண்டுகளுக்கு விசுவாசம் கடற்கரையோடேயே நின்றது. கிறிஸ்தவம் “இந்தியாவின் மதில்களுக்கு வெளியேயே முகாமிட்டுக் கிடந்தது” என்று ஒரு வரலாற்றாசிரியர் எழுதினார். பின்னர், 1606-ஆம் ஆண்டு நவம்பர் 10-ஆம் நாள், தூத்துக்குடியிலிருந்து மதுரையை நோக்கி ஒரு சிறு குழு புறப்பட்டது; அவர்களுள் உரோமை உயர்குடி ஒன்றின் மகனான ரொபேர்ட்டோ தெ நொபிலியும் ஒருவர். ஐரோப்பிய உடையைக் களைந்து, “அனைத்தையும் துறந்தவன்” எனப் பொருள்படும் சந்நியாசியின் வாழ்வை ஏற்கும் வரை அவர் முன் எல்லாக் கதவுகளும் அடைத்தே கிடந்தன. தமிழையும் வடமொழியையும் கற்றார், நாளொன்றுக்கு ஒரு வேளையே உண்டார் — கதவுகள் திறந்தன. அவர் திறந்துவிட்ட அந்த உள்நாட்டுப் பணிக்களம் ஒருவர் கையிலிருந்து இன்னொருவர் கைக்குக் கடத்தப்பட்டு, 1683-ஆம் ஆண்டில் லிஸ்பன் அரச மாளிகையைச் சேர்ந்த போர்த்துகீசிய இயேசு சபை அருட்தந்தை ஒருவரின் கைக்கு வந்தது: ஜான் தெ பிரிட்டோ. மதுரையிலிருந்து அவர் தெற்கே வந்தார்.`,
            },
            {
              year: `சுமார் 1680`,
              title: `சாந்தாயி அம்மையாரும் அவரது சிலுவையும்`,
              body: `சுமார் 1680-ஆம் ஆண்டில், சாந்தாயி அம்மையார் என்னும் கிறிஸ்தவப் பெண்மணி தம் குடும்பத்துடன் தோப்புவிளையிலிருந்து புறப்பட்டு, அப்போது காடாக மட்டுமே இருந்த ஓரிடத்தில் வந்து தங்கினார் — புதரும் மரமும் குழியும்; வடக்குப் பக்கத்தில் ஒரு குளம், அந்தக் குளமே இவ்விடத்திற்குப் பெயரையும் தந்தது. அங்கே தம் வீட்டைக் கட்டினார். விசுவாசத்தில் உறுதியாய் இருந்ததால், வீட்டு வாசலுக்கு எதிரே இருந்த வெட்டவெளியில் ஒரு சிறிய குருசடியை — சாலையோரச் சிலுவைத் தலத்தை — எழுப்பி, வழிப்போவோர் அனைவரும் காணும்படியே அதன் முன் நின்று செபித்து வந்தார். பிறரும் வந்து அவருக்கு அருகிலேயே வீடுகட்டிக் கொண்டனர். ஒரு பெண்மணியின் சிலுவையைச் சுற்றி ஓர் ஊர் திரண்டது.`,
            },
            {
              year: `சுமார் 1684`,
              title: `காட்டுப் பாதையில் ஒரு அருட்தந்தை`,
              body: `இவ்வூர் பழைய காட்டுப் பாதையின் மேல் அமைந்திருந்தது — “திருவிதாங்கூருக்கும் பாண்டிய நாட்டுக்கும் இடையிலான ஒரு தங்குமிடம்” — இருபுறமும் போவோரும் வருவோரும் பயணத்தை முறித்து இளைப்பாறும் இடம். ஒரு காலைப் பொழுதில் சாந்தாயி வயலில் பருத்தி பறித்துக்கொண்டிருந்தபோது, ஓர் அருட்தந்தை குதிரையில் அவ்வழியே வந்தார். அவரை நோக்கி ஓடிச் சென்று, தம் வீட்டையும் வாசலருகே தாம் எழுப்பியிருந்த சிறு சிலுவையையும் ஆசீர்வதிக்கும்படி வேண்டினார்; அவர் குதிரையை நிறுத்தி ஆசீர்வதித்தார். அவர் பெயர் ஜான் தெ பிரிட்டோ; தமிழர்களோ அவரை அருளானந்தர் என்றே அழைத்தார்கள் — *அருளின் ஆனந்தம்*. தெற்கே இவ்வூர் வரைதான் அவர் குதிரையேறி வந்தார்; அதற்கு அப்பால் அவர் செல்லவில்லை. அது கடினமான நாடு; அதற்கு ஒரே ஆண்டுக்கு முன்பு, இது “கடலின் அலைகளைப் போல் நிலையற்றது, பாலைவன மணலைப் போல் இடம் மாறுவது” என்று அவரே எழுதியிருந்தார். ஆயினும் அன்று காலை அவர் ஆசீர்வதித்த அந்தச் சிறு சிலுவை அவை அனைத்தையும் தாண்டி நின்றது; இவ்வூர் பிற்காலத்தில் ஆகப்போன அனைத்தும் அங்கேயே தொடங்கின.`,
            },
            {
              year: `1685`,
              title: `ஓலை வேய்ந்த ஒரு சிற்றாலயம்`,
              body: `மேலும் மேலும் குடும்பங்கள் வந்து சேர்ந்தன; விசுவாசம் பரவி, சாந்தாயியின் வாசலில் நின்ற சிலுவையால் அத்தனை பேரையும் தாங்க முடியாமல் போயிற்று. 1685-ஆம் ஆண்டளவில் அவர்களே தங்களுக்கென ஓர் ஆலயத்தைக் கட்டிக்கொண்டார்கள் — ஓலை வேய்ந்த ஒரு சிறிய கட்டிடம். அந்த ஆண்டுகளில் மதுரைப் பணிக்களம் முழுவதுமே அருளானந்தரின் பொறுப்பில் இருந்தது. அதன் பிறகு இங்கே எழுந்த ஒவ்வோர் ஆலயமும் அதற்கு முந்தையதை விடப் பெரியதாகவே இருந்தது.`,
            },
            {
              year: `1685–86`,
              title: `முதல் அறுவடை`,
              body: `அந்த ஆண்டுகளில் அருளானந்தர் தென்னகம் எங்கும் ஆயிரக்கணக்கானோருக்குத் திருமுழுக்கு அளித்துக்கொண்டிருந்தார். இரண்டே மாத இடைவெளியில் மட்டும் “இரண்டாயிரத்து எழுநூறு” பேர் என்று அவரது வாழ்க்கை வரலாற்றாசிரியர் கணக்கிட்டார். வடக்கன்குளத்தில் அவர் ஏறத்தாழ இருநூறு பேருக்குத் திருமுழுக்கு அளித்தார் என்று நம்பப்படுகிறது. இவ்வூர் கண்ட முதல் கிறிஸ்தவர்கள் இவர்களே — ஆண்களும் பெண்களும் குழந்தைகளுமாய் ஒருசேரத் திருமுழுக்கு நீரண்டை கொண்டுவரப்பட்டவர்கள். அதுவே இவ்வூரின் அடித்தள அறுவடை; பிற்காலத்தில் இவ்விடம் எதற்காக அறியப்படுமோ அந்த மாபெரும் கிறிஸ்தவ சமூகம், அதிலிருந்தே வளர்ந்தது.`,
            },
            {
              year: `1693`,
              title: `வைக்கோலே எழுதுகோலாய்`,
              body: `வடக்கன்குளத்தில் ஓலைக் கூரை எழுந்த எட்டு ஆண்டுகளுக்குப் பின், அவர் விலங்கிடப்பட்டிருந்தார். மரணத்தின் முதல்நாள், ஓரியூர்ச் சிறையிலிருந்து தம் சபைச் சகோதரர்களுக்கு எழுதினார். எழுதுகோலாக அவருக்கு உதவியது ஒரு வைக்கோல்; மையோ, தம் எச்சிலில் குழைத்த கரி. “இயேசு கிறிஸ்துவின் திருச்சட்டத்தைக் கற்பித்தேன் என்பது ஒன்றே எனக்கு எதிராகச் சுமத்தப்பட்டுள்ள குற்றம்… இக்குற்றமே ஒரு புண்ணியமாய் இருப்பதால், இதற்குரிய தண்டனை எனக்கு மாண்பாகவே அன்றி வேறாக இருக்க இயலாது.” மறுநாள் காலை, நாற்பத்தைந்து வயதில், அவர் தலை துண்டிக்கப்பட்டார்; இரண்டரை நூற்றாண்டுகளுக்குப் பின் உரோமை அவரைப் புனிதர் என அறிவித்தது. பரந்த திருச்சபைக்கு அவர் தென்கோடியின் இரத்தசாட்சி. வடக்கன்குளத்திற்கோ அவர் என்றென்றும் அருளானந்தர்தான் — தன் நிறுவனராக இவ்வூர் நினைவுகூரும் அருட்தந்தை, ஒவ்வொரு பிப்ரவரியிலும் இவ்வூர் திருவிழா கொண்டாடும் புனிதர்.`,
            },
          ],
        },
        {
          id: `first-inland-parish`,
          span: `1698–1740`,
          heading: `முதல் உள்நாட்டுப் பங்கு`,
          blurb: `தன்னிடம் ஒருபோதும் இல்லாத ஒரு புதையலுக்காக அடிபட்ட முதல் அருட்தந்தை, ஓர் அரசியின் ஒற்றை வார்த்தையால் மீண்டும் வந்து சேர்கிறார்; உரோமைக்குச் சென்ற கடிதம் ஒன்றில் இவ்வூரின் பெயர்; இரண்டே பருவங்களில் எண்ணூறு திருமுழுக்குகள் — காட்டு வெளி ஒரு பங்காயிற்று.`,
          dots: [
            {
              year: `1698`,
              title: `தங்கிய முதல் அருட்தந்தை`,
              body: `பல ஆண்டுகளாக அருட்தந்தையர் இவ்வழியே குதிரையில் கடந்து சென்றார்களே தவிர, தங்கியதில்லை. பின்னர், திருவிதாங்கூருக்கும் பாண்டிய நாட்டுக்கும் இடையிலான எல்லையில், இரு பக்கத்திற்கும் வசதியாய் அமைந்திருந்த இவ்விடத்திற்குத் தனி இல்லம் ஒன்று தகும் என்று பணிக்களம் தீர்மானித்தது. இங்கேயே வாழ்வதற்காக அனுப்பப்பட்ட முதல் அருட்தந்தை — சுமார் 1698-ல் — பெர்னார்ட் தெ சா அவர்கள். அவரிலிருந்தே இப்பங்கின் பங்குத் தந்தையர் பட்டியல் தொடங்குகிறது; இன்று காலைத் திருப்பலி நிறைவேற்றும் அருட்தந்தை வரை, அது ஒரு முறைகூட அறுபடாமல் தொடர்ந்து வந்திருக்கிறது.`,
            },
            {
              year: `1700`,
              title: `அருட்தந்தையும் அரசியும்`,
              body: `தெ சா இம்மக்களிடையே வந்து நெடுநாள் ஆகியிருக்கவில்லை, அதற்குள் துன்புறுத்தல் இறங்கியது. அருட்தந்தை பணத்தை மறைத்து வைத்திருக்கிறார் என்று உறுதியாக நம்பியவர்கள், அவருக்குக் காய்ச்சல் கண்டிருந்த ஓர் இரவில் வந்து, படுக்கையிலிருந்து இழுத்து, அடித்து, கயிற்றால் கட்டி, ஆளுநர் முன் கொண்டு சென்றார்கள்; ஆளுநர் அவரைச் சிறிது காலம் தன் காவலில் வைத்திருந்து, பின் மாவட்டத்தைவிட்டே விரட்டினார். மாதங்கள் கழிந்த பின்னும் அந்தக் காயங்களிலிருந்து அவர் மீளாதிருந்தபோது அவரைக் கண்ட சக இயேசு சபை அருட்தந்தை பியேர் மார்ட்டின், தாம் கண்டதை எழுதிவைத்தார்: “அடிகளின் தழும்புகள்; அவரது பற்கள் அனைத்தும் உடைத்தெறியப்பட்டிருந்த நிலை.” அவரை மீண்டும் இங்கே கொண்டுவந்ததோ ஓர் அரியணையிலிருந்து வந்த வார்த்தை. அருட்தந்தை லெய்னெஸ் அவரது வழக்கை, அப்போது மதுரையை ஆண்ட மங்கம்மாள் அரசியிடம் கொண்டு சென்றார்; வடக்கன்குளத்திற்குத் திரும்பிச் செல்ல அவர் அனுமதி அளித்தார்.`,
            },
            {
              year: `1709`,
              title: `இயேசு சபைக் கடிதம் ஒன்றில் ஒரு பெயர்`,
              body: `1709-ஆம் ஆண்டளவில், இயேசு சபையினர் உரோமைக்கு அனுப்பிய கடிதங்களில் இவ்விடத்தின் பெயர் இடம்பெற்றுவிட்டது. அவ்வாண்டின் ஆண்டறிக்கைக் கடிதம், அருட்தந்தை மரிய சவேரி போர்கேசே அவர்களை வடக்கன்குளம் மாவட்டத்தின் தலைவராக நிறுத்தி, அவரைப் பற்றி இவ்வாறு சொல்கிறது: “வியத்தகு வைராக்கியத்துடன் அவர் மனமாற்றப் பணியில் உழைக்கிறார்; உடலின் வலிமைக் குறைவை உள்ளத்தின் வேகம் ஈடுகட்டுகிறது.” அது ஓர் அறிக்கையின் ஒற்றை வரிதான்; ஆலயத்தைப் பற்றியோ ஊரைப் பற்றியோ அது நமக்கு எதுவும் சொல்லவில்லை. ஆயினும் இங்கிருந்து பதிவு இனி ஒருபோதும் அறுபடவில்லை: இவ்வாண்டு முதல், பணிக்களத்தின் எழுதப்பட்ட வரலாற்றில் இப்பங்கு தன் இடத்தைத் தொடர்ந்து வைத்திருக்கிறது.`,
            },
            {
              year: `1712–1713`,
              title: `இரண்டே பருவங்களில் எண்ணூறு பேர்`,
              body: `அதைத் தொடர்ந்து வந்த ஆண்டுகள் பணிக்களத்தின் வசந்தகாலம். சுமார் 1712, 1713 ஆகிய இரண்டே பருவங்களில், வடக்கன்குளத்தில் வயது வந்தோர் ஏறத்தாழ எண்ணூறு பேருக்கு — அவர்களின் குழந்தைகளைத் தவிர — திருமுழுக்கு அளிக்கப்பட்டது. அவ்வாண்டில் இங்குள்ள ஆலயம் குறைந்தது நான்காயிரத்து நூற்று இருபத்தெட்டு வயது வந்தோரைத் தன் கணக்கில் கொண்டிருந்தது; அந்த அக்டோபரில் மேலும் எண்பத்தைந்து பேர் திருமுழுக்குக்குத் தயாராகிக்கொண்டிருந்தனர். ஓலைக் கூரையின் கீழ் இருநூறு பேருடன் தொடங்கியது, இப்போது தென்னக எல்லைப்புறத்தின் மாபெரும் கிறிஸ்தவச் சமூகங்களுள் ஒன்றாய் நின்றது.`,
            },
            {
              year: `1714`,
              title: `அருட்தந்தை ஒருவர் வாழ்ந்த இல்லம்`,
              body: `1714-ஆம் ஆண்டளவில், இயேசு சபை வடக்கன்குளத்தைத் தனக்கே உரிய ஒரு நிலையமாக்கியிருந்தது; இனி அது சுற்றுப் பயணத்தில் வந்து போகும் ஒரு கிராமம் அல்ல, அருட்தந்தை ஒருவர் வாழ்ந்த இல்லம். அந்த ஆண்டுகளைப் பற்றிய பணிக்களத்தின் சொந்தப் பதிவில், மறைப்பணியாளர் ஒருவர் தன்னைப் பற்றியே எழுதுகிறார்: போலிக் குரு ஒருவன் “அப்போது நான் இருந்த வடக்கன்குளம் ஆலயத்திற்குள்” நுழைந்தான்; அவருடன் உடன் நடந்துவந்த மறைக்கல்வியாளரால் அவன் அம்பலப்படுத்தப்பட்டான். இங்கேயே தங்கியிருக்கும் ஒரு குரு, இயங்கிக்கொண்டிருக்கும் ஓர் ஆலயம், அவருக்குப் பக்கத்தில் ஒரு மறைக்கல்வியாளர் — ஓலைக் கூரை எழுந்த முப்பது ஆண்டுகளுக்குள், பங்கு வந்து சேர்ந்துவிட்டது.`,
            },
          ],
        },
        {
          id: `statue-and-the-saint`,
          span: `1741–1775`,
          heading: `திருவுருவமும் புனிதரும்`,
          blurb: `அருட்தந்தை புத்தாரியின் பொற்காலம் — கடல் கரையில் ஒதுக்கிச் சென்ற ஒரு திருவுருவம், வருங்காலப் புனிதர் ஒருவரின் திருமுழுக்கு, சிலுவை வடிவில் எழுந்த முதல் நிலையான ஆலயம்.`,
          dots: [
            {
              year: `1742`,
              title: `கடல் கொணர்ந்த ஒரு பெட்டி`,
              body: `1742-ஆம் ஆண்டில், ஊருக்குக் கீழேயுள்ள கடற்கரையில், கூட்டப்புளியில், கடல் ஒரு மரப்பெட்டியைக் கரையில் ஒதுக்கிச் சென்றது. அதன் மேல் “வடக்கன்குளத்திற்கு, போர்த்துகலிலிருந்து” என்று எழுதப்பட்டிருந்தது; உள்ளே, செதுக்கப்பட்ட அன்னையின் திருவுருவங்கள். மீனவர்கள் அதைத் தூக்கிக்கொண்டு பங்குத் தந்தை ஜான் பாப்டிஸ்ட் புத்தாரி அவர்களிடம் வந்தார்கள். அவர் ஒரு திருவுருவத்தைத் தம் ஆலயத்திற்கென வைத்துக்கொண்டு, இரண்டாவதைக் காமநாயக்கன்பட்டிக்கு அனுப்பி, மூன்றாவதை ஆயரின் பொறுப்பில் ஒப்படைத்தார். இங்கேயே தங்கிவிட்ட அந்தத் திருவுருவமே விண்ணேற்பு மாதா — இந்தப் பீடத்தின் மேல் இன்று நிற்கும் திருவுருவம்; ஒரு நாள் கண்ணீர் சிந்தப்போகும் அதே திருவுருவம்.`,
            },
            {
              year: `1745`,
              title: `தாமதிக்க எந்தக் காரணமும் இல்லை`,
              body: `திருமுழுக்குத் தொட்டியை நோக்கி வந்தபோதே நீலகண்ட பிள்ளை மதிப்புமிக்க ஒருவராய் இருந்தார்: திருவிதாங்கூர் அரசரின் அரசவை அதிகாரி, நற்குடிப் பிறந்தவர், முப்பத்திரண்டு வயதுடையவர். அரசரின் சொந்தப் படையின் அதிகாரியாய் இருந்த யூஸ்தாகியுஸ் தெ லானோய் அவர்களே முதலில் அவரிடம் கிறிஸ்தவ விசுவாசத்தைப் பற்றிப் பேசி, வடக்கன்குளத்தின் அருட்தந்தை புத்தாரியிடம் அவரை அனுப்பிவைத்தார். இத்தகைய ஒரு மனமாற்றம் எத்தகைய துன்புறுத்தலை இழுத்துவரும் என்பதைப் புத்தாரி அறிந்திருந்தார்; அவர் அவசரப்படவில்லை. “அவர் அவ்வளவு ஆவலோடு விரும்பிய அருளை ஒத்திவைப்பது அவசியம் எனக் கருதி, நெடிது சோதித்தபின்னரே, மறுபிறப்பின் அருட்சாதனத்திற்கு அவரை ஏற்றுக்கொண்டார்.” தயங்கி நின்ற அந்த அருட்தந்தையிடம், காத்திருந்த அந்த மனிதர் சொன்னதைத் திருவிதாங்கூரின் ஒரு புராட்டஸ்டன்ட் வரலாற்றாசிரியர் பதிவு செய்கிறார்: “தாமதிக்க எந்தக் காரணமும் இல்லை. இது கட்டாயத் திருமுழுக்கு அல்ல. வலுக்கட்டாயத்தால் அல்ல, என் சொந்த விருப்பத்தாலும் ஆர்வத்தாலுமே அருட்சாதனங்களைப் பெற நான் இங்கு வந்தேன். எந்த உண்மையின் ஒளியை நான் பெற்றேனோ, எதன்மேல் நான் உறுதி கொண்டேனோ, அந்த உண்மையைக் காப்பாற்ற என் உயிரையும்கூடத் தருவேன்.” அவர் தந்தார். மறைக்கல்வி ஒன்பது மாதங்கள் நீடித்தது. 1745-ஆம் ஆண்டு மே 14-ஆம் நாள், இவ்வூர் ஆலயத்தில், மறைக்கல்வியாளர் ஞானப்பிரகாசம் பிள்ளை ஞானத்தந்தையாக நிற்க, அவர் மேல் நீர் வார்க்கப்பட்டது; அந்த அதிகாரி லாசர் என்றும், தமிழில் தேவசகாயம் — கடவுளே என் துணை — என்றும் பெயர் பெற்றார்.`,
            },
            {
              year: `1749`,
              title: `ஓலையிலிருந்து செங்கலுக்கு`,
              body: `1749-ஆம் ஆண்டளவில் அருளானந்தரின் ஓலைக் கூரையால் இச்சபையாரைத் தாங்க முடியாமல் போகவே, அதற்குப் பதிலாக நிலைத்து நிற்கும் ஓர் ஆலயத்தை எழுப்பும் பணியில் அருட்தந்தை புத்தாரி இறங்கினார். அவர் “அதன் அடித்தளங்களை இட்டார்”; அதனை நிறைவுக்குக் கொண்டு சென்றவர் அருட்தந்தை தோமஸினி. இப்பங்கின் சொந்தப் பதிவின்படி அது அகன்ற செங்கற்களால் எழுந்தது; அதன் அடிக்கல் ஆசீர்வதிக்கப்பட்டதை இப்பங்கு கங்கோல் விழாவாகக் கொண்டாடி, அந்த ஆண்டை 1749 எனக் குறிக்கிறது.`,
            },
            {
              year: `சுமார் 1749`,
              title: `மரம் தேடிச் சென்ற பணி`,
              body: `அருட்தந்தை புத்தாரி “தம் ஆலயத்தைக் கட்டுவதில் மூழ்கியிருந்தார்”; அதற்கு மரம் தேவைப்பட்டது. தம் குருவுக்கு உதவும் நோக்கில், அரசவையில் இருந்த பழைய நண்பர் ஒருவரிடம் தேவசகாயம் சென்று, அரச காடுகளில் மரம் வெட்ட அனுமதி கோரினார். மரத்தைப் பற்றிப் பேசுமளவுக்கு அவர்களால் போகவே முடியவில்லை. அதற்குப் பதிலாகச் சமயம் குறித்த வாக்குவாதத்தில் இருவரும் சிக்கிக்கொண்டனர்; அந்த மனிதர் தேவசகாயத்தின் உயிருக்கு அச்சுறுத்தல் விடுத்தபடியே அங்கிருந்து சென்றார். விரைவில் கைது ஆணை வந்தது; அது வந்தபோது, தேவசகாயம் எந்த எதிர்ப்பும் காட்டாமல் தம்மைக் கையளித்தார்.`,
            },
            {
              year: `1752`,
              title: `சிலுவை வடிவில் ஓர் ஆலயம்`,
              body: `1752-ஆம் ஆண்டளவில் அந்த ஆலயம் நிறைவுபெற்று நின்றது — சிலுவை வடிவில் எழுப்பப்பட்டு, உதயச் சூரியனை நோக்கிக் கிழக்கு முகமாகப் பீடம் அமைந்திருந்தது. அதற்கு முந்திய அருளானந்தரின் சிற்றாலயத்தைப் போலவே, இதுவும் “திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்டது.” இதன் மாபெரும் திருவிழா புனித சவேரியாருடையது; ஒவ்வொரு டிசம்பரிலும் ஆடம்பரமான நவநாளுடன் அது கொண்டாடப்பட்டது. ஆலயச் சுவர்களுக்குள் ஒருகாலத்தில் பதிக்கப்பட்டிருந்த இரண்டு கல்வெட்டுகளைக் கொண்டே இப்பங்கு இந்த ஆண்டை உறுதி செய்கிறது.`,
            },
            {
              year: `1752`,
              title: `இயேசு, மரியா என்னும் இனிய திருப்பெயர்கள்`,
              body: `மூன்று ஆண்டுகள் அது நீடித்தது: எருமையின் மேல் ஏற்றப்பட்டு ஊர் ஊராய் ஊர்வலமாக இழுத்துச் செல்லப்பட்டார், சாட்டையால் அடிக்கப்பட்டார், காட்டில் ஒரு மரத்தோடு பல மாதங்கள் சங்கிலியால் பிணைக்கப்பட்டார். 1752-ஆம் ஆண்டு ஜனவரி 14-ஆம் நாள், ஆரல்வாய்மொழிக் கணவாயில் இருந்த திருவிதாங்கூர் எல்லைக் காவல் வரிசைக்கு அவரைக் கொண்டு சென்று சுட்டார்கள்; “இயேசு, மரியா என்னும் இனிய திருப்பெயர்களைத் திரும்பத் திரும்பச் சொல்லியபடியே அந்த இரத்தசாட்சி உயிர்நீத்தார்.” அவரது உடல் கோட்டாற்றில் உள்ள புனித சவேரியார் ஆலயத்தில் சேர்க்கப்பட்டது; அங்கே கொச்சி ஆயர் “Te Deum” பாடச் செய்து, அந்த இரத்தசாட்சியின் புகழுரையையும் தாமே ஆற்றினார். அவரிடமிருந்து தன்னால் இயன்றதை வடக்கன்குளம் தன்னிடமே வைத்துக்கொண்டது: அவரது ஆடையின் ஒரு பகுதி, அவர் கட்டப்பட்டிருந்த சங்கிலிகள். ஞானப்பூ தெரேசா எனத் திருமுழுக்குப் பெற்ற அவரது மனைவி இப்பங்கின் கல்லறைத் தோட்டத்தில் உறங்குகிறார்; அவர் மறைந்த ஆண்டு 1766 என்று அவரது கல் சொல்கிறது.`,
            },
            {
              year: `1773–1775`,
              title: `பழைய அருட்தந்தையருள் கடைசியானவர்`,
              body: `1773-ஆம் ஆண்டில், திருத்தந்தை பதினான்காம் கிளமெண்ட் உலகின் ஒவ்வொரு நாட்டிலும் இயேசு சபையை ஒடுக்கினார். திருநெல்வேலியில் எஞ்சியிருந்த இயேசு சபையினர் — இங்கும், தளையிலும், மணப்பாட்டிலும் — ஒருவர் பின் ஒருவராக இறந்தனர்; அவர்களது இடங்களைக் கோவாவிலிருந்து வந்த அருட்தந்தையர் நிரப்பினர். இங்கிருந்த பழைய அருட்தந்தையருள் கடைசியானவர் கிளமெண்ட் தோமஸினி. தம் முடிவு நெருங்குவதை உணர்ந்த அவர், “தளையில் இருந்த அருட்தந்தை அந்தோணி துவார்த்தேயிடம் தம்மைத் தூக்கிச் செல்லச் செய்தார்”; எழுபத்தைந்து வயதில், 1775-ஆம் ஆண்டில் அங்கேயே இறந்தார். அவருடன், வடக்கன்குளத்தின் முதல் இயேசு சபை நூற்றாண்டு முடிவுக்கு வந்தது.`,
            },
          ],
        },
        {
          id: `the-weeping-madonna`,
          span: `1775–1838`,
          heading: `கண்ணீர் சிந்திய அன்னை`,
          blurb: `இயேசு சபைத் தந்தை ஒருவர்கூட இல்லாமல் கழிந்த அறுபத்து மூன்று ஆண்டுகள் — அவற்றின் நடுவே, அக்டோபர் மாத வெள்ளிக்கிழமை ஒன்றின் முற்பகலில், ஊரே ஓடி வந்த அந்தக் காலைப் பொழுது.`,
          dots: [
            {
              year: `1775–1838`,
              title: `இயேசு சபையார் வராத ஆண்டுகள்`,
              body: `அறுபத்து மூன்று ஆண்டுகளுக்கு இயேசு சபையினர் யாரும் இப்பங்கில் பணியாற்றவில்லை. ஆனால் இப்பங்கு கைவிடப்படவில்லை. கொச்சி ஆயரின் கீழ் கோவாவிலிருந்து அருட்தந்தையர் வந்தார்கள்; அவர்களின் பட்டியல் ஓர் இடைவெளிகூட இன்றித் தொடர்கிறது — தேவ வரதனார், இஞ்ஞாசியார், ஜான் லூயிஸ் கர்டோசா, அவர்களுக்குப் பின் வந்தவர்கள். திருவிழா கொண்டாடப்பட்டது, குழந்தைகள் திருமுழுக்குப் பெற்றார்கள், இறந்தவர்கள் அடக்கம் செய்யப்பட்டார்கள். இவ்வூர் வெறுமனே பிடித்து நின்றதோடு நிற்கவில்லை. சுமார் 1780 முதல் இது “உள்நாட்டுப் பணிக்களத்தின் ஒரே மையமாக” ஆயிற்று; சேந்தமங்கலம், ஆண்டிபட்டி, காமநாயக்கன்பட்டி, மற்றும் இவ்வூர் என நான்கு பிரிவு மையங்கள் இதன் கீழ் அமைக்கப்பட்டன. கொச்சியிலிருந்து வந்த அருட்தந்தையர், “ஏற்கெனவே இருந்த அடித்தளங்களைத் தாங்கிநிறுத்தத் தம்மால் இயன்ற அனைத்தையும் செய்து”, 1837-ஆம் ஆண்டில் பாளையங்கோட்டையின் புதிய இயேசு சபையினரிடம் முழுப் பொறுப்பையும் ஒப்படைத்தார்கள். இவை அனைத்திற்கும் நடுவில்தான், இவ்விடத்தில் இதுவரை நிகழ்ந்தவற்றுள் மிக அசாதாரணமான அந்த நிகழ்வு நிகழ்ந்தது.`,
            },
            {
              year: `1775-க்குப் பின்`,
              title: `ஊரார் விட்டுவிடாத அருட்தந்தை`,
              body: `தோமஸினியை அவர்கள் ஒருபோதும் விட்டுவிடவில்லை. தம் வாழ்நாளில் அவர் தம் மென்மையால் அவர்களை வென்றிருந்தார், அவர்களுடைய ஆலயத்தை நிறைவுசெய்திருந்தார்; அறுபத்து மூன்று ஆண்டுகளுக்கு அவர்களுக்குக் கிடைக்கவிருந்த கடைசி இயேசு சபைத் தந்தையும் அவரே. அவர் ஊரைவிட்டு வெளியே இறந்தார், வேறோர் இடத்தில் அடக்கமும் செய்யப்பட்டார்; ஆயினும் அவருடைய மக்கள் “தங்கள் நடுவே ஒரு நினைவுச் சின்னத்தை எழுப்பி,” அவரது நினைவை ஒரு புனிதரின் நினைவாகவே காத்தார்கள். அவர் இறந்து தொண்ணூறு ஆண்டுகள் கழித்தும், இப்பகுதியைப் பற்றி எழுதிய ஓர் இயேசு சபை அருட்தந்தை நிகழ்காலத்தையே பயன்படுத்தினார்: “கிறிஸ்தவர்கள் அவரைப் புனிதராகப் போற்றுகிறார்கள், தம் பிள்ளைகளுக்கு அவரது பெயரைச் சூட்டுகிறார்கள், மிகுந்த பக்தியுடன் அவரது கல்லறையைத் தரிசிக்கிறார்கள்.” கிறிஸ்தவர் அல்லாதவர்களும்கூடத் தம் துன்பங்களில் அவரையே அழைத்தார்கள்; அவரது பரிந்துரையால்தான் தம் பயிர்களின் மேல் மழை பொழிகிறது என்று அவர்கள் நம்பினார்கள் என்றும் அவர் சேர்த்து எழுதுகிறார்.`,
            },
            {
              year: `1803`,
              title: `ஐப்பசியில் ஒரு வெள்ளிக்கிழமை முற்பகல்`,
              body: `1803-ஆம் ஆண்டு அக்டோபர் 21, வெள்ளிக்கிழமை முற்பகலில் — தமிழ் ஆண்டு 979, ஐப்பசி மாதம் — இவ்வூரில் குடியேறியிருந்த ஐரோப்பியரான திரு. பில்டர்பெக்கைச் சந்திக்கத் திருநெல்வேலியிலிருந்து வந்திருந்த சவரிமுத்து பிள்ளை என்பவர், செபிப்பதற்காக ஆலயத்திற்குள் நுழைந்தார். பீடத்திற்கு மேலே, இரட்டைக் கதவு கொண்ட ஒரு மாடத்தில் விண்ணேற்பு மாதாவின் திருவுருவம் நின்றது; அன்று காலை அதன் இரு கதவுகளுமே திறந்திருந்தன. அவர் முழந்தாளிட்டிருக்கையில், மெல்லிய ஒளி ஊடுருவும் மேகம் ஒன்று அன்னைக்குப் பின்னால் திரண்டு அவரைச் சுற்றிப் போர்த்தியது. அவருடைய கண்கள் விண்ணை நோக்கி உயர்ந்து நிறைந்தன, கன்னங்களில் கண்ணீர் வழிந்தோடியது; முகம் துயரம் கொண்டது; கூப்பியிருந்த கைகள் பிரிந்து, மாடத்தின் சுவர்களைத் தொடும் அளவுக்கு வெளிநோக்கி நீண்டன. பீடத்தில் இருந்த மற்ற ஒவ்வொரு திருவுருவமும் “இரக்கத்தையும் துயரத்தையும் வெளிப்படுத்தின” என்று பதிவு சொல்கிறது. “நான் ஒரு மயக்கத்திற்கு ஆளாகிவிட்டேன்” என்று அவர் நினைத்தார். மீண்டும், இன்னும் கூர்ந்து பார்த்தார் — அது நின்றுவிடவில்லை.`,
            },
            {
              year: `1803`,
              title: `நேரமல்லாத நேரத்தில் ஒரு மணியோசை`,
              body: `மறைக்கல்வியாளர் மதுரேந்திர அண்ணாவியார் பீடத்தில் ஏறி அன்னையின் முகத்தைத் துடைத்தார்; கண்ணீர் மீண்டும் வந்தது, நிற்கவே இல்லை. பின்னர் அவர்கள் மணியை அடித்தார்கள். அது ஒருபோதும் மணி அடிக்கப்படும் நேரமே அல்ல; ஏன் என்று அறிய ஊரே வயல்களிலிருந்தும் வீடுகளிலிருந்தும் ஓடி வந்தது. நின்று பார்த்தார்கள்; பின் கண்ணீர் விட்டு மன்றாடினார்கள்; ஒரு மக்கள் கூட்டம் அஞ்சி நடுங்கும்போது பாடப்படும் அந்தப் பழைய மனந்திரும்புதல் பாடலைப் பாடினார்கள்: “Parce Domine, parce populo tuo.” ஆண்டவரே, பொறுத்தருளும்; உம் மக்களைப் பொறுத்தருளும். அவர்கள் மன்றாடிக்கொண்டிருக்கும்போதே, அத்திருவுருவமும் மற்ற எல்லாத் திருவுருவங்களும் “தம் வழக்கமான தோற்றத்திற்குத் திரும்பின”; பீடத்திற்கு மேலிருந்த அந்த முகம் மீண்டும் ஒரு சாதாரணச் செதுக்கு முகமாயிற்று.`,
            },
            {
              year: `1803`,
              title: `விண்மீன்கள் போன்ற திருவிழிகள்`,
              body: `அதை உறுதிப்படுத்திக்கொள்ள, சவரிமுத்து மறைக்கல்வியாளர் யாகப்பர் பிள்ளையை அழைத்துவரச் சென்றார். ஆலயத்திற்குள் வந்த அந்த மறைக்கல்வியாளர், புகையும் இருளும் சூழ நின்ற இறைவனின் அன்னையைக் கண்டார் — முகம் வெறுமையும் துயரமும் கொண்டிருந்தது, கரங்கள் விரிந்திருந்தன, கண்கள் விண்ணை நோக்கி உயர்ந்து கண்ணீர் சொரிந்துகொண்டிருந்தன. உடனே திரு. பில்டர்பெக்கின் மகள் ஹென்ரியட்டை விரைந்து அழைத்துவரச் சொல்லி ஆள் அனுப்பினார்கள்; அப்பெண் ஆலயத்திற்கு ஓடிவந்து தன் முறையில் அதைக் கண்டாள். அன்னையின் முகத்தை உற்றுநோக்கியபோது, அவரது கண்கள் “விண்மீன்களைப் போல” இருந்ததையும், அவற்றிலிருந்து உடைந்து வழிந்த கண்ணீர் “தரையில் விழுந்து அதை நனைக்கும்” அளவுக்கு மிகுதியாய் இருந்ததையும், புனிதர்களின் திருவுருவங்கள் அனைத்தும் ஒருசேரத் துயரத்தில் தலை தாழ்த்தி நின்றதையும் அவள் கண்டாள்.`,
            },
            {
              year: `1803`,
              title: `பள்ளி ஆசிரியரின் பாடல்`,
              body: `அந்தக் காலைப் பொழுதின் முதல் பதிவை எழுதியவர் ஓர் அருட்தந்தை அல்ல; அது உரைநடையிலும் எழுதப்படவில்லை. அது ஒரு பாடல். நிகழ்ந்த உடனேயே ஊரின் பள்ளி ஆசிரியர் அதை ஐந்து பாக்களாகப் பாடினார்; அவர் ஆலயத்திற்குள் இருந்து அனைத்தையும் தம் கண்களால் கண்டவர். அவர் சிவ வழிபாட்டைச் சேர்ந்தவர். அன்று அவர் இயற்றியதன் மேலேயே, அதன்பின் அச்சான அனைத்தும் கட்டப்பட்டன: நண்பகலுக்கு முந்திய அந்த நேரம், மாடத்தின் திறந்த கதவுகள், அன்னைக்குப் பின்னால் திரண்ட மேகம், கண்ணீர், சுவர்களைத் தொடும் அளவுக்கு நீண்ட கைகள். ஒரு நூற்றாண்டுக்குப் பின் இப்பதிவை அச்சில் ஏற்றிய இயேசு சபை அருட்தந்தை, “கவிதையையும் ஓசையையும் விடுத்து, அப்பாடலின் சாரத்தையும் அதன் விளக்கத்தையும்” தருவதையே தேர்ந்தெடுத்தார். கதை எஞ்சியது. அதன் பாடலோ எஞ்சவில்லை.`,
            },
            {
              year: `1803–1817`,
              title: `அன்று காலை ஆலயத்தில் இருந்த குடும்பம்`,
              body: `பில்டர்பெக் குடும்பத்தினர் ரத்தமும் சதையுமான மனிதர்கள்; அவர்களைப் பெயரிட்டுச் சொல்ல முடியும். கிறிஸ்டோபர் பில்டர்பெக், ஏறத்தாழ 1758-ல் பிறந்தவர், ஐரோப்பிய வம்சாவளி வணிகர்; பதினெட்டாம் நூற்றாண்டின் இறுதியில் வடக்கன்குளத்தில் குடியேறி, 1817-ல் இங்கேயே இறந்தார். நங்குநேரியின் வரிவசூல் உரிமையை வைத்திருந்த மதிப்புமிக்க குடும்பம் அது; அன்று காலை அத்திருவுருவத்தை ஆராய்ந்த ஹென்ரியட், அவரது மகள். மாதா கண்ணீர் சிந்தி ஆறு ஆண்டுகளுக்குப் பின், 1809-ல், ஜான் என்னும் மகன் பிறந்தார்; 1880-ல் ஜான் இறந்தபோது, ஓர் ஆங்கில மறைப்பணி இதழ் அவரைப் பற்றி இவ்வாறு பதிவு செய்தது: அவர் “இந்தியாவில்… ஒரு ரோமன் கத்தோலிக்கக் குடும்பத்தில் பிறந்தவர், அத்திருச்சபையின் குருத்துவத்திற்காகப் பயிற்றுவிக்கப்பட்டவர்.” அன்று காலை இவ்வாலயத்தில் நின்ற அந்தக் குடும்பம், தனக்கென ஓர் ஆவணச் சுவட்டை விட்டுச் சென்றது — புராட்டஸ்டன்ட் கைகளில், ஒரு கத்தோலிக்கத் திருத்தலத்தை உயர்த்திப் பேச எந்தக் காரணமும் இல்லாதவர்களால் பாதுகாக்கப்பட்ட சுவடு.`,
            },
            {
              year: `1838`,
              title: `அப்போதும் கேட்கக் கிடைத்தவர்கள்`,
              body: `1838-ல் இயேசு சபையினர் திரும்பி வந்தபோது, அந்தக் காலைப் பொழுது இன்னும் உயிருள்ள நினைவுக்குள்ளேயே இருந்தது. வந்து சேர்ந்த தந்தையருக்கும் அந்நாளுக்கும் இடையே முப்பத்தைந்து ஆண்டுகளே இருந்தன; அன்று ஆலயத்தில் இருந்த பலர் கேட்டறியப்படுவதற்கு அப்போதும் உயிரோடு இருந்தார்கள். வடக்கன்குளத்தை முதலில் வந்தடைந்தவர்கள், இப்பணிக்களத்தின் ஓர் இயேசு சபை அருட்தந்தை பின்னாளில் எழுதியதுபோல, “அம்மரபின் வலிமைமிக்க சூழலால் போர்த்தப்பட்டு, அதில் ஊறியவர்கள் போல” தங்களைக் கண்டார்கள்; ஊர் மனமுவந்து சொன்னதைக் கேட்டால் மட்டுமே அனைத்தையும் அறிய முடிந்தது, அவர்களும் தம் முறையில் அதன் சாட்சிகளாயினர். இக்கதையைச் சொன்ன ஒருவர்கூட விட்டுவிடாத, ஊர் எப்போதும் சேர்த்துச் சொன்ன ஒரு செய்தி உண்டு: ஆலயம் நிறைந்திருந்தது, பீடத்தின் ஏராளமான மெழுகுதிரிகள் ஏற்றப்பட்டிருந்தன, அனைவரும் முழந்தாளிட்டிருந்தார்கள்; ஒருவர் ஏறிச் சென்று கண்ணீரைத் துடைத்தார் — அதை நிறுத்தவும் முடியவில்லை, குறைக்கவும் முடியவில்லை. அந்த இயலாத இரக்கமே மக்களை உடைத்தது. மார்பில் அறைந்துகொண்டார்கள், “ஆண்டவரே, எங்கள்மேல் இரக்கமாயிரும்” என்றார்கள், “சல்வே ரெஜீனா” பாடலைப் பாடினார்கள்.`,
            },
            {
              year: `1905`,
              title: `அன்னையின் திருக்கரங்களை அசைத்துப் பார்த்தார்`,
              body: `அந்தக் காலைப் பொழுதுக்கு நூறு ஆண்டுகளுக்குப் பின், இப்பணிக்களத்தின் ஓர் இயேசு சபை அருட்தந்தை தாமே பார்த்தறிய வந்தார். ஊரார் அத்திருவுருவத்தின் இயங்கும் ஒரு நகலைச் செய்து வைத்திருந்தார்கள்: உள்ளே குழிவான போலி உருவம், அதற்குள் கம்பிகளும் கோல்களும்; ஒரு முறை இழுத்தால் தலை உயரும், கண்கள் விண்ணை நோக்கும், கைகள் பிரியும், கரங்கள் விரியும்; இரண்டாம் முறை இழுத்தால் அனைத்தும் பழையபடி அமையும். “எங்களுக்காக அப்புதுமையை மீண்டும் செய்துகாட்ட அவர்கள் அன்புடன் இசைந்தார்கள்” என்று அவர் எழுதினார். அது சுமுகமாக நடக்கவில்லை; இயக்கியவர் தம் சரடுகளை ஒன்றுக்கு மேற்பட்ட முறை குழப்பிக்கொண்டார். பின்னர் அவர் திருவுருவத்தையே நோக்கிச் சென்றார் — நற்கருணைப் பேழைக்கு மேலே தன் மாண்புமிக்க இடத்தில் தனித்து நின்ற அத்திருவுருவத்தின் மேல் தம் சொந்தக் கைகளை வைத்தார். தலையை நேராக்கவும், இமைகளை உயர்த்தவும், கண்களை உருட்டவும், எல்லாவற்றுக்கும் மேலாக ஒரே மரத்துண்டில் செதுக்கப்பட்ட அந்த இரு கைகளைப் பிரிக்கவும், விறைத்த கரங்களை விரிக்கவும் முயன்றார். வீண் உழைப்பு. அது மூலப்பொருளின் — காய்ந்த மரக்கட்டையின் — உயிரற்ற எதிர்ப்பு. விசுவாசத்தின் விசாரணையாளர் என்று தாமே அபகரித்துக்கொண்ட அந்தப் பொறுப்பை அவர் கைவிட்டார்; மகிழ்ச்சியோடு கைவிட்டு, முழந்தாளிட்டார்.`,
            },
            {
              year: `1914`,
              title: `மூன்று சாட்சிகள், மூன்று வெவ்வேறு கைகளில்`,
              body: `அந்தக் காலைப் பொழுது முழுவதும் ஒரே ஒரு வழியில்தான் நம்மை வந்தடைந்தது என்று நெடுங்காலம் கருதப்பட்டது: லெயோன் பெஸ்ஸின் “லா மிஸியோன் து மதுரே”, 1914-ல் திருச்சிராப்பள்ளியில் அச்சிடப்பட்டது; மதுரைப் பணிக்களத்தின் ஆவணங்களைத் திரட்டி, 1803-ஆம் ஆண்டைப் பற்றிய இப்பங்கின் பதிவை அச்சில் ஏற்றியது அந்நூலே. ஆனால் அப்படியல்ல. பெஸ்ஸுக்கு ஒன்பது ஆண்டுகளுக்கு முன்பே, இப்பணிக்களத்தின் ஓர் இயேசு சபை அருட்தந்தையான தெசால், அப்பதிவை முழுமையாக அச்சிட்டிருந்தார்; 1930-ல், மலையாளத்தில், முற்றிலும் வேறொரு மரபில் எழுதப்பட்ட தேவசகாயத்தின் வாழ்க்கை வரலாறு ஒன்று, அதே ஐரோப்பியப் பெண்மணி அதே மூன்று அடையாளங்களை ஆராய்ந்ததைப் பதிவு செய்தது. மூன்று சாட்சிகள், மூன்று வெவ்வேறு கைகளில்; ஒருவர் இன்னொருவரை நகலெடுக்கவில்லை. இது ஒருபோதும் உரோமைக்குக் கொண்டு செல்லப்படவில்லை; எந்த ஆய்வுக்குழுவும் இதை எடைபோட்டதில்லை. ஆயினும் இவ்வூர் எப்போதும் இதைச் சுமந்து வந்த வழியிலேயே இது நம்மை வந்தடைகிறது: நாள் குறிக்கப்பட்ட ஒரு காலைப் பொழுது, பெயர் சொல்லப்பட்ட சாட்சிகள், இருநூற்று இருபது ஆண்டுகளாக விடாமல் கொண்டாடப்படும் ஒரு திருவிழா.`,
            },
          ],
        },
        {
          id: `great-two-nave-church`,
          span: `1838–1872`,
          heading: `மாபெரும் இரட்டை மண்டப ஆலயம்`,
          blurb: `பிரெஞ்சு இயேசு சபையினர் திரும்பி வந்தார்கள்; பதினேழு ஆண்டுகளில், ஏழ்மையான ஒரு கிராமம், “உலகிலேயே நிகரற்றதாக இருக்கக்கூடும்” என்று ஒரு வரலாற்றாசிரியர் சொன்ன ஓர் ஆலயத்தை எழுப்பியது — வாசல்களில் விலகி விரியும் இரு மண்டபங்கள், நீளம் முழுவதும் ஒன்றையொன்று நோக்கிச் சாய்ந்து, ஒரே பீடத்தில் சந்திக்கின்றன.`,
          dots: [
            {
              year: `1838`,
              title: `மனதைத் தொடும் ஒரு மகிழ்ச்சிப் பெருக்கு`,
              body: `1838-ஆம் ஆண்டில், மீண்டும் நிலைநாட்டப்பட்ட இயேசு சபை தென்னகப் பணிக்களத்திற்குத் திரும்பி வந்தது; வந்தவர்கள் இரு பிரெஞ்சு அருட்தந்தையர் — மார்ட்டினும் து ரான்கேயும். ஜூன் மாதம் அருட்தந்தை மார்ட்டின் தெற்கே வடக்கன்குளத்திற்கு வந்தார் — “மக்கள்தொகையாலும் குடிமக்களின் மாண்பாலும் குறிப்பிடத்தக்க ஒரு கிறிஸ்தவ சமூகம்; மனதைத் தொடும் ஒரு மகிழ்ச்சிப் பெருக்கோடு அவர்கள் எங்களை வரவேற்றார்கள்.” மறுநாள், சுற்றியிருந்த எல்லா ஊர்களிலிருந்தும் தூதுக்குழுக்கள் காணிக்கைகளுடன் ஓடிவந்து, “நெடுங்காலமாய்த் தம் மேய்ப்பரை இழந்திருந்த” தங்கள் ஆலயங்களுக்கும் வருமாறு அவரை மன்றாடின. அன்று பிற்பகல் நாற்பத்தைந்து குழந்தைகள் திருமுழுக்குப் பெற்றார்கள். அறுபத்து மூன்று ஆண்டுகளுக்குப் பின், 1752-ஆம் ஆண்டின் செங்கல் ஆலயத்தில் மீண்டும் ஓர் இயேசு சபைத் தந்தை; அவர் முன்னால், வளர்ந்துகொண்டே இருந்த ஒரு சபை.`,
            },
            {
              year: `1839`,
              title: `இரண்டரை மணிக்குக் குதிரையில்`,
              body: `1839-ஆம் ஆண்டில், மதுரைப் பணிக்களம் முழுவதற்கும் தலைவராயிருந்தவர், தம் ஆயர் தனியாகக் கடற்கரைப் பகுதிக்குச் செல்ல, இவ்வூரின் மாபெரும் நவநாளையும் புனித சவேரியாரின் சிறப்புத் திருவிழாவையும் கொண்டாடுவதற்காக இங்கேயே தங்கிவிட்டார். இறுதிக் கட்டப் பயணத்தை அருட்தந்தை ஜோசப் பெர்த்ராண்ட் இருளிலேயே கடந்தார். “23-ஆம் நாள். இரண்டரை மணிக்குக் குதிரையில்; எட்டு மணிக்கு வடக்கன்குளம் வந்து சேர்ந்தது; திருப்பலி, நவநாளின் தொடக்கம், அருட்சாதனப் பணியின் தொடக்கம்.” அத்திருப்பலி ஒன்பது நாள் திருவிழாவைத் தொடங்கிவைத்தது; அத்துடன், ஊர் மக்கள் அனைவருக்குமான அவ்வாண்டின் பாவசங்கீர்த்தனமும் நற்கருணையும் தொடங்கின.`,
            },
            {
              year: `1848`,
              title: `ஆயர் கேட்டுக்கொண்டது`,
              body: `1848-ஆம் ஆண்டில் மலபார் கரையிலிருந்து தம் பணிக்களத்திற்குத் திரும்பிய ஆயர் அலெக்சிஸ் கனோஸ், இவ்வூர் வழியாகவே உள்ளே நுழைந்தார். அவ்வாண்டைப் பற்றிய தமது சொந்தப் பதிவில் இவ்விடத்தை அவர் இப்படிக் குறித்து வைத்தார்: “வடக்கன்குளம் — பெரியதும் நல்லதுமான ஒரு கிறிஸ்தவ சமூகம்; அதற்கு நான் மேய்ப்பு வருகை செய்தேன்.” ஜூன் 21-ஆம் நாள் அவர் வந்தார்; புறப்படுவதற்கு முன், புதிய பெரிய ஆலயம் ஒன்றுக்காக மக்கள் பணம் சேர்க்கத் தொடங்க வேண்டும் என்று கேட்டுக்கொண்டார். அது செல்வம் மிக்க ஊர் அல்ல. ஏழு ஆண்டுகள் பிடித்தன. பின்னர் அவரே திரும்பி வந்து அடிக்கல்லை ஆசீர்வதித்தார்.`,
            },
            {
              year: `1855-க்குள்`,
              title: `ஓர் ஆயர், ஓர் ஊர், குழந்தையில்லாத ஒரு வீடு`,
              body: `பணம் மூன்று இடங்களிலிருந்து வந்தது. எல்லாரையும்விட நீண்ட காலம் அதைச் சுமந்தவர் ஆயரே: பதினெட்டு ஆண்டுகளாக, ஆண்டுதோறும் குறைந்தது இரண்டாயிரம் ஃபிராங்குகளைக் கட்டுமானத்திற்காகக் கனோஸ் அனுப்பிவந்தார். ஊரோ தன் பங்கைத் தன் சொந்தப் பையிலிருந்து, சிறுகச் சிறுகச் சேர்த்து, ஏழு ஆண்டுகளாகத் திரட்டியது. மூன்றாவதாக, ஒரு குடும்பம் நன்றியுணர்வோடு கொடுத்தது. கிறிஸ்டோபர் பில்டர்பெக் இவ்வூரின் ஐரோப்பிய வணிகர்; அவருக்கும் அவரது மனைவிக்கும் திருமணமாகி இருபத்தேழு ஆண்டுகளாகியும் குழந்தை இல்லை; அப்போது அவருக்கு ஐம்பது வயதும் கடந்திருந்தது — கேட்பதையே மனிதன் நிறுத்திவிடும் வயது. அவர்களோ கேட்டார்கள். இவ்வாலயத்தின் அன்னையிடம் மன்றாடினார்கள்; அந்த ஆண்டு முடிவதற்குள் அவர்களுக்கு ஓர் ஆண் மகன் பிறந்தான். இவை அனைத்திற்கும் மேலாக நின்றவர் பங்குத் தந்தையே: “இந்த அழகிய கிறிஸ்தவ சமூகம் தன் மாபெரும் ஆலயத்தைப் பெற்றது” அருட்தந்தை ஜோசப் கிரகோயரின் “விடாமுயற்சி மிக்க ஆற்றலால்தான்” என்று பணிக்களத்தின் சொந்த வரலாற்றாசிரியர் எழுதுகிறார்.`,
            },
            {
              year: `1855`,
              title: `Templum sit duplex, ara sed una`,
              body: `1854-ஆம் ஆண்டில் அருட்தந்தை கிரகோயர் அத்திட்டத்திற்கு ஒப்புதல் பெற்றார்; அது எளிதாகக் கிடைத்ததல்ல. 1855-ஆம் ஆண்டு ஆகஸ்ட் 9-ஆம் நாள் ஆயரே வந்து, இன்று நிற்கும் ஆலயத்தின் அடிக்கல்லை ஆசீர்வதித்தார். அருட்தந்தையருள் ஒருவர் அவ்வடிவமைப்பிற்கென ஒரு குறிக்கோள் வாசகத்தை இயற்றினார்; நான்கே சொற்களில் அது கட்டிடம் முழுவதையும் சொல்லிவிடுகிறது: “Templum sit duplex, ara sed una.” ஆலயம் இரட்டையாக இருக்கட்டும், ஆனால் பீடம் ஒன்றாக — அந்த ஒரே பீடம் அனைவருக்கும். இரு மண்டபங்கள் தம் வாசல்களில் விலகி நின்று, நீளம் முழுவதும் ஒன்றையொன்று நோக்கிச் சாய்ந்து, இறுதியில் சந்திக்கும்; அவை சந்திக்கும் இடத்தில் ஒரே கருவறையும் ஒரே பீடமும் இருக்கும் — இரு வாசல்களில் எதன் வழியாக உள்ளே வந்தவர்களுக்கும் அதுவே பொதுவானது.`,
            },
            {
              year: `1855–1872`,
              title: `இருபத்து நான்கு வளைவுகள், அவற்றில் இரும்பே இல்லை`,
              body: `பதினேழு ஆண்டுகள் பிடித்தன. இப்பணியை முன்னின்று நடத்தியவர் அருட்தந்தை ஜோசப் கிரகோயர்; அவரை “வடக்கன்குளத்தின் திருத்தூதர்” என்றே அவருடைய வரலாற்றாசிரியர் அழைக்கிறார். கட்டிடத்தைப் பொறியியல் நுட்பத்தோடு எழுப்பியவர் இயேசு சபையின் பொதுநிலைச் சகோதரர் ஜோசப் பெர்கந்தால்; 1872-ஆம் ஆண்டு இயேசு சபையின் உரோமைப் பதிவேடு அவரது பணியை இரண்டே சொற்களில் குறிக்கிறது: Ædif. eccl. — ஆலயம் கட்டியவர். சிமெண்ட் இல்லாமல், இரும்பு இல்லாமல், தாங்கிப் பிடிக்க ஒரு மரக்கட்டைகூட இல்லாமல், சுண்ணாம்பும் பனைக்கள்ளும் கலந்த சாந்தில், தம் சொந்தச் சுமையைத் தாமே தாங்கி நிற்கும் இருபத்து நான்கு வளைவுகளை இருவரும் சேர்ந்து எழுப்பினார்கள். பாதி வழியில், 1861-ஆம் ஆண்டில், ஆயர் மீண்டும் வந்தார்; மூவாயிரம் கிறிஸ்தவர்கள் வழியில் அவருக்காகக் காத்து நின்றார்கள்.`,
            },
            {
              year: `1861`,
              title: `பிரான்சிலிருந்து இரண்டு மணிகள்`,
              body: `இம்மணிகள் 1861-ஆம் ஆண்டில் பிரான்சின் வலான்ஸ் நகரில், விதவை கிரகோயர் அவர்களின் வார்ப்பகத்தில் வார்க்கப்பட்டன; அவற்றுக்குப் பணம் கொடுத்தவர் தம் பெயரை வெண்கலத்திலேயே பொறித்துவைத்தார்: காசிமிர் கிரகோயர். அவை வார்க்கப்பட்டுக்கொண்டிருந்தபோது இங்கே ஆலயத்தைக் கட்டிக்கொண்டிருந்த அருட்தந்தை ஜோசப் கிரகோயரும் வலான்ஸ் நகரில் பிறந்தவரே — கொடையாளி, வார்ப்பவர், அருட்தந்தை; ஒரே பெயர், ஒரே ஊர். ஆயினும் மேலும் பதினொரு ஆண்டுகளுக்கு அவை இங்கே ஒலிக்கவில்லை. பெட்டிகள் கடல்வழியாக வந்து திருநெல்வேலி மாவட்ட ஆட்சியர் அலுவலகம் வரை சேர்ந்து, அங்கேயே தங்கிவிட்டன. இறுதியில் அவற்றை நகர்த்தியது அந்த உலோகமே: மணிகளில் வார்க்கப்பட்டிருந்த சிலுவையையும், குழந்தையைத் தம் கைகளில் ஏந்திய அன்னையையும் ஒருவர் பார்த்து, இவை ஒரு கத்தோலிக்க ஆலயத்திற்கே உரியவை என்று உணர்ந்து, மாவட்ட ஆட்சியரிடம் அதைச் சொன்னார். 1872-ஆம் ஆண்டில், இறுதியாக, இரு கோபுரங்களிலும் தலா ஒன்றாக அவை தொங்கவிடப்பட்டன. அவை இரண்டும் சேர்ந்து ஒலிக்கும்போது, இந்த நாட்டில் வேறெங்கும் கேட்க முடியாத ஓர் இனிமை அவ்வொலியில் உண்டு என்று இவ்வூர் மக்கள் இன்றும் சொல்கிறார்கள்.`,
            },
            {
              year: `1863`,
              title: `கல்லில் எழுதப்பட்ட விலை`,
              body: `அந்தப் பதினேழு ஆண்டுகள் என்ன விலை கேட்டன என்பது ஆலயத்தின் அருகிலேயே எழுதப்பட்டுள்ளது. “வடக்கன்குளத்துக் கிறிஸ்தவர்களின் பக்தி, தங்கள் ஆலயத்தின் அருகே, 1863 ஜனவரி 25-ல் இறந்த அருட்தந்தை ஊஜென் ரொசினியோலுக்கு ஓர் எளிய கல்லறையை எழுப்பியது.” கள்ளிகுளத்துக் கிறிஸ்தவர்களைக் காலரா நோயில் பணிவிடை செய்யும்போதே அந்நோய் அவரையும் பிடித்தது. அங்கே அடக்கம் செய்யப்பட்ட கடைசி மனிதர் அவர் அல்ல. அருட்தந்தை விக்தோர் தெல்பெஷ் இறுதிக் காலத்தில் மீண்டும் இவ்வூருக்கே வந்தார்; காய்ச்சல் அவரைக் கொண்டு சென்றது; அருட்தந்தை பூஜே அவர்களின் கைகளிலேயே அவர் இறந்தார். அவரது கல் அந்த நாளையும் தருகிறது — 1887 ஜனவரி 16 — அவர் பிறந்த ஆண்டையும்: 1835. அவருக்குப் பின், 1899-ஆம் ஆண்டில், எழுபத்தெட்டு வயதில், அருட்தந்தை ரெமீஜியுஸ் பெர்னாண்டஸ். அக்கற்கள் இன்றும் படிக்கும்படியே உள்ளன; தெல்பெஷின் கல்லின் அடியில் உள்ள இலத்தீன் வரி, அவற்றை அங்கே நிறுவியவர் யார் என்பதைச் சொல்கிறது: அவரது சபைச் சகோதரர்களே இக்கல்லறையையும் அதைச் சுற்றியுள்ளவற்றையும் எழுப்பினார்கள்.`,
            },
            {
              year: `சுமார் 1864`,
              title: `ஓர் அரசு எழுத்தர் அவர்களைக் குறித்து வைத்தார்`,
              body: `சுமார் 1864-ஆம் ஆண்டைய பணிக்கள விவரங்களில், திருநெல்வேலி இயேசு சபைப் பணிக்களம் முழுவதிலும் மூன்று மடங்களை ஒரு பிரிட்டிஷ் மாவட்டக் கையேடு கணக்கிடுகிறது: ஒன்று தூத்துக்குடியில், ஒன்று அடைக்கலபுரத்தில், மற்றொன்று “வடக்கன்குளத்தில் நாட்டு அருட்சகோதரிகளுக்கான ஒரு மடம்.” முத்துக்குளிக் கடற்கரையிலிருந்து விலகி நின்ற ஒரே மடம் அதுவே. பணிக்களம் முழுவதிலும் இந்திய அருட்சகோதரிகள் பதினேழு பேர், ஐரோப்பிய அருட்சகோதரிகள் பன்னிரண்டு பேர்; மாபெரும் ஆலயம் இன்னும் கட்டுமானத் தளமாகவே இருந்தபோது, அவ்விந்திய அருட்சகோதரிகளின் இல்லம் ஒன்று இங்கே, உள்நாட்டில், நின்றது. அப்போது அவர்கள் இன்னும் ஒரு சபையாகவே ஆக்கப்படவில்லை: 1859 முதல் இந்தியப் பெண்களைத் துறவற வாழ்வில் இணைத்து வந்த பணிக்களம், 1876-ஆம் ஆண்டுதான் அவர்களை ஒரு சபையாக நிலைநாட்டியது; எனவே இவ்வூரில் இருந்த அச்சகோதரிகள், அறிக்கையிட ஒரு விதிமுறையே உருவாகும் முன்பிருந்த அந்தப் பொறுமையான ஆண்டுகளைச் சேர்ந்தவர்கள். எந்தப் பங்கு ஆவணமும் அவர்களை நினைவில் வைக்கவில்லை. ஓர் அரசு எழுத்தர் வைத்திருந்தார்.`,
            },
            {
              year: `1872`,
              title: `விரிந்த ஒரு கவராயம், ஒரே பீடத்தில் கூடுகிறது`,
              body: `1872-ஆம் ஆண்டில் அது கட்டி முடிந்தது. மாவட்ட அரசிதழ் அக்கட்டிடத்தை எந்த அலங்காரமும் இன்றிக் குறித்து வைக்கிறது: “ஒரே பொதுவான பீடப்பகுதியில் சந்திக்கும், ஒன்றை ஒன்று நோக்கி நெருங்கும் இரு மண்டபங்கள்.” அகுஸ்த் ஜான் இதை விரிந்த ஒரு கவராயமாகக் கண்டார்: வாசல்களில் அகன்று விரிந்த இரு கைகள், கட்டிடத்தின் நீளம் முழுவதும் நெருங்கி வந்து, இறுதியில் ஒரே பொதுக் கருவறையில் கூடுகின்றன. ஒரு ஜெர்மன் பயணி இதை இன்னும் எளிமையாகச் சொன்னார்: ஒரே பொதுவான உயர்பீடத்தைக் கொண்ட இரட்டை ஆலயம் — தன் வகையில் கட்டிடக் கலையின் தலைசிறந்த படைப்பு என்றும், “எங்கள் சகோதரர் பெர்கந்தாலின்” திறமைக்கு ஒளிமிக்க சான்று என்றும் அவர் எண்ணினார். அதன்மேல் தொண்ணூற்றிரண்டு அடி உயரமுள்ள இரு எண்கோணக் கோபுரங்கள் நிற்கின்றன; உள்ளே, மேற்கூரை வளைவுகள் செடிகளிலிருந்தும் மரங்களிலிருந்தும் எடுக்கப்பட்ட சாயங்களால் வரையப்பட்டன.`,
            },
            {
              year: `1872`,
              title: `ஜூன் மாதத்தின் அந்த இரு நாட்கள்`,
              body: `ஜூன் 27-ஆம் நாள் ஆயர் வந்து சேர்ந்தார்; புனித அலோசியஸ் சிற்றாலயத்தில் ஊர் அவரை வரவேற்றது. சகோதரர் பெர்கந்தாலும் அங்கே இருந்தார்: திட்டத்தை வரைந்து, பணி முழுவதும் அதன்மேல் நின்று கண்காணித்தவர், அது ஆசீர்வதிக்கப்படுவதைக் காண வந்திருந்தார். அன்று மாலை ஐந்து மணிக்கு ஆசீர்வாதம் நிகழ்ந்தது. பின்னர் ஆயரின் சொந்த வெள்ளி விழாவையும் கொண்டாடினார்கள் — அவரது ஆயர் அபிஷேகத்திற்குப் பின் இருபத்தைந்து ஆண்டுகள் நிறைவடைந்திருந்தன. 29-ஆம் நாள், புனித திருத்தூதர்களின் திருவிழாவில், கனோஸ் புதிய ஆலயத்தில் ஆயர் திருப்பலி நிறைவேற்றி, அதைத் திருக்குடும்பத்திற்கு அர்ப்பணிக்கப்பட்டதாக அறிவித்தார்.`,
            },
            {
              year: `1873`,
              title: `செங்கடல்`,
              body: `“இந்தத் திருத்தலத்தைக் கட்டுவது அவருக்கு எத்தனை கவலைகளையும் களைப்புகளையும் தந்தது என்பதைக் கடவுள் ஒருவரே அறிவார்” என்று அவருடைய வரலாற்றாசிரியர் எழுதினார் — அதற்குப் பின் இன்னும் கூரிய ஒரு வேதனை வந்து சேர்ந்தது. மக்கள் தங்கள் புதிய ஆலயத்தைப் பொறுப்பேற்ற அதே நாளில், சபை பிளவுபட்டது. அந்தத் தகராறு நீதிமன்றம் வரை சென்றது; பதினேழு ஆண்டுகளைக் கட்டுமானத்திற்குக் கொடுத்திருந்த அருட்தந்தை கிரகோயர், தம் சொந்த மந்தையின் ஒரு பகுதிக்கு எதிராக நீதிமன்றத்தில் நின்று சாட்சி சொல்ல வேண்டியதாயிற்று. அது அவரது உணவையும் உறக்கத்தையும் பறித்தது. அவரது வலிமை மீளவே இல்லை; அது மீளுமா என்று பார்ப்பதற்காக அவரை நாடு திரும்ப அனுப்பினார்கள். அருட்தந்தை விக்தோர் தெல்பெஷ் அவருடன் சென்றார். கப்பல் செங்கடலுக்குள் நுழைந்த நேரத்திலேயே மயக்க நிலை வெளிப்பட்டது; மறுநாள் காலை ஆறு மணிக்கு அவர் கண்களைத் திறந்தார், பேச முடியவில்லை. தெல்பெஷ் அவருக்கு நோயில் பூசுதல் அளித்தார்; பிற்பகல் இரண்டு மணியளவில், முப்பது ஆண்டுகள் மறைப்பணியாளராய் வாழ்ந்த பின், அவர் தம் ஆன்மாவைக் கடவுளிடம் ஒப்படைத்தார். அவற்றுள் பதினேழு ஆண்டுகள் இந்த ஆலயத்திற்குள்ளேயே சென்றன. அது இப்போது ஒன்றரை நூற்றாண்டு நின்றிருக்கிறது.`,
            },
          ],
        },
        {
          id: `little-rome`,
          span: `1889–1944`,
          heading: `சின்ன ரோமாபுரி`,
          blurb: `நள்ளிரவுத் திருப்பலியில் ஒரு புதியவர்; ஒரு திருவிழாத் தேர்; இடித்து அகற்றப்பட்ட ஒரு சுவர்; ஒரு புதிய மறைமாவட்டம் — பின், 1926-ல் ஓர் ஆயர் சொன்ன இரண்டே சொற்கள், இவ்வூரின் இரண்டாம் பெயராகவே ஆயின.`,
          dots: [
            {
              year: `1889`,
              title: `நள்ளிரவுத் திருப்பலியில் ஒரு புதியவர்`,
              body: `ஒரு கிறிஸ்துமஸ் முன்னிரவில் இவ்வழியே வந்த ஒரு பயணி, தான் கண்டதை எழுதி வைத்தார்: பிற்பகல் நான்கு மணி, தோரணங்கள் கட்டப்பட்ட நீண்ட தெருவின் முடிவில் ஆலயம், ஆரவாரத்துடன் அவரை வரவேற்க இரண்டாயிரம் பேர் காத்திருந்தார்கள். நள்ளிரவுக்கு முன் அவர் மீண்டும் வந்தபோது இரு மண்டபங்களும் கிட்டத்தட்ட நிரம்பியிருந்தன; அவர் எதிர்பார்த்திருந்த ஆரவாரமோ எங்கும் இல்லை. “ஆவிகளைப் போல அமைதியாகவும் மெல்லவும், நீண்ட வெண்ணிற ஆடைகளைப் போர்த்திய கிறிஸ்தவர்கள் ஆலயத்திற்குள் நுழைந்தார்கள்; வெறுங்காலுடன் கற்தளத்தின் மேல் நழுவி நடந்து, தரையில் முழந்தாளிட்டார்கள்; ஒரு பெரிய தீபத்தொங்கலின் மங்கிய ஒளி அவர்களின் ஒளிரும் முகங்களில் விழுந்தது.” கைகளை அவர்களை நோக்கி நீட்டியபடி நின்ற குழந்தை இயேசுவின் மெழுகு உருவத்தைச் சுற்றி அவர்கள் முழந்தாளிட்டார்கள்; இரு மண்டபங்களும் மாறி மாறிப் பாடின, ஒவ்வொன்றையும் அதனதன் மறைக்கல்வியாளர் வழிநடத்தினார். பின் நற்கருணை; அனைவரும் எழுந்தார்கள்: “அந்தத் திரு விருந்து மேசையின் முன் எல்லா வேறுபாடுகளும் மறைந்துபோயின; அவர்கள் அனைவரும் கடவுளின் பிள்ளைகளாக, ஒரே இதயமாக, ஒரே ஆன்மாவாக இருந்தார்கள்.” அனைவருக்கும் ஒரே பீடம் — 1855-ஆம் ஆண்டின் அடிக்கல் வாக்களித்திருந்ததை, ஓர் அன்னியர் பீடத்தடியில் நிகழக் கண்டார்.`,
            },
            {
              year: `1891`,
              title: `மலைகளைக் கடந்து, அன்னையின் பின்னே`,
              body: `ஆண்டுதோறும் ஆகஸ்ட் மாதத்தில் இவ்வூர் அன்னையைத் தேரில் ஏற்றித் தன் தெருக்கள் வழியே எழுந்தருளச் செய்கிறது; ஆண்டுதோறும் மலைகளைக் கடந்து கேரளத்திலிருந்து மக்கள் அன்னையின் பின்னே நடந்து வருகிறார்கள். இன்று வாழ்பவர் எவரும் நினைவுகூர முடியாத அளவுக்கு நெடுங்காலமாகவே இது நடந்து வருகிறது. திருவிதாங்கூரின் ஒரு திருச்சபை வரலாற்றாசிரியர், தலைமுறைகளுக்கு முன் இங்கே கொண்டாடப்பட்ட ஒரு விழாவைப் பற்றி 1903-ல் எழுதும்போது, அதை ஒரு சாதாரண, நிலைபெற்ற வழக்கமாகவே பதிவு செய்தார்: இவ்வாலயத்தின் விண்ணேற்பு மாதா திருவிழா, “மலையாள நாட்டுக் குடிமக்கள் பலர் ஆண்டுதோறும் செல்வது வழக்கம்” என்று. அவர் கத்தோலிக்கர் அல்லர்; இவ்விடத்தைப் புகழ்வதற்கு அவருக்கு எந்தக் காரணமும் இருக்கவில்லை. 1891-ஆம் ஆண்டில் இவ்வூர் தேரையே கட்டியது — முப்பத்தைந்து அடி உயரமுள்ள ஒரு தேர்; பலா, தேக்கு, வேம்பு மரங்களில் உள்ளூர்ச் சிற்பிகளால் செதுக்கப்பட்டது. நூறு ஆண்டுகளுக்கும் மேலாக அது அன்னையை இத்தெருக்களில் சுமந்தது; இப்போது அது திருப்பயணிகளின் அன்னையைத் தாங்கும் தொட்டிலாக ஓய்வெடுக்கிறது; 2014 முதல், புதிதாக வடிவமைக்கப்பட்ட ஒரு தேரே அந்த வீதியை எடுத்துக்கொண்டது. ஆகஸ்ட் 15-ஆம் நாள் விடியற்காலையில் ஊர்வலம் இன்றும் புறப்படுகிறது; ஏறத்தாழ ஒரு லட்சம் பேர் அதனுடன் நடக்கிறார்கள்.`,
            },
            {
              year: `சுமார் 1910`,
              title: `ஆலயத்திற்குள் இருந்த சுவர்`,
              body: `ஒரு தலைமுறைக் காலம், அருட்தந்தை கிரகோயர் கட்டிய ஆலயத்தின் உட்புறத்தில் ஒரு பிரிவினைச் சுவர் ஓடி, ஒரு மண்டபத்தை மற்றொன்றிலிருந்து பிரித்து நின்றது. சுமார் 1910-ல் அருட்தந்தை அத்ரியன் கௌசானல் அதை இடித்து அகற்றினார். திருநெல்வேலி மாவட்டம் குறித்த அரசின் அரசிதழ் இப்பங்கைப் பற்றிய உண்மையை அறிய விரும்பியபோது, அவரிடமே சென்று, அவர் சொன்னதையே அச்சிட்டது. அரசு அலுவலகத்தில் அந்த அருட்தந்தைக்கு இருந்த பெயர், அதிகாரத்தைப் பரிகசிப்பவர் என்பதே; “அந்த வலுசர்ப்பத்தை” அதன் குகை வரை துரத்திச் செல்லவே தாம் புறப்பட்டதாக மாவட்ட ஆட்சியர் எழுதுகிறார். அத்தனை மெலிந்த ஒரு மனிதரைத் தாம் அதுவரை கண்டதேயில்லை: பதினெட்டு ஆண்டுகளாகத் தாம் திடமான உணவே உண்டதில்லை, பாலும் கஞ்சியும் மட்டுமே என்று கௌசானல் அவரிடம் சொன்னார்; அதில் பக்தி எதுவும் இல்லை — தம்மை வாட்டிய அஜீரணத்தை வெல்ல அது ஒன்றே அவருக்கு இருந்த வழி. மருந்துகளையும் மூலிகைகளையும் அவர் அறிந்திருந்தார்; அவ்வூருக்கு அருட்தந்தையாக இருந்த அளவுக்கே மருத்துவராகவும் இருந்தார். அப்போது அவருக்கும் அவரது சபையின் பெரும் பகுதியினருக்கும் இடையே கடும் பூசல் ஒன்று நடந்துகொண்டிருந்தது; இருந்தும் அவர் அவர்களுக்குப் பணிசெய்வதை ஆட்சியர் கவனித்தார்: “வழிதவறிய தம் ஆடுகளின் வழிதவறல், அவர்கள்மேல் அவர் வைத்திருந்த பாசத்தைச் சிறிதும் பாதித்ததாகத் தெரியவில்லை.” 1930-ல் அவர் இறந்தபோது, அவரது சொந்த சபையின் இறப்பறிக்கை எந்தத் தயக்கமும் இன்றி எழுதியது: ஏறத்தாழ நாற்பது ஆண்டுகளாக அவர் “மாபெரும் மறைப்பணியாளர், இப்பணிக்களத்தின் புனிதர்.” 1855-ஆம் ஆண்டு அடிக்கல்லின் குறிக்கோள் வாசகம் வாக்களித்திருந்ததை, அப்போதுதான் அந்தக் கட்டிடம் உண்மையிலேயே ஆக அனுமதிக்கப்பட்டது: இரட்டையாக, ஆனால் ஒன்றாக.`,
            },
            {
              year: `சுமார் 1905–1920`,
              title: `பழைய ஏடுகளோடு இரவெல்லாம் அமர்ந்திருந்த அருட்தந்தை`,
              body: `சுமார் 1905-ஆம் ஆண்டில் ஒரு பிரெஞ்சுக்காரர் இப்பங்கிற்கு வந்து, பதினைந்து ஆண்டுகளுக்கு அருகில் இங்கேயே தங்கினார். தம் மாலைப் பொழுதுகளை அவர் எதற்குச் செலவிட்டார் என்பதை இயேசு சபையின் சொந்த இதழ் எந்த ஆரவாரமும் இன்றிப் பதிவு செய்கிறது: அருட்தந்தை அத்ரியன் கௌசானல் “நாட்குறிப்புகளையும், இந்நாட்டின் ஒரு வரலாற்றையும்” எழுதினார்; “பழைய கையெழுத்துப் படிகளைத் தேடிக் கண்டெடுத்து, அவற்றை வாசித்து விளக்குகிறார்.” இவ்வூரில் எங்கோ அதைவிடப் பழைய ஏடுகள் கிடந்தன: பதிவேடுகள், கடிதங்கள், இரு நூற்றாண்டுகளாக அருட்தந்தையர் விட்டுச் சென்ற அத்தனையும். இரவுக்கு இரவு அவற்றை முன் வைத்து அமர்ந்து, அவை என்ன சொல்கின்றன என்பதைக் கண்டறிந்தார். எங்கிருந்தும் வெகுதொலைவில் இருந்த ஓர் உள்நாட்டுக் கிராமத்தின் பங்குத் தந்தை அவர்; தமக்கு மிஞ்சிய மணித்துளிகளை, தாம் வாழ்ந்த மக்கள் தங்கள் கடந்த காலத்தை இழந்துவிடக் கூடாது என்பதற்காக அதைத் தொகுப்பதிலேயே செலவிட்டார். அந்த ஏடுகளிலிருந்து அவர் உருவாக்கிய நூல் அவருக்குப் பின்னும் நிலைத்தது; இயேசு சபையின் ஆவணக் காப்பகத்தில் அது இன்றும் பாதுகாக்கப்படுகிறது.`,
            },
            {
              year: `1923`,
              title: `மீனவக் கிராமங்களுக்கு நடுவே பதியப்பட்டது`,
              body: `1923-ஆம் ஆண்டு தூத்துக்குடி மறைமாவட்டம் நிறுவப்பட்டது; வடக்கன்குளம் பழைய திருச்சிராப்பள்ளி மறைமாவட்டத்திலிருந்து விலகிப் புதிய ஆயர் பீடத்திற்குள் வந்தது. அதன் முதல் ஆயர் பிரான்சிஸ் திபேர்த்தியுஸ் ரோச்: இயேசு சபையைச் சேர்ந்தவர்; ஸ்டீஃபன் நெயில் பதிவு செய்வதுபோல், இலத்தீன் வழிபாட்டு முறையின் முதல் இந்திய ஆயர். அடுத்த ஆண்டு வெளிவந்த கத்தோலிக்கக் கையேடு, இன்னும் வரையப்பட்டுக்கொண்டிருந்த ஒரு மறைமாவட்டத்தையே அச்சிடுகிறது: “இப்புதிய மறைமாவட்டத்தின் எல்லைகள் இன்னும் முற்றிலும் நிர்ணயிக்கப்படவில்லை. — இதில் அடங்கும் பங்குகளின் எண்ணிக்கையை இப்போது தர இயலாது.” அதனுள் அப்போது ஒரே ஒரு வட்டம்தான் இருந்தது — முத்துக்குளித்துறைக் கடற்கரை; உள்நாட்டில் நிற்கும் இப்பங்கோ அந்த மீனவக் கிராமங்களுக்கு நடுவே பதியப்பட்டுள்ளது: “வடக்கன்குளம் (திருநெல்வேலி மாவட்டம்) — அருட்தந்தையர் ஒய். இஞ்ஞாசி, ஜி. மைக்கேல் (உதவி) — கத்தோலிக்கர் 4,765; கிராமங்கள் 17; ஆலயங்கள்: செங்கல் 1, களிமண் 4.” இவ்விரு அருட்தந்தையரும் இயேசு சபையினர் அல்லர். இரு நூற்றாண்டுகளுக்கும் மேலான காலத்திற்குப் பின், இப்பங்கின் பொறுப்பு மறைமாவட்ட அருட்தந்தையரிடம் சென்றது — அதன் புதிய ஆயரே ஓர் இயேசு சபையினராக இருந்த அதே ஆண்டில்.`,
            },
            {
              year: `1926`,
              title: `சின்ன ரோமாபுரி`,
              body: `வடக்கன்குளத்திற்கு ஓர் இரண்டாம் பெயர் உண்டு: சின்ன ரோமாபுரி. 1926-ஆம் ஆண்டில், தாம் காண வந்த ஆலயத்தை முன்னிட்டு, தூத்துக்குடியின் முதல் ஆயர் ரோச் அவர்கள் அப்பெயரைத் தந்தார் என்று இவ்வூர் நினைவுகூர்கிறது; அவர் குறிப்பிட்டது அதன் வடிவமைப்பையே என்று இப்பங்கு சொல்கிறது. நினைவு மலர் அதைத் தெளிவாகவே கூறுகிறது: உரோமையின் மாபெரும் பேராலயத்தின் பாணியிலேயே இக்கட்டிடம் எழுப்பப்பட்டது; உரோமையைத் தவிர உலகில் வேறெங்கும் இதற்கு நிகர் இல்லை. இது கேட்பதை விடக் குறைவான மிகையே. இவ்வூரைச் சின்ன ரோமாபுரி என்று யாரும் அழைப்பதற்கு முப்பது ஆண்டுகளுக்கு முன்பே, பணிக்களத்தின் சொந்த வரலாற்றாசிரியர் எழுதிவிட்டிருந்தார்: அருட்தந்தை கிரகோயரின் பதினேழு ஆண்டு உழைப்பு வடக்கன்குளத்திற்கு “உலகிலேயே ஒருவேளை நிகரற்ற ஓர் ஆலயத்தை” அளித்தது என்று. அப்பெயர் கட்டிடத்தை மட்டும் குறித்ததும் அல்ல. இவ்வூரைப் புகழ வேண்டிய தேவை சிறிதும் இல்லாத ஓர் அரசு அரசிதழ், இவ்வூரைப் பதிவு செய்யும்போது இதைச் சொல்கிறது: காமநாயக்கன்பட்டிக்கு அடுத்தபடியாக, “பழைய மதுரைப் பணிக்களம் திருநெல்வேலிக்குள் முன்னேறிய இரண்டாவது மையம்” இதுவே; மேலும், “காலப்போக்கில் இம்மாவட்டத்தில் அப்பணிக்களத்தின் தலைமை மையமாக இது ஆயிற்று.” ஏறத்தாழ ஒரு நூற்றாண்டுக்கு, உள்நாட்டுப் பணிக்களம் இங்கிருந்தே நடத்தப்பட்டது. சின்ன ரோமாபுரி என்பது ஒரு கிராமத்திற்குச் சொல்லப்பட்ட புகழுரை அல்ல; அவ்வூர் என்னவாக இருந்ததோ அதன் விவரிப்பே. அன்றிலிருந்து இது சின்ன ரோமாபுரியே: திருப்பயணிகளின் நாவிலும், சாலையோரப் பலகைகளிலும், அடுத்த மாவட்டத்தினர் தாங்கள் எங்கே செல்கிறோம் என்று இன்றும் சொல்லும் விதத்திலும்.`,
            },
            {
              year: `1930`,
              title: `காட்டில் கேட்ட மணியோசை`,
              body: `உரோமையில், ஆயர் ரோச் அவர்கள் தம் மக்களின் வணக்கத்தைத் திருத்தந்தை பதினொன்றாம் பயஸ் அவர்கள் முன் சமர்ப்பித்தார்; தூத்துக்குடியின் மிகவும் தகுதிவாய்ந்த கிறிஸ்தவர்களுக்குத் திருத்தந்தை நினைவுப் பரிசுகளை அனுப்பிவைத்தார். அவற்றுள் ஒன்று வடக்கன்குளத்தின் வயது முதிர்ந்த ஆலயப் பணியாளருக்குச் சென்றது — ஒரு பொது விகாரியின், ஒரு துறவற மடத் தலைவியின் சகோதரர்; எண்பத்திரண்டு வயதிலும் இவ்வாலயத்தின் பீடத்தறைப் பணியைத் தொடர்ந்து செய்துவந்தவர். அவருக்கு “பெனே மெரெந்தி” பதக்கம் வழங்கப்பட்டது. இயேசு சபையின் இதழ் அவரது வயதையும் பணியையும் அச்சிட்டது; அவரது பெயரை அச்சிட மறந்துவிட்டது. அதற்காக வருந்த வேண்டியதில்லை: அந்தப் பணி, அதைச் செய்த மனிதரை விடப் பழையது. நாற்பது ஆண்டுகளுக்கு முன், இவ்வூரின் ஆலயப் பணியாளர் பொறுப்பு ஒரே குடும்பத்தில் இருநூறு ஆண்டுகளாகத் தொடர்ந்து வருகிறது என்று ஒரு பயணிக்குச் சொல்லப்பட்டது; அதற்கான காரணமும் சொல்லப்பட்டது. கணவனும் மனைவியுமான இருவர் ஒரு கோயிலுக்குத் திருப்பயணம் சென்றபோது, புலிகள் நிறைந்த ஒரு காட்டில் வழிதவறினார்கள். இரவு அவர்கள்மேல் இறங்கியது; தங்கள் தெய்வங்களை அழைத்தார்கள், பதிலே இல்லை; பின், வெகுதூரத்தில், ஒரு மணியோசை கேட்டது. அதை நோக்கி நடந்து ஒரு குடிசையின் வாசலை அடைந்தார்கள்; அங்கே ஒரு முதியவர் அவர்களுக்குச் சோறும் வாழைப்பழமும் படைத்து, அன்றிரவுக்குப் படுக்கையும் தந்தார். காலையில், அந்தக் கோயிலுக்குச் செல்லும் வழியை அவரிடம் கேட்டார்கள். அவர் தம் கண்களை விண்ணை நோக்கி உயர்த்தி, சிலுவை அடையாளம் வரைந்து, அதற்குப் பதிலாக அவர்கள் ஒருபோதும் கேள்விப்படாத ஒரு கடவுளைப் பற்றிப் பேசத் தொடங்கினார்; அவ்வளவு நன்றாகப் பேசினார் — அவர்கள் அதற்கு மேல் ஓரடிகூட நகரவில்லை. சில நாட்களுக்குள் இவ்வூரின் மிகுந்த பக்தியுள்ள கிறிஸ்தவர்களாக அவர்கள் ஆனார்கள். அந்தக் கணவர் இவ்வாலயத்தின் ஆலயப் பணியாளராக்கப்பட்டார்; தன் மீட்பிற்கே கருவியாக இருந்த அந்த மணியை ஒலிப்பதைச் சிறிய பேறாக அவர் ஒருபோதும் கருதவில்லை. “அந்த நல்ல திருப்பயணிகளின் வழித்தோன்றல்கள் எண்ணிக்கையில் பலர்,” என்று அந்தப் பயணி எழுதினார்; “அவர்களுள் முன்மாதிரியான அருட்தந்தையராய் விளங்கும் பலரை நான் அறிவேன்.”`,
            },
            {
              year: `1944`,
              title: `பாத்திமாகிரி`,
              body: `ஆசியாவில் நிறுவப்பட்ட முதல் ஆண் தியானத் துறவு சபையான ஜெபமாலைத் தாசர் சபை, 1928-ஆம் ஆண்டு யாழ்ப்பாணத்தில் அருட்தந்தை பி. ஏ. தாமஸ் அவர்களால் தொடங்கப்பட்டது; அச்சபை 1944-ஆம் ஆண்டு பிப்ரவரி 13-ஆம் நாள் வடக்கன்குளத்திற்கு வந்தது. சபை “இறைவனின் ஊழியர்” என்று போற்றும் அந்தோணி சூசைநாதர் அவர்கள், மறைமாவட்டத்தின் உதவியுடன் நான்கு ஏக்கர் நிலம் வாங்கி, அங்கே ஒரு சிறு சிற்றாலயத்தையும் தங்குமிடங்களையும் எழுப்பியிருந்தார்; துறவியர் வந்து சேர்ந்த அன்றே ஆயர் ரோச் அவர்கள் வந்து அவ்விடத்தை ஆசீர்வதித்தார் — பதினெட்டு ஆண்டுகளுக்கு முன் இவ்வூரைச் சின்ன ரோமாபுரி என்று அழைத்த அதே ஆயர். இந்திய மண்ணில் எழுந்த முதல் ஜெபமாலைத் தாசர் இல்லம் அதுவே. இன்றும் அதை அத்தந்தையரே காத்து வருகிறார்கள்; சேவைட் சகோதரிகள், பெத்தானி சகோதரிகளுடன் சேர்ந்து அவர்களும் இப்பங்கின் சாதாரண வாரத்தின் ஒரு பகுதியே.`,
            },
          ],
        },
        {
          id: `town-of-learning`,
          span: `1892–1970`,
          heading: `கல்வி தழைத்த ஊர்`,
          blurb: `ஊர்ச் சிறுமிகளுக்கு எழுத்துக் கற்பித்த அருட்சகோதரிகள், லேஸுக்கும் ஊசிக்கும் ஒரு பள்ளி, இறுதியில் நாற்பது படுக்கைகள் கொண்ட ஒரு மருத்துவமனை — ஏழ்மையான ஒரு பங்கு தனக்குத் தானே கட்டிக்கொண்ட ஏணி.`,
          dots: [
            {
              year: `1892`,
              title: `சிறுமியர் எழுத்துப் பயின்ற நாள்`,
              body: `அருட்சகோதரிகள் வருவதற்கு நெடுங்காலம் முன்பே இவ்வூரில் ஒரு பெண்கள் பள்ளி இருந்ததாகச் சொல்லப்படுகிறது: சர்ச் மிஷனரி சொசைட்டியைச் சேர்ந்த ரேனியுஸ், ஸ்மிட் ஆகியோர் 1821-ஆம் ஆண்டில் இங்கே ஒன்றைத் தொடங்கி, எழுத்தோடு சேர்த்து ஊசிவேலையையும் லேஸ் பின்னலையும் கற்பித்ததாக நினைவுகூரப்படுகிறது. ஏழு வியாகுல அன்னையின் அருட்சகோதரிகள் இந்தியத் துறவறப் பெண்கள்; 1876-ஆம் ஆண்டு திருச்சிராப்பள்ளியில் உருவானவர்கள். 1892-ஆம் ஆண்டளவில் அவர்கள் அறுபத்தைந்து பேர்; அந்நகருக்கு அப்பால் அவர்கள் நடத்திய நான்கு இல்லங்களுள் ஒன்று இங்கே இருந்தது. சிறுமியருக்குக் கல்வி அளிப்பதே அவர்களின் தனிச்சிறப்புப் பணி; “எங்கும் அவர்கள் செழித்தோங்கும் பள்ளிகளை நடத்துகிறார்கள்” என்று அவர்களைப் பற்றி எழுதப்பட்டது. இயேசு சபையின் உரோமைப் பதிவேடு, வடக்கன்குளத்தின் அருட்தந்தையை அம்மடத்தின் ஆன்மிகக் குருவாகவும் அதன் பள்ளியின் இயக்குநராகவும் குறித்து வைக்கிறது — 1900-ஆம் ஆண்டிலும், மீண்டும் 1914-ஆம் ஆண்டு அருட்தந்தை கௌசானல் அவர்கள் காலத்திலும். பெரும்பாலான பெண்களுக்கு வாசிக்கவே கற்பிக்கப்படாத ஒரு நாட்டில், இவ்வூர்ச் சிறுமிகளுக்கு வாசிக்கக் கற்பிக்கப்பட்டது.`,
            },
            {
              year: `சுமார் 1922`,
              title: `லேஸும் நூலும் ஊசியும்`,
              body: `1921-ஆம் ஆண்டில் அருட்சகோதரிகளின் ஊசிவேலைப் பள்ளிக்கு ஓர் ஆய்வாளர் வந்து பார்வையிட்டார். 1922 முதல் அவர்கள் ஊசிவேலை, சித்திரத் தையல், லேஸ், பின்னல், ஆடை தைத்தல் ஆகியவற்றைக் கற்பித்து வந்தார்கள்; 1966-ஆம் ஆண்டில் தையல் பள்ளியின் முழுப் பொறுப்பும் அவர்கள் கைக்கே வந்தது. ஆர்.சி. லேஸ் தொழிற்பள்ளியும் ஒசானம் தையல் நிலையமும் இன்றுவரை இப்பங்கின் பணிகளுள் ஒன்றாக எண்ணப்படுகின்றன. இவ்வூர் தன் மகள்களுக்காகக் கட்டிய அந்த ஏணியின் இரண்டாவது படி இவையே: முதலில் எழுத்து, பின் விரல்களில் ஒரு தொழில், பின் மழையை நம்பியிராத ஓர் ஊதியம்.`,
            },
            {
              year: `1970`,
              title: `விசுவாசம் உண்டு, எழுத்து உண்டு, மருத்துவர் இல்லை`,
              body: `தம் மக்களுக்கு விசுவாசமும் எழுத்தும் இருந்தன, மருத்துவர் மட்டும் இல்லை என்பதை அன்றைய பங்குத் தந்தை அருட்தந்தை மரிய ஞானம் அவர்கள் கண்டார்; பெத்தானியின் குழந்தை தெரேசாள் அருட்சகோதரிகளுக்கு எழுதினார். நான்கு சகோதரிகள் 1970-ஆம் ஆண்டு ஜூலை 27-ஆம் நாள் வந்து சேர்ந்து, ஒரு வாடகை வீட்டில் தங்கள் நலமளிக்கும் பணியைத் தொடங்கினார்கள். மிசெரியோர் நிறுவனத்தின் உதவியுடன், இன்று நிற்கும் இடத்திலேயே புனித தோமையார் மருத்துவமனையைக் கட்டினார்கள் — நாற்பது படுக்கைகளும் ஓர் அறுவைச் சிகிச்சை அறையும்; சுற்றியுள்ள இருபத்தைந்து முதல் முப்பது கிராமங்களுக்குச் சேவை. இன்றளவும் அவர்களே அதைப் பேணி வருகிறார்கள்.`,
            },
          ],
        },
        {
          id: `shrine-and-the-saint`,
          span: `1993–இன்று வரை`,
          heading: `திருத்தலமும் புனிதரும்`,
          blurb: `திருத்தலமாக அறிவிக்கப்பட்டு, கொடிமரத்தால் முடிசூட்டப்பட்டு, தன் சுவர்களுக்குள் திருமுழுக்குப் பெற்றவர் புனிதராக அறிவிக்கப்பட்டதில் மகிழ்ந்து நிற்கிறது.`,
          dots: [
            {
              year: `1993`,
              title: `ஒரு திருத்தலம், ஒரு முதல் சனிக்கிழமை`,
              body: `1993-ஆம் ஆண்டு ஆகஸ்ட் 6-ஆம் நாள், தூத்துக்குடியின் ஆயர் எஸ். டி. அமலநாதர் அவர்கள் திருக்குடும்ப ஆலயத்தை அர்ச்சித்து, அதைப் புனிதத் திருத்தலமாக அறிவித்தார். அப்பெருமையுடன் சேர்ந்து வந்தது மாதந்தோறும் ஒரு முதல் சனிக்கிழமை — நவநாளும் ஆராதனையும்; அவ்வாண்டு முதல் இவ்வாண்டு வரை திருப்பயணிகள் அதைக் கைவிடாமல் கடைப்பிடித்து வருகிறார்கள்.`,
            },
            {
              year: `2014`,
              title: `புதிய தேர் வீதிக்கு வருகிறது`,
              body: `2014-ஆம் ஆண்டில், விண்ணேற்பு மாதாவின் திருவிழாத் தேர் ஒன்றை இப்பங்கு புதிதாக வடிவமைத்துக் கட்டியது; நூற்று இருபத்து மூன்று ஆண்டுகள் ஊர்வலம் சென்றபின், 1891-ஆம் ஆண்டு இவ்வூர் செதுக்கிய பழைய தேர் வீதியிலிருந்து விலகியது. அதே ஆண்டுகளில், மாதா காட்சித் திருத்தலத்தின் கல்வாரிச் சிற்றாலயம் நிறைவுபெற்றது; புனித தேவசகாயம், புனித அருளானந்தர் ஆகியோரின் திருவுருவங்களும் நிறுவப்பட்டன — இங்கே திருமுழுக்குப் பெற்ற மனிதரும், இவ்விடத்தை நிறுவிய மனிதரும்.`,
            },
            {
              year: `2021`,
              title: `கொடிமரம்`,
              body: `2021-ஆம் ஆண்டு ஆகஸ்ட் 6-ஆம் நாள், ஆயர் ஸ்டீபன் அந்தோனி அவர்கள் கொடிமரத்தை அர்ச்சித்தார்; அது பங்குத் தந்தை அருட்தந்தை ஜான் பிரிட்டோ அவர்களின் காலத்தில் நிறுவப்பட்டது. அந்நாள், ஆகஸ்ட் 15-ஆம் நாள் விண்ணேற்புப் பெருவிழாவில் நிறைவடையும் பத்து நாள் பெருங்கூர் திருவிழாவின் தொடக்க நாள் — அத்துடன், இருபத்தெட்டு ஆண்டுகளுக்கு முன் இவ்வாலயம் திருத்தலமாக அறிவிக்கப்பட்ட அதே நாளும் அதுவே.`,
            },
            {
              year: `2022`,
              title: `தலைப்பாகையும் சங்கிலிகளும்`,
              body: `2022-ஆம் ஆண்டு மே 15-ஆம் நாள், 1745-ஆம் ஆண்டு மே 14-ஆம் நாள் இந்த ஆலயத்தில் திருமுழுக்குப் பெற்ற தேவசகாயம் பிள்ளையைத் திருத்தந்தை பிரான்சிஸ் அவர்கள் புனிதராக அறிவித்தார் — பீடங்களுக்கு உயர்த்தப்பட்ட முதல் இந்தியப் பொதுநிலையாளர். அவரைப் பற்றி இவ்வாலயம் வைத்திருப்பவற்றை அது நெடுங்காலமாகவே வைத்திருக்கிறது. 1888-ஆம் ஆண்டு கிறிஸ்துமஸ் நாளில் இங்கு வந்திருந்த ஓர் அருட்தந்தை, அன்றைய நாளின் மிக விலைமதிப்பற்ற நினைவு அந்த இரத்தசாட்சியே என்று எழுதினார்: “அவர் அணிந்திருந்த தலைப்பாகையையும், அவர் இறக்கும்போது கழற்றப்பட்ட சங்கிலிகளையும் வடக்கன்குளம் வைத்திருக்கிறது.” அருட்தந்தை பூஜே அந்தத் திருப்பேழையைத் திறந்து அவர்களைப் பார்க்கவிட்டார். திருவிதாங்கூர் அரசவை அதிகாரி ஒருவர் அணிந்திருந்த அந்தத் தலைத்துணி இன்றும் இங்கே பாதுகாக்கப்படுகிறது; ஒவ்வொரு ஆகஸ்ட் 15-ஆம் நாளும் திருப்பயணிகள் வணங்குவதற்காக அது கண்ணாடிப் பெட்டியில் வைக்கப்படுகிறது.`,
            },
            {
              year: `2012–2025`,
              title: `பொதுநிலையினரின் பாதுகாவலர்`,
              body: `இது 2022-ல் தொடங்கவும் இல்லை, முடியவும் இல்லை. 2012 ஜூன் மாதத்தில் திருத்தந்தை பதினாறாம் பெனடிக்ட் அவர்கள் அவரது இரத்தசாட்சியத்தை ஏற்றார்; அதே ஆண்டு டிசம்பர் 2-ஆம் நாள், திருத்தந்தையின் பெயரால், கர்தினால் ஆஞ்செலோ அமாத்தோ அவர்கள் நாகர்கோவிலில் அவரை அருளாளராக அறிவித்தார். திருத்தந்தை பிரான்சிஸ் அவர்கள் 2020 பிப்ரவரியில் புதுமையை ஏற்று, 2022 மே மாதத்தில் அவரைப் புனிதராக அறிவித்தார். பின்னர், 2025 ஜூலை 16-ஆம் நாளிட்ட ஓர் ஆணையின்படி — அக்டோபர் 15-ஆம் நாள் முறையாகப் பறைசாற்றப்பட்டது — இந்தியப் பொதுநிலையினரின் பாதுகாவலர் என உரோமை அவரை அறிவித்தது. இந்தத் திருமுழுக்குத் தொட்டியில் திருமுழுக்குப் பெற்ற அந்த மனிதரே, இன்று இந்நாட்டின் ஒவ்வொரு பொதுநிலைக் கத்தோலிக்கருக்கும் பாதுகாவலர்.`,
            },
            {
              year: `இன்று`,
              title: `இன்றைய சின்ன ரோமாபுரி`,
              body: `வடக்கன்குளம் பெருவாரியாகக் கத்தோலிக்க நகரம்; கல்வியறிவிலும் குறிப்பிடத்தக்கது — மக்கள்தொகைக் கணக்கெடுப்பு 9,220 பேரைக் கணக்கிடுகிறது, அவர்களுள் நூற்றுக்குத் தொண்ணூற்று நான்கு பேர் வாசிக்கத் தெரிந்தவர்கள். அன்பியங்கள் வழியாக ஒழுங்கமைக்கப்பட்ட, சுமார் 4,000 குடும்பங்களில் சுமார் 10,500 கத்தோலிக்கர் என இப்பங்கு கணக்கிடுகிறது. மாபெரும் ஆகஸ்ட் பெருங்கூர் திருவிழா, ஆகஸ்ட் 15-ஆம் நாள் விடியற்காலையில் நடைபெறும் தேர் ஊர்வலத்திற்காக இன்றும் ஒரு லட்சத்திற்கு அருகில் திருப்பயணிகளை ஈர்க்கிறது; அவர்களுள் பலர் கேரளத்திலிருந்து கடந்து வருகிறார்கள். ஆண்டின் மற்ற நாட்களில், தன் “வடவை மாதா மலர்” இதழ் வழியாகவும் தன் சொந்த நேரடி ஒளிபரப்புகள் வழியாகவும் இப்பங்கு தன் மக்களை நெருக்கமாக வைத்திருக்கிறது. அந்த இரு மணிகளும் சேர்ந்து ஒலிக்கும்போது, இவ்வூர் மக்கள் எப்போதும் சொல்லிவரும் அதே ஓசையையே அவை இன்றும் தருகின்றன.`,
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
          href: `/saints/john-de-britto`,
        },
      ],
    },
    saintDevasahayam: {
      back: `எங்கள் பங்கின் புனிதர்கள்`,
      label: `எங்கள் பங்கின் புனிதர்`,
      name: `புனித தேவசகாயம் பிள்ளை`,
      epithet: `தேவசகாயம் — “கடவுளே என் துணை”`,
      intro: `1745-இல் திருமுழுக்குப் பெற இந்த ஆலயத்திற்கு வந்த திருவிதாங்கூர் அரசப் படை அதிகாரி — அத்திருமுழுக்கு இங்கே நிகழ்ந்தது என்பதைத் திருத்தூதுப் பேரவையின் சொந்தப் பதிவே பெயர் குறித்துச் சொல்கிறது. 1752-இல் ஆரல்வாய்மொழிக் காவல் எல்லையில் விசுவாசத்திற்காகச் சுட்டுக் கொல்லப்பட்ட இவர், 2022-இல் புனிதரானார் — பீடத்திற்கு உயர்த்தப்பட்ட, இந்தியாவில் பிறந்த முதல் பொதுநிலையினர். அவரது மனைவி இப்பங்கின் மண்ணிலேயே உறங்குகிறார்.`,
      feast: `திருவிழா — ஜனவரி 14`,
      canonised: `2022 மே 15 அன்று திருத்தந்தை பிரான்சிஸ் அவர்களால் புனிதராக அறிவிக்கப்பட்டார்`,
      facts: [
        {
          label: `பிறப்புப் பெயர்`,
          value: `நீலகண்ட பிள்ளை — 1712 ஏப்ரல் 23, திருவிதாங்கூரின் நாட்டாலத்தில் பிறந்தார்`,
        },
        {
          label: `அரசப் பணியில்`,
          value: `மன்னர் மார்த்தாண்ட வர்மாவின் படை அதிகாரி; “மன்னரின் அரசவையில் பதவி வகித்தார்”`,
        },
        {
          label: `விசுவாசத்திற்கு வழிகாட்டியவர்`,
          value: `திருவிதாங்கூர்ப் படைகளுக்குத் தலைமை தாங்கிய பிளெமிஷ் வீரர் எவுஸ்தாக்கியு தெ லானுவா`,
        },
        {
          label: `மறைக்கல்வி`,
          value: `இப்பங்கின் அருட்தந்தை ஜோவான்னி பத்திஸ்தா புத்தாரி, இ.ச. அவர்களிடம் ஒன்பது மாதங்கள்`,
        },
        {
          label: `திருமுழுக்கு`,
          value: `1745 மே 14, வடக்கன்குளம் ஆலயத்தில் — திருத்தூதுப் பேரவையால் பதிவு செய்யப்பட்ட இடம்`,
        },
        {
          label: `ஏற்ற பெயர்`,
          value: `தேவசகாயம் — “கடவுளே என் துணை”; இலாசர் என்பதன் தமிழ் வடிவம்`,
        },
        {
          label: `கைது`,
          value: `1749 பிப்ரவரி 23; ஏறத்தாழ மூன்று ஆண்டுகள் சங்கிலியில்`,
        },
        {
          label: `இரத்தசாட்சியம்`,
          value: `1752 ஜனவரி 14–15 இரவில், ஆரல்வாய்மொழிக் காவல் எல்லையில் சுடப்பட்டார்; கோட்டாற்றில் அடக்கம்`,
        },
        {
          label: `புனிதர் பட்டம்`,
          value: `2022 மே 15, புனித பேதுரு சதுக்கம் — புனிதராக அறிவிக்கப்பட்ட, இந்தியாவில் பிறந்த முதல் பொதுநிலையினர்`,
        },
      ],
      quote: `தாமதத்திற்கு எந்தக் காரணமும் இல்லை. இது கட்டாயத் திருமுழுக்கு அல்ல. வலுக்கட்டாயத்தால் அல்ல, என் சொந்த விருப்பத்தாலும் ஆசையாலுமே அருட்சாதனங்களைப் பெற நான் இங்கே வந்தேன். எந்த உண்மையின் ஒளியை நான் பெற்றேனோ, எதைக் குறித்து நான் உறுதி கொண்டேனோ, அந்த உண்மையைக் காக்க என் உயிரையும் தருவேன்.`,
      quoteAttribution: `அருட்தந்தை புத்தாரி தயங்கியபோது இந்தத் தீர்த்தத்தடியில் அவர் அளித்த பதில் — திருவிதாங்கூரின் புராட்டஸ்டன்ட் வரலாற்றாசிரியர் சி. எம். அகுர் 1903-இல் பதிவு செய்தது. பதினெட்டாம் நூற்றாண்டு உரையாடலைப் பத்தொன்பதாம் நூற்றாண்டு எழுத்தாளர் பதிவு செய்கிறார்: இது வாய்மொழியாகக் கடத்தப்பட்ட சொற்கள்; அப்போதே எழுதி வைக்கப்பட்ட குறிப்பு அல்ல`,
      lifeLabel: `அவரது வாழ்க்கை`,
      lifeTitle: `திருவிதாங்கூர் அரசவையிலிருந்து ஆரல்வாய்மொழிக் காவல் எல்லை வரை`,
      lifeIntro: `நாற்பது ஆண்டுகள்; அவற்றுள் இறுதி மூன்று ஆண்டுகள் சங்கிலியில். பின்வருவது நூல்களிலிருந்து சொல்லப்படுகிறது; ஒவ்வொரு பகுதியும் தான் எதன்மேல் நிற்கிறது என்பதைத் தானே சொல்கிறது.`,
      noteLabel: `குறிப்பு`,
      alts: {
        court: `ஓவியம் — வெண்ணிற வேட்டி அணிந்த திருவிதாங்கூர் உயர்குடி மகன் ஒருவர் ஆற்றின்மேல் உள்ள பாறையில் மண்டியிட்டுச் செபிக்கிறார்; கழுத்திலும் கைகளிலும் பொன் அணிகலன்கள், பின்னணியில் காலை ஒளியில் அரண்மனையும் அதன் கோபுரங்களும்`,
        font: `ஓவியம் — மெழுகுவர்த்தி ஒளிரும் சிற்றாலயத்தினுள், கறுப்பு உடையணிந்த இயேசு சபைக் குரு மண்டியிட்டிருப்பவரின் தலைமீது நீர் வார்க்கிறார்; மறைக்கல்வி ஆசிரியர் ஒருவர் மெழுகுவர்த்தி ஏந்தி நிற்க, திருமுழுக்குப் பெறுபவரின் தலைப்பாகையும் அணிகலன்களும் மேசையின்மேல் கழற்றி வைக்கப்பட்டுள்ளன`,
        timber: `ஓவியம் — காட்டுப் பாதையில் ஊதா நிற அங்கி அணிந்து குதிரையிலிருக்கும் அரசவைப் பெரியவர் ஒருவர், தலைவணங்கி நிற்கும் மனிதரிடம் கை உயர்த்துகிறார்; அருகில் சீவப்பட்ட மரக்கட்டைகள் ஏற்றிய மாட்டு வண்டி, பின்னால் பாதி கட்டப்பட்ட கல் ஆலயம்`,
        chained: `ஓவியம் — விடியலின் ஒளியில் பாறை நிலத்தில் சங்கிலியுடன் மண்டியிட்டு, கைகளை மார்பில் குவித்துச் செபிக்கும் புனித தேவசகாயம்; இருளில் ஈட்டியேந்திய காவலர்கள், அருகில் ஒரு நீர்ப் பானை`,
        gnanapoo: `புகைப்படம் — பங்கின் கல்லறைத் தோட்டத்தில் ஞானப்பூ அம்மாளின் கல்லறை: பழைய கருங்கல் சிலுவையைத் தாங்கி நிற்கும் வெண்ணிற வளைவு நினைவுச்சின்னம், அவரது பெயரைக் குறிக்கும் தமிழ்ப் பலகையுடன்`,
      },
      sections: [
        {
          key: `court`,
          heading: `மன்னரின் வீரன்`,
          body: `1712 ஏப்ரல் 23-ஆம் நாள் திருவிதாங்கூர் அரசின் நாட்டாலத்தில் நீலகண்ட பிள்ளை என்ற பெயரில் பிறந்தார்; 1729-இல் மன்னர் மார்த்தாண்ட வர்மாவின் படையில் சேர்ந்தார். அரசவையில் உயர் பதவிக்கு உயர்ந்து, படைப் பொறுப்பும் ஒப்படைக்கப்பட்டார். 1901-இல் திருவிதாங்கூரின் சமய வரலாற்றை எழுதிய ஓர் ஆங்கிலேய அரசு அதிகாரி — இப்பங்கின்மேல் எவ்விதப் பற்றுமற்ற ஒரு புராட்டஸ்டன்ட் — அவரை “மன்னரின் அரசவையில் பதவி வகித்தவர்” என்றே எளிமையாகப் பதிவு செய்கிறார்; மனமாற்றத்தின்போது அவரது வயதை முப்பத்திரண்டு எனத் தருகிறார். பின்னர் தொடர்ச்சியான இழப்புகள் வந்தன: கால்நடைகள் இறந்தன, பயிர்கள் அழிந்தன; பதவியாலோ அரச ஆதரவாலோ ஈடுசெய்ய இயலாத இழப்புகள். அவர்மேல் ஒரு துயரம் இறங்கி, அது விலகவே இல்லை. பிற்காலத்தில் அவருக்கு மறைக்கல்வி அளித்த குரு அவரை ஒரே சொல்லில் — “சோகம் சூழ்ந்தவர்” — என்றார்.`,
          note: ``,
        },
        {
          key: `lannoy`,
          heading: `யோபுவின் கதையைச் சொன்ன பிளெமிஷ் வீரன்`,
          body: `எவுஸ்தாக்கியு தெ லானுவா திருவிதாங்கூருக்கு எதிரியாகவே வந்தவர். 1741-இல் குளச்சலில் கைதியாகப் பிடிக்கப்பட்டு, கொல்லப்படாமல் மன்னரின் பணியில் சேர்க்கப்பட்டு, படைகளுக்குத் தலைமை தாங்கும் நிலைக்கு உயர்ந்தார்; அவர் “மிகச் சிறந்த ஒரு கிறிஸ்தவரும் ஆவார்” என்று வரலாற்று நூல்கள் சொல்கின்றன. தம் அருகில் துயரத்தில் இருந்த அந்த அதிகாரியிடம், உண்மைக் கடவுள் ஒருவரையே பணிவோருக்கு வாக்களிக்கப்பட்ட அழியாச் செல்வங்களைப் பற்றிப் பேசினார்; யோபுவின் கதையையும் சொன்னார் — எல்லாவற்றையும் இழந்தும் கைவிடாத ஒரு மனிதனின் கதை. அச்சொற்கள் அவர்மேல் “வானிலிருந்து இறங்கிய தைலம் போல்” விழுந்தன என்று பழைய பதிவு நினைவுகூர்கிறது.`,
          note: ``,
        },
        {
          key: `font`,
          heading: `இந்தத் தீர்த்தத்தில் திருமுழுக்கு, 1745 மே 14`,
          body: `தெ லானுவா ஒரு பரிந்துரைக் கடிதத்துடன் அவரை இங்கே அனுப்பினார் — அப்போது வடக்கன்குளக் கிறிஸ்தவர்களுக்குப் பணியாற்றிய இயேசு சபைக் குரு அருட்தந்தை ஜோவான்னி பத்திஸ்தா புத்தாரியிடம். புத்தாரி ஒன்பது மாதங்கள் மறைக்கல்வி அளித்தார்; அவசரப்படவே இல்லை. அத்தகைய பதவியில் இருப்பவரின் மனமாற்றம் என்ன விலை கேட்கும் என்பதை அவர் தெளிவாகக் கண்டார் — சொந்த மக்களின் சினம், அரசவையின் பகைமை, பதவியின் நிச்சயமான இழப்பு — எனவே அவ்வருளைத் தள்ளிப்போடுவதே சரி என்று கருதினார். உண்மைக் கடவுளைக் கண்டுகொண்ட பின் அவரை விட்டுவிட மாட்டேன், இவ்வுலகின் எல்லா நன்மைகளையும் உயிரையும் இழக்க நேர்ந்தாலும் என்பதே அம்மனிதரின் பதில். 1745 மே 14-ஆம் நாள் அருட்தந்தை புத்தாரி அவருக்குத் திருமுழுக்கு அளித்து, இலாசர் என்னும் பெயரைத் தந்தார் — தமிழில் அது தேவசகாயம்: கடவுளே என் துணை.\n\nஇவ்வூர் கொண்டுள்ள மிக உறுதியான சான்று இதுவே; இதில் எதுவும் நம்மிடமிருந்து வந்ததல்ல. “வடக்கன்குளம் ஊரின் கத்தோலிக்க ஆலயம்” என்று வத்திக்கான் நியூஸ் பெயர் குறிக்கிறது. நாமப்படுத்தல் வழக்கின் துணை-முன்மொழிபவர் எழுதிய குறிப்பில், லொசர்வத்தோரே ரொமானோ குருவின் பெயரையும், ஒன்பது மாதங்களையும், நாளையும் குறிக்கிறது.`,
          note: `மே 14 என்பதே மிக உறுதியான நாள்; புனிதர் பட்டக் காலத்திய சில குறைவான பதிவுகள் மே 17 எனத் தருகின்றன. மேலும், புனிதர் பட்ட வழிபாட்டு நிகழ்வு பெயரை மட்டுமே வாசிக்கிறது என்பதைக் கவனிக்க: இடமும் நாளும் திருத்தூதுப் பேரவையின் வாழ்க்கைக் குறிப்புப் பதிவிலிருந்து வருகின்றன. அதனாலேயே இப்பக்கம் “இங்கு நிகழ்ந்த திருமுழுக்கு திருத்தூதுப் பேரவையால் அங்கீகரிக்கப்பட்டது” என்று சொல்கிறதே தவிர, “புனிதர் பட்ட நிகழ்வில் அறிவிக்கப்பட்டது” என்று ஒருபோதும் சொல்வதில்லை.`,
        },
        {
          key: `godfather`,
          heading: `மணியோசையைத் தொடர்ந்து வந்த அவரது ஞானத் தந்தை`,
          body: `அவரது ஞானத் தந்தை இப்பங்கின் சொந்த மறைக்கல்வி ஆசிரியர் ஞானப்பிரகாசம் பிள்ளையே. அவர் முன்பு பாளையங்கோட்டைக்கு அருகிலுள்ள வித்தாபுரத்தைச் சேர்ந்த சிதம்பரம் பிள்ளை என்ற கோயில் பூசாரி. மனைவியுடன் கன்னியாகுமரிக்குத் திருப்பயணம் சென்றபோது, இவ்வூருக்கு அருகில் எங்கோ ஒரு கோவில் மணியோசையைக் கேட்டார். அதைத் தொடர்ந்து திருக்குடும்பச் சிற்றாலயத்திற்கு வந்து, திருப்பலி நிகழ்வதைக் கண்டு, மறைக்கல்வி கேட்டு, திருமுழுக்குப் பெற்றார் — ஞானப்பிரகாசம் என்ற பெயரை ஏற்றார்; மனைவி ஆனந்தை என்ற பெயரை ஏற்றார். அவருக்கு இங்கே ஒரு வீடு கட்டப்பட்டு, மறைக்கல்வி ஆசிரியராக நியமிக்கப்பட்டார்; மறைப்பணியாளருடன் திருவிதாங்கூர், பாண்டிய நாடு எங்கும் பயணித்தார். ஆண்டுகளுக்குப் பின் அந்த இரத்தசாட்சிக்கு ஞானத் தந்தையாக நின்றார். ஒரு நவீன ஆய்வாளர் இந்த ஆலயத்தின் நிறுவுதலை, தெ பிரிட்டோவுக்குப் பதிலாக, இதே மனிதர்மேல் ஏற்றுகிறார் என்பதும் குறிப்பிடத்தக்கது.`,
          note: `அவரது மனமாற்றத்தை அருட்தந்தை பிரொஸ்பர் ஜூலியானியின் காலமான 1728–33 என்று பங்கின் சொந்த வரலாறு குறிக்கிறது; அதே பதிவின் தலைப்பில் வேறோர் இடத்தில் 1743 எனவும் தருகிறது. இது மூலங்களுக்கு இடையிலான முரண் அல்ல — பங்கின் சொந்தப் பதிவிற்குள்ளேயே உள்ள முரண்; அப்படியே விடப்படுகிறது.`,
        },
        {
          key: `timber`,
          heading: `மரத்திற்கான அந்தத் தூது`,
          body: `அருட்தந்தை புத்தாரி ஒரு கோவில் கட்டிக்கொண்டிருந்தார்; அதற்கு மரம் போதவில்லை. அரசாங்கத்திடமிருந்து அம்மரத்தைப் பெற்றுவரும்படி தேவசகாயத்திடம் கேட்டுக்கொண்டார். அத்தூது அவரை அரசவையில் பெருஞ்செல்வாக்குப் பெற்றிருந்த, நெடுநாள் நண்பராயிருந்த ஒருவரின் முன் கொண்டுசென்றது — அவரோ அச்சந்திப்பையே பயன்படுத்தி, புதிய விசுவாசத்தைத் துறக்கும்படி வற்புறுத்தினார். ஒரு விவாதம் எழுந்தது; அந்த நண்பர் தோற்றார். அவமானமடைந்த அவர் சபதம் செய்தார்: “உன் சமயத்தை நீ துறக்கும்படி நான் செய்வேன்; இல்லையேல் அதற்கு உன் தலையால் விலை கொடுப்பாய்.” தேவசகாயமும் அதே வகையில் பதிலிறுத்தார்; அந்த அவமானம் ஒருபோதும் மன்னிக்கப்படவில்லை. இறுதியில் அப்புயல் முழுவதும் வெடித்தது — கட்டுமானத்திற்கான மரம் கேட்ட ஒரு வேண்டுகோளின்மேல்.`,
          note: `முரண்; இரு வாசிப்புகளும் காக்கப்படுகின்றன. அந்த மரம் இங்குள்ள ஆலயத்திற்கே என்றுதான் பங்கு எப்போதும் சொல்லி வந்துள்ளது — அதனாலேயே தன் சொந்தச் சுவர்களும் அவரது இரத்தசாட்சியமும் ஒரே தருணத்தில் தொடங்குகின்றன என்று அது கருதுகிறது. மறைப்பணியின் சொந்த வரலாற்றாசிரியரான பெஸ்ஸோ, அருட்தந்தை புத்தாரி நேமம் ஊர் சமூகத்திற்காக ஒரு கோவில் கட்டிக்கொண்டிருந்தார் என்றும், அம்மரத்திற்காகவே பிரதம மந்திரி ராம ஐயன் தளவாயிடம் அவரை அனுப்பினார் என்றும் எழுதுகிறார். இப்பக்கம் இவ்விரண்டுக்கும் இடையே தீர்ப்பு வழங்கவில்லை.`,
        },
        {
          key: `seized`,
          heading: `கைது, 1749 பிப்ரவரி 23`,
          body: `சூழ்ச்சியின் வழியாகவே மன்னரிடமிருந்து கைது ஆணை பெறப்பட்டது. தேவசகாயம் எவ்வித எதிர்ப்புமின்றிச் சரணடைந்தார்; தெ லானுவாவிடம் விடைபெற மட்டுமே அனுமதி கேட்டார். “துணிவோடிரு” என்றார் அத்தளபதி; “இயேசு கிறிஸ்துவின் தகுதியான வீரன் நீ என்பதை நிரூபிக்கும் தருணம் வந்துவிட்டது.” ஒரு மறைப்பணியாளர் இரகசியமாக அழைத்துவரப்பட்டு அவரது பாவசங்கீர்த்தனத்தைக் கேட்டார். மன்னர் முன் நிறுத்தப்பட்டபோது கிறிஸ்துவை அறிக்கையிட்டார்; மரண தண்டனை விதிக்கப்பட்டது — பின்னர் அத்தண்டனை விலக்கிக்கொள்ளப்பட்டது, அந்த மரணதண்டனை அரசுக்கே இடர் கொண்டுவரும் என்று சகுனம் சொல்லப்பட்டதால். தமக்கே கிடைத்த அந்த விடுதலைக்கு அவர் காட்டிய எதிர்வினையை வரலாற்றுப் பதிவு குறிக்கிறது: “இரத்தசாட்சி மகுடத்திற்குத் தம்மைக் கடவுள் தகுதியற்றவராகக் கருதிவிட்டாரோ” என அஞ்சி, அவர் பெருந்துயரம் கொண்டார்.`,
          note: ``,
        },
        {
          key: `buffalo`,
          heading: `எருமையின்மேல் ஊர்வலம்`,
          body: `இனிக் கொல்ல விரும்பாமல், ஆனால் அவரை உடைக்கவே தீர்மானித்த மன்னர், கைகளைப் பின்புறம் கட்டி, எருமையின்மேல் ஏற்றி, எருக்கம்பூ மாலை சூட்டி, ஊர் ஊராகக் கொண்டுசெல்லச் செய்தார்; செல்லும் வழியெங்கும் கூட்டம் அவரை இகழும்படி தூண்டப்பட்டது. தம் மீட்பர் அடைந்த அவமானங்களில் தமக்குக் கிடைத்த பங்காகவே அதை அவர் ஏற்றுக்கொண்டார் என்கிறது வரலாற்றுப் பதிவு. பின் அடிகள் வந்தன — உடல் ஒரே காயமாகும் வரை முள் பதித்த கழிகளால் அடித்தனர்; காயங்களில் அரைத்த மிளகைத் தேய்த்தனர். இவை எல்லாவற்றிற்கும் அவர் சொன்னது இதுமட்டுமே: “ஓ இயேசுவே, உம்மீதுள்ள அன்பினாலேயே நான் துன்பப்படுகிறேன்” — சில வேளைகளில், “என் பாவங்களின் பரிகாரத்திற்காகவும்” எனச் சேர்த்தார். அப்பொடியை அவரது முகத்தில் தேய்த்தபோது, தம் கண்களையும் விட்டுவிடாதீர்கள் என்றார் — “என் இளமையில் அவை பாவத்தின் கருவிகளாக இருந்தன.”`,
          note: `எரியும் மணலில் தாகத்தால் துடித்தபோது காவலர் கடல்நீரைக் கொடுக்க, அதை அவர் அருந்தி, அது இனிமையாகவும் கசப்பின்றியும் இருந்தது என்றும் வரலாற்று நூல்கள் சொல்கின்றன. அது ஒரு பக்தி நூலில் புதுமையாகச் சொல்லப்படுவது; விசாரணைக்கு உட்படுத்தப்பட்ட புதுமை அல்ல. அப்படியே — அது எதுவோ அதுவாகவே — இப்பக்கம் அதைக் கடத்துகிறது.`,
        },
        {
          key: `chained`,
          heading: `மரத்தில் சங்கிலியிட்டு, ஏழு மாதங்கள்`,
          body: `திருவனந்தபுரச் சிறையில் அடைக்கப்பட்டபோது அவ்வளவு கூட்டத்தை அவர் ஈர்த்தார் — கிறிஸ்தவர்களும், வெறும் ஆர்வத்தில் வந்தவர்களும்; யாருக்கும் கற்பிக்கத் தவறியதில்லை — எனவே மன்னர் அவரை இரவோடு இரவாக மூன்று காத தொலைவிலுள்ள ஒரு வெறும் காட்டிற்குக் கொண்டுசென்று ஒரு மரத்தில் சங்கிலியால் கட்டச் செய்தார்; ஓர் அடி எடுத்து வைக்கவோ நிமிர்ந்து நிற்கவோ இயலாதபடி. வெயிலிலும் புயலிலும் ஏழு மாதங்கள் அவ்வாறே இருந்தார்; இறுதியில் காவலர்களே இரக்கம் கொண்டு சங்கிலியை நீட்டி, அவர்மேல் ஓர் ஓலைக் கூரையை அமைத்தனர். அந்தச் சிறு சுதந்திரத்தைப் பயன்படுத்தி தெ லானுவாவுக்குக் கடிதம் எழுதினார் — தாம் இருக்கும் இடத்தைச் சொல்லி, “வலியோரின் அப்பத்தை” கொண்டுவரும் ஒரு குருவை அனுப்பும்படி கேட்டார். தெ லானுவா அவர் கேட்டபடியே செய்தார்; அந்தப் பாலைவனத்திற்கு நற்கருணை வந்து சேர்ந்தது. அவ்விடம் பற்றிய செய்தி பரவ, அக்காடே ஒரு திருப்பயணத் தலமாயிற்று.`,
          note: ``,
        },
        {
          key: `night`,
          heading: `1752 ஜனவரி 14-ஆம் இரவு`,
          body: `கூட்டத்தை அடக்க இயலாத மன்னர் இறுதியில் தண்டனையை அறிவித்தார். நள்ளிரவில் வீரர்கள் வந்து, வேறொரு சிறைக்கு அவரை மாற்றுவதாகச் சொன்னார்கள். “ஏன் மறைக்கிறீர்கள்?” என்று அவர் பதிலளித்தார். “என்னை எங்கே கொண்டுசெல்கிறீர்கள் என்று எனக்குத் தெரியும்; தாமதமின்றிப் போவோம்.” அவ்விடத்தை அடைந்ததும் சில நிமிடங்கள் செபிக்க அனுமதி கேட்டார்; பின் எழுந்து, “நான் என் கடமையைச் செய்துவிட்டேன்; இனி உங்கள் கடமையைச் செய்யுங்கள்” என்றார். அவரைச் சுட்டார்கள் — ஐந்து குண்டுகள் என்கிறது துணை-முன்மொழிபவரின் பதிவு — இயேசு, மரியா என்ற திருப்பெயர்களை உச்சரித்தபடியே அவர் விழுந்தார்; இரண்டாவது சுடுதல் அதை நிறைவு செய்தது. அது 1752 ஜனவரி பதினான்காம் நாளுக்கும் பதினைந்தாம் நாளுக்கும் இடையில், நள்ளிரவுக்குச் சற்று முன்பு; ஆரல்வாய்மொழிக் கணவாய் அருகிலிருந்த திருவிதாங்கூர்க் காவல் எல்லையில்.`,
          note: `இரண்டு விஷயங்களை இப்பக்கம் மழுப்பாது. அவ்விடம் இன்று எங்கும் காட்டாடிமலை என்றே அழைக்கப்படுகிறது; ஆனால் அக்காலத்திய எந்த மூலமும் அப்பெயரைச் சொல்லவில்லை — சாட்சிகள் ஆரல்வாய்மொழிக் கணவாயின் காவல் எல்லையை மட்டுமே குறிக்கின்றனர், அதற்கு மேல் நெருங்குவதில்லை. மேலும், அகுஸ்த் ஜானின் 1894 நூல் ஆண்டை 1742 என அச்சிட்டுள்ளது; 1745-இல் திருமுழுக்கு என்பதோடு அது பொருந்தவே பொருந்தாது. திருத்தூதுப் பேரவையின் சொந்தச் சொற்களான “இலாசர், தேவசகாயம் என அழைக்கப்பட்டவர் (1712–1752)” இதைத் தீர்த்து வைக்கின்றன.`,
        },
        {
          key: `kottar`,
          heading: `இங்கே வர இயலாத அந்த உடல்`,
          body: `அவரது உடல் எடுக்கப்பட்டு, நாகர்கோவிலுக்கு அருகிலுள்ள கோட்டாற்றுக்குக் கொண்டுசெல்லப்பட்டு, புனித சவேரியார் ஆலயத்தில் அடக்கம் செய்யப்பட்டது. கொச்சிப் பேராலயத்தில் அவருக்காக “தேயும்” பாடப்பட்டது; ஆயரே புகழுரையை நிகழ்த்தினார். இப்பங்கு அவரை விரும்பியது. 1930-இல் அச்சான ஒரு மலையாள வாழ்க்கை வரலாறு, ஏன் அது நிறைவேறவில்லை என்பதைப் பதிவு செய்கிறது: ஓர் உடலை வேறொரு அரசுக்குள் கொண்டுசெல்ல அனுமதிக்கும் அரச ஆணை இல்லாததால், தேவசகாயம் பிள்ளையின் திருவுடலை வடக்கன்குளத்திற்குக் கொண்டுவரும் எண்ணம் “நிறைவேற இயலவில்லை.”`,
          note: `1930-இன் அந்த மலையாள நூல் திருத்தலத்தின் நூற்பட்டியலில் இல்லை — மலையாள எழுத்தில் தொகுப்பைத் தேடியபோதுதான் அது வெளிப்பட்டது — எனவே கீழே அதற்கு எந்தச் சான்றுச் சுட்டியும் இல்லை. அது எதுவோ அதுவாகவே இங்கே பதிவாகிறது: ஓர் எண்ணத்திற்கான ஒரு பிற்கால சாட்சி.`,
        },
        {
          key: `gnanapoo`,
          heading: `தங்கிவிட்ட ஞானப்பூ அம்மாள்`,
          body: `அவரது மனைவி பார்கவி அம்மாள்; அவருக்குப் பின் இங்கேயே தெரேசாள் என்ற பெயரில் திருமுழுக்குப் பெற்றார் — தமிழில் ஞானப்பூ, ஞானத்தின் மலர். தமது மரணத்திற்கு எட்டு நாட்களுக்கு முன், விசுவாசத்தில் உறுதியாய் இருக்கவும், வடக்கன்குளத்தில் நிரந்தரமாகக் குடியேறவும் அவர் மனைவிக்குச் சொல்லி அனுப்பினார். அவர் அப்படியே செய்தார். 1766-இல் இறந்து, பங்கின் சொந்த மண்ணிலேயே உறங்குகிறார்; அவரது கல்லறை இன்றும் நிற்கிறது. இரத்தசாட்சி தேவசகாயம் பிள்ளையின் மனைவி என்று தமிழ்ப் பலகை அவரைப் பெயர் குறித்து, அவரது மறைவின் ஆண்டையும் தருகிறது — இத்திட்டத்தின் எந்த நூலும் தராத ஒரு தேதி. அதன் பின்னால் உள்ள வளைவில் INRI பொறிக்கப்பட்ட பழைய கருஞ்சிலுவை ஒன்று நிற்கிறது; அதைச் சுற்றி பின்னாளில் கட்டப்பட்ட ஓட்டுச் சுவரைக் காட்டிலும் அது வெளிப்படையாகவே பழையது.`,
          note: `அக்கல் அவரை ஞானப்பு அம்மாள் என்கிறது; “அம்மாள்” என்பது தமிழ் மரியாதைச் சொல். தெரேசாள் என்பது எழுத்து மூலங்களில் உள்ள அவரது ஞானஸ்நானப் பெயர். இரண்டுமே சரி; ஒன்றை மற்றொன்றாக “திருத்த” வேண்டியதில்லை.`,
        },
        {
          key: `altars`,
          heading: `அருளாளர், பேறுபெற்றவர், புனிதர் — மேலும் பாதுகாவலர்`,
          body: `1993-இல் மறைமாவட்ட விசாரணையாக வழக்கு தொடங்கப்பட்டு 2008-இல் நிறைவடைந்தது; 2010-இல் ரோம் அதைச் செல்லுபடியானதாக ஏற்றது. 2012 ஜூன் 28-இல் அருளாளர் எனவும், 2012 டிசம்பர் 2-இல் நாகர்கோவிலில், ஏறத்தாழ ஒரு லட்சம் பேர் முன்னிலையில் பேறுபெற்றவர் எனவும் அறிவிக்கப்பட்டார். 2013-இல் நிகழ்ந்த ஒரு குணமளிப்பு 2020 பிப்ரவரி 21-இல் புதுமையாக ஏற்கப்பட்டது. 2022 மே 15-ஆம் நாள் திருத்தந்தை பிரான்சிஸ் புனித பேதுரு சதுக்கத்தில் அவரைப் புனிதராக அறிவித்தார் — அன்று அறிவிக்கப்பட்ட பத்து பேரில் ஒருவர்; “இலாசர், தேவசகாயம் என அழைக்கப்பட்டவர்” — பீடத்திற்கு உயர்த்தப்பட்ட, இந்தியாவில் பிறந்த முதல் பொதுநிலையினர். அதைக் காண இப்பங்கிலிருந்து நாற்பத்தொன்பது பேர், தங்கள் பங்குத் தந்தை தலைமையில், ரோமில் இருந்தனர். மேலும், 2025 அக்டோபர் 15-ஆம் நாள் இந்தியப் பொதுநிலையினரின் பாதுகாவலராக அவர் அறிவிக்கப்பட்டார்.`,
          note: ``,
        },
      ],
      evidence: {
        label: `சான்றுகள்`,
        title: `இதில் எவ்வளவு நிரூபிக்கப்பட்டது`,
        intro: `இத்திருத்தலம் தன் மூலங்களைச் சுட்டிக்காட்டுகிறது; ஒரு மரபை ஆவணமாக உடுத்திக் காட்டாது. இப்பக்கத்தில் நிலை நிறுவனரின் பக்கத்திற்கு நேர்மாறானது: இங்குள்ள கிட்டத்தட்ட அனைத்தும் வெளிச் சான்றுகளால் ஆவணப்படுத்தப்பட்டவை; ஆவணப்படுத்தப்படாத சில, அவ்வாறே பெயர் குறித்துச் சொல்லப்படுகின்றன.`,
        rows: [
          {
            tier: `documented`,
            heading: `இவ்வூர் கொண்டுள்ள மிக உறுதியான சான்று`,
            body: `1745-இல் இந்த ஆலயத்தில், அருட்தந்தை புத்தாரியால் அவர் திருமுழுக்குப் பெற்றார் என்பது. ஆலயத்தை வத்திக்கான் நியூஸ் பெயர் குறிக்கிறது; வழக்கின் துணை-முன்மொழிபவர் எழுதிய குறிப்பில் லொசர்வத்தோரே ரொமானோ குருவையும், ஒன்பது மாதங்களையும், நாளையும் குறிக்கிறது; 2022 மே 15-இன் புனிதர் பட்டம் “இலாசர், தேவசகாயம் என அழைக்கப்பட்டவர் (1712–1752)” என்பதை முத்திரையிடுகிறது. திருத்தூதுப் பேரவையுடன் சேர்ந்து நிற்பவர்கள் திருவிதாங்கூரின் இரு புராட்டஸ்டன்ட் வரலாற்றாசிரியர்கள் — 1901-இல் மெக்கன்சி, 1903-இல் அகுர். ஒரு கத்தோலிக்கப் பங்கைப் புகழ எவ்விதக் காரணமும் அற்ற இவர்கள், அம்மனிதரின் பதவியையும், வயதையும், இடத்தையும் — தீர்த்தத்தடியில் அவர் பேசிய சொற்களையும் — தனித்தனியாகவே தருகின்றனர்.`,
          },
          {
            tier: `tradition`,
            heading: `ஒரே சொல்லாடலிலிருந்து இறங்கி வருபவை`,
            body: `துன்புறுத்தல்களின் நுட்பமான விவரங்கள், இனிமையான கடல்நீர், சங்கிலியில் கழிந்த ஏழு மாதங்கள், இறுதி இரவில் பேசப்பட்ட சொற்கள். இவை ஒரு நூற்றாண்டுக்குப் பின் எழுதிய இயேசு சபை வரலாற்றாசிரியர்கள் வழியாகவே நம்மை வந்தடைகின்றன — 1847-இல் பெர்த்ரான், 1894-இல் அகுஸ்த் ஜான் — இருவருமே, தாம் திருமுழுக்கு அளித்த மனிதரைப் பற்றி அருட்தந்தை புத்தாரி எழுதிய கையெழுத்துப் பதிவிலிருந்தே இறங்கி வருகின்றனர். எத்தனை நூல்கள் இதைத் திரும்பச் சொன்னாலும் இவை ஒரே சாட்சிக் குடும்பமே; பல சான்றுகள் போலத் தோன்றும்படி இப்பக்கம் அவற்றை அடுக்கிவைக்கவில்லை.`,
          },
          {
            tier: `tradition`,
            heading: `மூலங்கள் ஒத்துப்போகாத இடங்கள்`,
            body: `மரம்: அது இங்குள்ள ஆலயத்திற்கே என்கிறது பங்கு; நேமத்திற்கு என்கிறார் பெஸ். மரணம் நிகழ்ந்த இடம்: இன்று அனைவரும் காட்டாடிமலை என்கின்றனர்; அக்காலத்திய எந்த மூலமும் அப்பெயரைச் சொல்லவில்லை. பின் திருஎச்சம். 1894-இல் எழுதிய அகுஸ்த் ஜான், “அவரது ஆடையின் ஒரு பகுதியையும், அவரைப் பிணைத்த சங்கிலிகளையும்” இந்த ஆலயம் கொண்டுள்ளது என்கிறார்; ஊரின் மறைக்கல்வி ஆசிரியர் குடும்பங்களின் 1915 வழிமரபு நூல் தலைப்பாகையும் வாளும் என்கிறது; வேறோர் ஆய்வாளர் தலைப்பாகையும் சால்வையும் என்கிறார்; மறைமாவட்டம் இன்று தலைப்பாகையைக் குறிக்கிறது. சங்கிலிகளாவது கணக்கில் உள்ளன — அவை தொலைந்துபோகவில்லை; வழக்கிற்காக ரோமுக்கு அளிக்கப்பட்டன.`,
          },
        ],
        closing: `ஐயத்திற்கு உரிய பகுதிகள் எதுவும் இப்பங்கின் உரிமைக்குத் தேவையில்லை. திருமுழுக்குப் பெற அவர் இந்த ஆலயத்திற்கு வந்தார்; இங்கிருந்தே மரணத்திற்குப் புறப்பட்டார்.`,
      },
      bond: {
        label: `எங்கள் பங்குடனான பிணைப்பு`,
        title: `வடக்கன்குளம் அவரைத் தன்னவராகக் கொள்வது ஏன்`,
        intro: `தேவசகாயம் இப்போது இந்தியத் திருச்சபை முழுவதற்கும் உரியவர். ஆனால் அவரைப் பற்றிய நான்கு விஷயங்கள் எங்களுடையவை; வேறு யாருடையவையும் ஆக இயலாது: அந்தத் தீர்த்தம், அந்தத் தூது, எங்கள் மண்ணில் ஒரு கல்லறை, எங்கள் ஆலயத்தில் திருஎச்சங்கள்.`,
        pillars: [
          {
            heading: `இந்தத் தீர்த்தத்தில் திருமுழுக்கு, 1745`,
            body: `இது பங்கின் நினைவு அல்ல — வழக்கு குறித்த திருத்தூதுப் பேரவையின் சொந்தப் பதிவே இந்த ஆலயத்தை இடமாகப் பெயர் குறித்து, நாளையும் தருகிறது. இவ்வூரின் முந்நூறு ஆண்டு வரலாற்றில் வேறெது நிச்சயமற்றதாக இருந்தாலும், இது அப்படியல்ல.`,
          },
          {
            heading: `ஒரு கோவிலுக்கான மரத்தில் தொடங்கியது`,
            body: `அவரை அழித்த அந்தத் தூது, கட்டுமானத்திற்கான மரம் கேட்ட ஒரு வேண்டுகோளே. அம்மரம் இந்த ஆலயத்திற்கே என்றுதான் பங்கு எப்போதும் கொண்டுள்ளது — அப்படியானால் அதன் சொந்தச் சுவர்களும் அவரது இரத்தசாட்சியமும் ஒரே தருணத்தில் தொடங்குகின்றன. மறைப்பணியின் சொந்த வரலாற்றாசிரியரோ அக்கோவிலை நேமத்தில் வைக்கிறார்; இப்பக்கம் அதையும் சொல்கிறது.`,
          },
          {
            heading: `அவரது மனைவி எங்கள் மண்ணில் அடக்கம்`,
            body: `தாம் இறப்பதற்கு எட்டு நாட்களுக்கு முன், விசுவாசத்தைக் காக்கவும் இங்கேயே குடியேறவும் ஞானப்பூ அம்மாளிடம் சொன்னார். அவர் அப்படியே செய்தார்; 1766-இல் இறந்தார்; பங்கின் கல்லறைத் தோட்டத்தில் பழைய கல் சிலுவையுடன் அவரது கல்லறை நிற்கிறது — இக்கதையில் இன்றும் நடந்து சென்று தொடக்கூடிய ஒரே பொருள் அதுவே.`,
          },
          {
            heading: `அவரது திருஎச்சங்கள் இங்கே காக்கப்படுகின்றன`,
            body: `அவர் அணிந்திருந்த ஆடையின் ஒரு பகுதியையும், அவரைப் பிணைத்த சங்கிலிகளையும் வடக்கன்குளம் ஆலயம் கொண்டுள்ளது என்று 1894-ஆம் ஆண்டிலேயே ஓர் இயேசு சபை வரலாற்றாசிரியர் பதிவு செய்துள்ளார். அவர் இறந்த ஆண்டு முதல் அவை இந்த மண்ணில் இருக்கின்றன.`,
          },
        ],
      },
      today: {
        label: `இப்பங்கில்`,
        title: `இன்றைய தேவசகாயம்`,
        intro: `2022-இல் ரோமில் புனிதராக அறிவிக்கப்பட்டவர், இங்கே சாதாரணமான, தொடர்ச்சியான மூன்று வழிகளில் காக்கப்படுகிறார்.`,
        items: [
          {
            heading: `திருஎச்சங்கள்`,
            body: `அவரது ஆடையின் ஒரு பகுதியும், சிறைவாசச் சங்கிலிகளும் அவர் மரித்த நாள் முதல் இந்த ஆலயத்தில் காக்கப்படுகின்றன — 1894-ஆம் ஆண்டிலேயே இது அச்சில் சான்றளிக்கப்பட்டுள்ளது. அவற்றுள் தலைப்பாகையை மறைமாவட்டம் இன்று குறிக்கிறது; சங்கிலிகள் வழக்கிற்காக ரோமுக்குக் கொண்டுசெல்லப்பட்டன — சிலர் சொல்வது போல் வழியில் தொலைந்துபோகவில்லை.`,
          },
          {
            heading: `அவரது குகையும் உருவமும்`,
            body: `பங்கில் மங்கம்மாள் சாலையில் புனித தேவசகாயம் குகை உள்ளது. காட்சி மாதா ஆலயத்தின் சிலுவைக் கோவிலில், 2013 முதல் 2018 வரை பங்குத் தந்தையாக இருந்த அருட்தந்தை தத்தேயு ராஜன் அவர்களின் காலத்தில், அருளானந்தரின் உருவத்திற்கு அருகிலேயே அவரது உருவமும் நிறுவப்பட்டது — இங்கே திருமுழுக்குப் பெற்றவரும், இப்பங்கு தன் நிறுவனராகக் கொள்பவரும், அருகருகே.`,
          },
          {
            heading: `ஆண்டின் இரு நாட்கள்`,
            body: `ஜனவரி 14 இரத்தசாட்சியின் திருவிழா; அவர் போற்றப்படும் எல்லா இடங்களிலும் கொண்டாடப்படுகிறது. மே 14 அவர் திருமுழுக்குப் பெற்ற நாள் — அந்நாள் வேறெந்த ஆலயத்திற்கும் உரியதாக இயலாத வகையில் இந்த ஆலயத்திற்கே உரியது.`,
          },
        ],
      },
      related: {
        heading: `தொடர்ந்து படிக்க`,
        items: [
          {
            title: `புனித ஜான் தெ பிரிட்டோ`,
            body: `அருளானந்தர் — 1685-இல் அவர் வந்ததிலிருந்தே இப்பங்கு தன் நிறுவுதலை எண்ணுகிறது; ஓரியூரின் இரத்தசாட்சி.`,
            href: `/saints/john-de-britto`,
            cta: `அவரது பக்கம்`,
          },
          {
            title: `பங்கின் முழு வரலாறு`,
            body: `சாந்தாயியின் குருசடியிலிருந்து திருத்தலம் வரை — எட்டு அத்தியாயங்களில் முந்நூறு ஆண்டுகள்; ஒவ்வொரு தருணத்திற்கும் மூலம், ஒவ்வொரு ஐயத்திற்கும் இடம்.`,
            href: `/history`,
            cta: `வரலாறு`,
          },
          {
            title: `திருவிழாக்களும் திருப்பலி நேரங்களும்`,
            body: `ஜனவரி 14 இரத்தசாட்சியின் திருவிழா, மே மாதத்தில் அவரது திருமுழுக்கு நாள் உட்பட, பங்கின் ஆண்டு முழுவதும்.`,
            href: `/mass-timings`,
            cta: `காலண்டர்`,
          },
        ],
      },
      sources: {
        heading: `ஆதாரங்கள்`,
        body: `வழக்கு குறித்த திருத்தூதுப் பேரவையின் சொந்தப் பதிவு — வத்திக்கான் நியூஸ், வழக்கின் துணை-முன்மொழிபவர் எழுதிய 2012 டிசம்பர் 5-ஆம் நாள் லொசர்வத்தோரே ரொமானோ, 2022 மே 15-இன் புனிதர் பட்டம்; திருவிதாங்கூரின் இரு புராட்டஸ்டன்ட் வரலாற்றாசிரியர்கள் — சாமுவேல் மெக்கன்சி (1901), சி. எம். அகுர் (1903); பங்கின் மதுரை மறைப்பணி நூலகத்தில் பாதுகாக்கப்படும் ஜோசப் பெர்த்ரான் (1847), அகுஸ்த் ஜான் (1894) ஆகியோரின் இயேசு சபை மறைப்பணி வரலாறுகள்; பங்கின் சொந்த ஆங்கில நகலிலுள்ள பெஸ்ஸின் மறைப்பணி வரலாறு; மறைக்கல்வி ஆசிரியர்கள் குறித்த மார்கரீத்தா த்ரெந்தோவின் ஆய்வும், இம்மரபு எவ்வாறு இறங்கி வந்தது என்பது குறித்த ஜெ. ரொசாரியோ நார்ச்சிசனின் ஆய்வும்; ஞானப்பூ அம்மாளின் கல்லறையே; பங்கின் சொந்தப் பதிவுகள் — இவற்றிலிருந்து இப்பக்கம் கட்டப்பட்டுள்ளது. மேலுள்ள ஒவ்வொரு பகுதியும் தான் நிற்கும் சான்றுகளைத் தானே பெயர் சொல்லிக் காட்டுகிறது. அவை அனைத்தும் ஆதாரங்கள் பக்கத்தில் முழுமையாகப் பட்டியலிடப்பட்டுள்ளன.`,
        chipsLabel: `இப்பக்கத்தின் அனைத்து மூலங்களும்`,
      },
    },
    saintDeBritto: {
      back: `எங்கள் பங்கின் புனிதர்கள்`,
      label: `எங்கள் பங்கின் நிறுவனர்`,
      name: `புனித ஜான் தெ பிரிட்டோ`,
      epithet: `அருளானந்தர் — “அருளின் ஆனந்தம்”`,
      intro: `மதுரை மறைப்பணி முழுவதும் தம் பொறுப்பில் இருந்த ஆண்டுகளில் குதிரையில் இவ்வூருக்கு வந்த போர்த்துகீசிய இயேசு சபை மறைப்பணியாளர்; அன்று முதல் வடக்கன்குளம் தன் முதல் சிற்றாலயத்தை நிறுவியவராக அவரையே நினைவுகூர்ந்து வருகிறது. 1693 பிப்ரவரி 4-ஆம் நாள் ஓரியூரில் விசுவாசத்திற்காகத் தலை துண்டிக்கப்பட்ட இவர், தமிழ்த் திருச்சபைக்கு அருளானந்தர்.`,
      feast: `திருவிழா — பிப்ரவரி 4`,
      canonised: `1947-இல் திருத்தந்தை பன்னிரண்டாம் பயஸ் அவர்களால் புனிதராக அறிவிக்கப்பட்டார்`,
      facts: [
        {
          label: `தமிழில்`,
          value: `அருளானந்தர் — “அருளின் ஆனந்தம்”`,
        },
        {
          label: `பிறப்பு`,
          value: `1647 மார்ச் 1, லிஸ்பன் — போர்த்துகீசிய அரசவையின் பிரபுக் குடும்பத்தில்`,
        },
        {
          label: `இயேசு சபை`,
          value: `1662-இல், பதினைந்தாம் வயதில் இணைந்தார்; கொயம்ப்ராவில் பயின்றார்`,
        },
        {
          label: `இந்தியா நோக்கிப் பயணம்`,
          value: `1673 மார்ச்; அதே ஆண்டு செப்டம்பரில் கோவா, 1674 முதல் மதுரை மறைப்பணி`,
        },
        {
          label: `அவர் பொறுப்பில் மறைப்பணி`,
          value: `1683-இல் மதுரை மறைப்பணியின் பொறுப்பை ஏற்றார்; 1685–86-இல் பணித் தலைவர்`,
        },
        {
          label: `வடக்கன்குளத்தில்`,
          value: `முதல் சிற்றாலயம், 1685 — பங்கின் சொந்த மரபின்படி`,
        },
        {
          label: `கைது`,
          value: `1693 ஜனவரி 8; இருபத்தெட்டாம் நாள் விசாரணையும் தீர்ப்பும்; முப்பத்தோராம் நாள் ஓரியூருக்கு`,
        },
        {
          label: `இரத்தசாட்சி`,
          value: `1693 பிப்ரவரி 4, ஓரியூரில், நாற்பத்தைந்தாம் வயதில் — மறைப்பணியில் பத்தொன்பது ஆண்டுகள்`,
        },
        {
          label: `பீடங்களில்`,
          value: `1853 ஆகஸ்ட் 21-இல் ஒன்பதாம் பயஸ் அவர்களால் அருளாளர்; 1947 ஜூன் 22-இல் பன்னிரண்டாம் பயஸ் அவர்களால் புனிதர்`,
        },
      ],
      quote: `ஜனவரி இருபத்தெட்டாம் நாள் என்மேல் விசாரணை நடத்தி, சுட்டுக் கொல்லத் தீர்ப்பிடப்பட்டேன்… மரணத்தை எதிர்பார்த்திருக்கிறேன்; பொறுமையின்றி எதிர்பார்த்திருக்கிறேன். உண்மைக் கடவுளின் சட்டத்தைப் போதித்தேன், சிலைகளிடமிருந்து அவற்றை வணங்குவோரைப் பறித்தேன் — இதுவே என்மேல் சுமத்தப்பட்ட குற்றம் முழுவதும். இத்தகைய குற்றத்திற்காகத் துன்பப்பட்டு மரிப்பது எத்துணை மகிமை!`,
      quoteAttribution: `ஓரியூர் சிறையிலிருந்து, 1693 பிப்ரவரி 3 — மரணத்திற்கு முந்தைய இரவில், ஒரு வைக்கோல் துரும்பையே எழுதுகோலாகவும், அரைத்த கரியையே மையாகவும் கொண்டு, மறைப்பணித் தலைவருக்கு எழுதியது`,
      lifeLabel: `அவரது வாழ்க்கை`,
      lifeTitle: `லிஸ்பன் அரண்மனையிலிருந்து ஓரியூர்க் கழுமரம் வரை`,
      lifeIntro: `நாற்பத்தைந்து ஆண்டுகள்; அவற்றுள் பத்தொன்பது ஆண்டுகள் தமிழ் மண்ணில். பின்வருவது நூல்களிலிருந்து சொல்லப்படுகிறது; ஒவ்வொரு பகுதியும் தான் எதன்மேல் நிற்கிறது என்பதைத் தானே சொல்கிறது.`,
      noteLabel: `குறிப்பு`,
      alts: {
        forestRoad: `ஓவியம் — வெளிர் நிறப் போர்வை அணிந்த இயேசு சபை மறைப்பணியாளர் ஒருவர் செம்மண் காட்டுப் பாதையில் தமது குதிரையை நிறுத்த, பருத்திக் கூடையுடன் நிற்கும் பெண் ஒருவர் அவரிடம் பேசுகிறார்; பின்னால் ஆலமரத்தடியில் ஒரு கல் சிலுவை`,
        chapel: `ஓவியம் — ஓலையால் வேயப்பட்ட, மரச் சிலுவை பொருத்தப்பட்ட சிறிய வெள்ளையடித்த சிற்றாலயத்தின் முன் ஓர் இயேசு சபைக் குரு ஆசீர்வதிக்கக் கை உயர்த்த, ஊர்க் குடும்பம் ஒன்று சூழ்ந்து நிற்கிறது`,
        harvest: `ஓவியம் — ஓலைச் சிற்றாலயத்தின் முன் மண்டியிட்டிருக்கும் ஒருவரின் தலைமீது இயேசு சபை மறைப்பணியாளர் நீர் வார்க்கிறார்; அருகில் மறைக்கல்வி ஆசிரியர் ஒருவர் நூலைப் பிடித்திருக்க, ஊர் மக்கள் நீண்ட வரிசையில் காத்திருக்கின்றனர்`,
        oriyur: `ஓவியம் — சிறை வைக்கோலின்மேல் அமர்ந்து, சிறிய அகல் விளக்கின் ஒளியில், வைக்கோல் துரும்பால் ஏட்டில் எழுதிக்கொண்டிருக்கும் புனித ஜான் தெ பிரிட்டோ; பின்னால் கம்பிச் சாளரத்தில் காவலனின் ஈட்டி`,
      },
      sections: [
        {
          key: `lisbon`,
          heading: `லிஸ்பன் நகரப் பிரபு`,
          body: `ஜோவான் தெ பிரிட்டோ 1647 மார்ச் 1-ஆம் நாள் லிஸ்பனில், போர்த்துகீசிய அரசவையின் பிரபுக் குடும்பம் ஒன்றில் பிறந்தார்; அவரது தந்தை பிரேசிலின் ஆளுநராக இருந்தவர், அவரோ அரண்மனையில் — பின்னாளில் அரசரான இரண்டாம் பேத்ரோவின் தோழராக — வளர்க்கப்பட்டார். பதினைந்தாம் வயதில் அவ்வுலகம் தந்த எதிர்காலம் அனைத்தையும் துறந்து இயேசு சபையில் இணைந்தார். கொயம்ப்ரா பல்கலைக்கழகத்தில் பயின்று, அச்சபை அப்போது அறிந்திருந்த மறைப்பணிக் களங்களுள் மிகக் கடினமானதும் மிகத் தொலைவிலுள்ளதுமான இந்தியப் பணிக்குத் தம்மை அனுப்பும்படி கேட்டுக்கொண்டார். 1673 மார்ச்சில் கப்பலேறி, அதே ஆண்டு செப்டம்பரில் கோவா வந்தடைந்தார்; 1674-இல் மதுரை மறைப்பணியில் இணைந்தார்.`,
          note: ``,
        },
        {
          key: `sannyasi`,
          heading: `பண்டாரசாமி`,
          body: `இவருக்கு எழுபது ஆண்டுகளுக்கு முன்பே, ஐரோப்பியர் என்ற முறையில் மதுரையின் ஒவ்வொரு கதவும் தமக்கு அடைபட்டிருப்பதை ரொபேர்ட்டோ தெ நொபிலி கண்டார்; ஐரோப்பியராகத் தோன்றுவதை நிறுத்தியதன் மூலமே அக்கதவுகளைத் திறந்தார். தெ பிரிட்டோவும் அதே வழியையே பிடித்தார். ஐரோப்பிய உடையையும் ஐரோப்பிய உணவையும் துறந்து, புலால் உண்ணாமல், ஊர் ஊராய்க் காலால் நடந்து செல்லும் பண்டாரசாமியாக வாழ்ந்தார்; போர்த்துகீசியப் பெயரால் அல்ல, தமிழ்ப் பெயராலேயே அறியப்பட்டார். அயல்நாட்டு உடையணிந்த ஓர் அயலவர் ஒருபோதும் நுழைந்திருக்க இயலாத நாட்டுக்குள் இவ்வாழ்க்கை நற்செய்தியைக் கொண்டு சேர்த்தது.`,
          note: ``,
        },
        {
          key: `charge`,
          heading: `மறைப்பணி முழுவதும் அவர் கையில், 1683`,
          body: `“1683-இல் அருட்தந்தை ஜான் தெ பிரிட்டோ மதுரை மறைப்பணியின் பொறுப்பை ஏற்றார்.” இது பங்கு எழுதிக்கொண்ட வாக்கியம் அல்ல; இவ்வூரில் எவ்விதப் பற்றுமற்ற ஓர் ஆங்கிலேய அரசு அதிகாரி எழுதிய மாவட்டக் குறிப்பேட்டின் வாக்கியம். இரண்டு ஆண்டுகளுக்குப் பின் அவர் மறைப்பணியின் தலைவராகவே நியமிக்கப்பட்டார். அந்த ஆண்டுகளை மறவர் நாட்டுக் காடுகளில் கழித்தார் — “முனி நாட்டிற்கும் மறவ நாட்டிற்கும் இடையிலான எல்லையில், இரு நாட்டு மக்களும் வந்து கற்கும்படி” ஆலயங்கள் கட்டினார்; ஆலயமே இல்லாத இடங்களில், திறந்தவெளியில் கிளைகளால் அமைந்த குடிசையின் கீழ் பலிபீடம் எழுப்பினார்.`,
          note: ``,
        },
        {
          key: `forestRoad`,
          heading: `காட்டுப் பாதையில் ஒரு குரு`,
          body: `இவ்வூர் திருவிதாங்கூருக்கும் பாண்டிய நாட்டிற்கும் இடையிலான பழைய பாதையில் அமைந்திருந்தது — இரு திசையிலும் பயணிப்போர்க்கு வசதியான தங்குமிடம்; பிற்காலத்தில் மறைப்பணி இங்கே ஒரு தங்கும் இல்லத்தை அமைத்ததற்குக் காரணமும் அதுவே. ஏறத்தாழ 1680-இல் சாந்தாயி அம்மையார் என்ற கிறிஸ்தவப் பெண் இக்காட்டில் குடியேறி, தம் வீட்டு வாசலுக்கு எதிரே திறந்தவெளியில் ஒரு சிறிய குருசடியை எழுப்பினார். பருத்தி பறித்துக்கொண்டிருந்தபோது குதிரையில் ஒரு குரு வந்தார் என்றும், அவரிடம் ஓடிச்சென்று தம் வீட்டையும் குருசடியையும் ஆசீர்வதிக்கும்படி கேட்டார் என்றும், அவர் குதிரையை நிறுத்தி ஆசீர்வதித்தார் என்றும் பங்கின் நினைவு சொல்கிறது. இப்பங்கிற்கு எந்தக் கடமையும் இல்லாத பேட்டின் மாவட்டக் குறிப்பேடு, அருட்தந்தை தெ பிரிட்டோ “வடக்கன்குளம் வரை தெற்கே ஊடுருவிச் சென்றிருந்தார்” எனப் பதிவு செய்கிறது. பருத்தி வயலும், குதிரையும், அந்த ஆசீர்வாதமும் இவ்வூரின் சொந்த நினைவு.`,
          note: `பங்கின் சொந்த வரலாறே வேறொரு வாய்ப்பையும் மறைக்காமல் முன்வைக்கிறது: மலபாரிலிருந்து முத்துக் குளிக்கும் கரைக்குச் சென்றுகொண்டிருந்த அருட்தந்தை இஞ்ஞாசியு தெ கோஸ்தாவாகவும் அப்பாதையின் குரு இருந்திருக்கலாம். இரு வாசிப்புகளும் இங்கே காக்கப்படுகின்றன.`,
        },
        {
          key: `chapel`,
          heading: `ஓலையால் ஒரு சிற்றாலயம், 1685`,
          body: `மேலும் குடும்பங்கள் வந்து சேர, சாந்தாயியின் வாசல் குருசடி அவர்களைத் தாங்க இயலவில்லை. 1685-இல் இங்கே ஒரு கோவில் இருந்தது — ஓலையால் வேயப்பட்ட சிறியது. இதுவரையிலும் பங்கு தன்னைப் பற்றித் தானே சொல்லிக்கொள்வதல்ல: நாடார் சமூகத்தின் சமூக வரலாற்றை எழுதிய ஹார்ட்கிரேவ் “1685-இல் ஒரு கோவில் கட்டப்பட்டது” என நேரடியாகவே குறிப்பிடுகிறார்; அவ்வாண்டுக்குள் இங்கே ஒரு கிறிஸ்தவ சபை உருவாகிவிட்டதை பேட்டும் ஆயர் நீலும் உறுதிப்படுத்துகின்றனர். அதை எழுப்பியது யாருடைய கைகள் என்பதே கடினமான வினா; அதற்கான நேர்மையான பதில் கீழே உள்ளது.`,
          note: `அக்காலத்திய எந்த மூலமும் அச்சிற்றாலயம் யாருக்கு அர்ப்பணிக்கப்பட்டது என்று சொல்லவில்லை. திருக்குடும்பப் பெயர் இங்கே 1752-இன் ஆலயத்திலிருந்தே ஆவணப்படுத்தப்படுகிறது — அது “முதலாவதைப் போலவே” அர்ப்பணிக்கப்பட்டது என்று பெஸ் எழுதுகிறார்.`,
        },
        {
          key: `harvest`,
          heading: `முதல் அறுவடை`,
          body: `ஏறத்தாழ இருநூறு திருமுழுக்குகள் என்பது பங்கின் நினைவு — இவ்வூர் கண்ட முதல் கிறிஸ்தவர்கள்; ஆண்களும் பெண்களும் குழந்தைகளுமாக ஒருசேர நீருக்குக் கொண்டுவரப்பட்டவர்கள். மறைமாவட்டத்தின் சொந்தக் குறிப்பு “1686-இல் இருநூறுக்கும் மேற்பட்டோர்” என்கிறது; ஆயர் ஸ்டீஃபன் அவர்களின் நிறைவாண்டுச் செய்தியும் அவர் வந்து, திருமுழுக்கு அளித்து, கட்டியது அவ்வாண்டிலேயே என்கிறது. பங்கின் சொந்தக் குடும்பத்திற்கு வெளியே எந்த நூலும் இந்த எண்ணிக்கையைத் தாங்கவில்லை; அதை மறைக்கவும் இல்லை. இம்மனிதருக்கு அது அடக்கமான எண்ணிக்கைதான்: இரண்டே மாதங்களில் இரண்டாயிரத்து எழுநூறு பேருக்கு அவர் திருமுழுக்கு அளித்ததை அவரது வாழ்க்கை வரலாற்றாசிரியர் எண்ணிக் குறித்துள்ளார்.`,
          note: `திருமுழுக்குகளைப் பங்கின் மூலங்கள் 1685-இல், சிற்றாலயத்துடன் “அதே சமயத்தில்” வைக்கின்றன; மறைமாவட்டமும் ஆயர் ஸ்டீஃபனும் அவற்றை 1686-இல் வைத்து, அது ஒரு மறுவருகை என்கின்றனர். இப்பக்கம் இரண்டையும் காக்கிறது; எதையும் உறுதியாக்கவில்லை.`,
        },
        {
          key: `recalled`,
          heading: `லிஸ்பனுக்குத் திரும்ப அழைக்கப்பட்டு, மீண்டும் வந்தார்`,
          body: `1686-இல் மறவ நாட்டிற்குள் சென்று, சில மாதங்களில் ஆயிரக்கணக்கானோருக்குத் திருமுழுக்கு அளித்தார். பின்னர் தம் மறைக்கல்வி ஆசிரியர்களுடன் சேர்த்துப் பிடிக்கப்பட்டு, அடிக்கப்பட்டு, இறந்துவிட்டார் எனக் கருதி விடப்பட்டு, நாடு கடத்தப்பட்டார்; 1687-இல் மறைப்பணி அவரைத் தன் பிரதிநிதியாகப் போர்த்துகலுக்கு அனுப்பியது. அவரை வரவேற்ற அரசவை — அவருடன் சேர்ந்து வளர்ந்த அரசரே — அங்கேயே தங்கும்படி வற்புறுத்தியது; அவரது பிறப்புக்கு உரிய அனைத்தையும் முன்வைத்தது. அவர் மறுத்தார். தம் தமிழ்க் கிறிஸ்தவர்களிடமே திருப்பி அனுப்பும்படி கேட்டார் — அதன் விலை என்னவென்று நன்கு அறிந்தே. 1690-இல் மீண்டும் கப்பலேறி, 1691-இல் தம் மறைப்பணிக்குத் திரும்பிவிட்டார்.`,
          note: ``,
        },
        {
          key: `arrest`,
          heading: `கைது, 1693 ஜனவரி 8`,
          body: `1693 ஜனவரி 8-ஆம் நாள் பிடிக்கப்பட்டார். இருபத்தெட்டாம் நாள் விசாரணை நடத்தி, சுட்டுக் கொல்லத் தீர்ப்பிடப்பட்டார்; முப்பத்தோராம் நாள் தீர்ப்பை நிறைவேற்ற ஓரியூருக்குக் கொண்டுவரப்பட்டார். இம்மூன்று தேதிகளும் அவர் வாயாலேயே வந்தவை — தமது இறுதி இரவில் எழுதிய கடிதத்தில் அவரே அவற்றைப் பதிவு செய்தார். அதனாலேயே கதையின் இப்பகுதிக்கு வேறு சான்று தேவையில்லை.`,
          note: ``,
        },
        {
          key: `oriyur`,
          heading: `ஓரியூர், 1693 பிப்ரவரி 4`,
          body: `ஆளுநர் முருகப்ப பிள்ளை தீர்ப்பை அறிவித்தார்; வீரத்திற்கும் கொடுமைக்கும் பெயர்பெற்ற பெருமாள் என்ற வீரன் அதை நிறைவேற்றினான். எந்தக் கிறிஸ்தவரும் எடுத்துச் செல்ல இயலாதபடி அவரது கைகளும் கால்களும் வெட்டப்பட்டு, உடல் ஒரு கழுமரத்தில் நிறுத்தப்பட்டது — ஆனால் மூன்று இரவுகள் அவ்விடத்தின்மேல் ஓர் ஒளி நின்றதாகச் சொல்லப்பட்டது; கரையோர டச்சுக் காரர்களே அதைப் பதிவு செய்தனர். திருஎச்சங்கள் மறைப்பணித் தலைவர் பிரான்சிஸ்கோ லாய்னெசிடம் சேர்க்கப்பட்டு, புதுச்சேரிக்கும் அங்கிருந்து கோவா இயேசு சபைக் கல்லூரிக்கும் அனுப்பப்பட்டன. அவர் “நாற்பத்தைந்து வயதுடையவர்… மதுரை மறைப்பணியில் பத்தொன்பது ஆண்டுகள்” என்று போயெரோ எழுதுகிறார். நான்கு ஆண்டுகளுக்குப் பின் அந்த்வெர்ப்பில் அச்சான ஒரு லத்தீன் இரத்தசாட்சி நூல், அதன் தலைப்பிலேயே அந்நாளை நிலைநிறுத்தியது: விசுவாசத்தின்மேல் கொண்ட வெறுப்பால் கொல்லப்பட்டார், 1693 பிப்ரவரி நான்காம் நாள்.`,
          note: `சிறைக் கடிதத்தின் மை அரைத்த கரியைத் தமது உமிழ்நீரில் குழைத்தது என்கிறார் ஃபேபர்; தண்ணீரில் குழைத்த கரி என்கிறார் அகுஸ்த் ஜான். இப்பக்கம் ஃபேபரைப் பின்பற்றுகிறது. இருவருமே அச்சிடப்பட்ட மறைப்பணி வரலாற்றாசிரியர்கள், இருவருமே பங்கைச் சார்ந்தவர் அல்லர் — இது உண்மையான முரண்; பதிவேட்டில் காக்கப்படுகிறது.`,
        },
        {
          key: `afterwards`,
          heading: `அந்த இரத்தத்திற்குப் பின்`,
          body: `அவர் மரித்த நிலத்தை மறவ மன்னரிடமிருந்து போர்த்துகல் அரசர் பெற்று, அங்கே ஒரு சிறிய ஆலயத்தைக் கட்டுவித்தார். 1736-ஆம் ஆண்டளவில், மயிலாப்பூர் ஆயர் திருத்தந்தை பன்னிரண்டாம் கிளமெண்ட் அவர்களுக்கு எழுதுகையில்: ஒவ்வொரு புதன்கிழமையும் இரத்தசாட்சியம் நிகழ்ந்த இடத்திற்குப் பெருந்திரளான மக்கள் செல்கின்றனர் என்றும்; அங்கே ஓர் ஆலயம் கட்ட மறவ மன்னர் அனுமதி அளித்து, பொருட்களில் பெரும்பகுதியையும் தந்தார் என்றும்; அது “எழுப்பப்பட்டு, பேறுபெற்ற கன்னி மரியாளுக்கு அர்ப்பணிக்கப்பட்டது” என்றும் குறிப்பிடுகிறார். அவரது தலையை வெட்டிய பெருமாளும் அத்திருப்பயணிகளுள் ஒருவனானான் — அவன் கிறிஸ்தவனானான். மரணத்திற்குப் பின் வந்த மாதங்களில் லாய்னெஸ் பதினான்காயிரம் பேருக்குத் திருமுழுக்கு அளித்தார். ஓர் இரத்தசாட்சியின் நிலம் வாராந்திரத் திருப்பயணத்துடன் ஒரு மரியன்னை திருத்தலமாக மாறுவது — ஒரு நூற்றாண்டுக்குப் பின் இப்பங்கும் தன் வழியில் வாழ்ந்த அதே வடிவம்.`,
          note: ``,
        },
        {
          key: `altars`,
          heading: `1853-இல் அருளாளர், 1947-இல் புனிதர்`,
          body: `1853 ஆகஸ்ட் 21-ஆம் நாள் ஒன்பதாம் பயஸ் அவரை அருளாளராக அறிவித்தார்; அவரது மரணம் பற்றிய இன்றளவும் முழுமையான குறிப்புகளுள் ஒன்றான ஜூசெப்பே போயெரோவின் ரோமன் வாழ்க்கை வரலாறு அவ்வாண்டிற்காகவே எழுதப்பட்டது. 1947 ஜூன் 22-ஆம் நாள் — இந்தியா விடுதலை பெறுவதற்கு ஆறு வாரங்களுக்கு முன் — பன்னிரண்டாம் பயஸ் அவரைப் புனிதராக அறிவித்தார். அவர் மரித்த நாளான பிப்ரவரி 4 அவரது திருவிழா; ரோமிலும், தமிழ்நாடு எங்கும், இவ்வூரிலும்.`,
          note: `இவ்விரு திருத்தந்தையர் செயல்களும் திருச்சபையின் பொதுப் பதிவே அன்றி, இத்திட்டத்தின் நூல்களிலிருந்து கிடைத்த கண்டுபிடிப்பு அல்ல; அந்நூல்களுள் ஒன்றைத் தவிர அனைத்தும் 1947-க்கு முன் அச்சானவை.`,
        },
      ],
      evidence: {
        label: `சான்றுகள்`,
        title: `இதில் எவ்வளவு நிரூபிக்கப்பட்டது`,
        intro: `இத்திருத்தலம் தன் மூலங்களைச் சுட்டிக்காட்டுகிறது; ஒரு மரபை ஆவணமாக உடுத்திக் காட்டாது. மேலே சொல்லப்பட்ட கதைக்குப் பின்னால் நிற்பது என்ன — நினைவைத் தவிர வேறெதன்மேலும் நிற்காத பகுதி உட்பட — இதோ.`,
        rows: [
          {
            tier: `documented`,
            heading: `வெளிச் சான்றுகள் நிலைநாட்டுவது`,
            body: `1685-இல் வடக்கன்குளத்தில் ஒரு கோவில் கட்டப்பட்டது என்பதும், அவ்வாண்டுக்குள் இங்கே ஒரு கிறிஸ்தவ சபை உருவாகிவிட்டது என்பதும். 1683-இல் தெ பிரிட்டோ மதுரை மறைப்பணியின் பொறுப்பை ஏற்றார் என்பதும், இவ்வூர் வரை தெற்கே ஊடுருவிச் சென்றார் என்பதும். அவர் தண்டிக்கப்பட்டு, ஓரியூரில் சிறை வைக்கப்பட்டு, 1693 பிப்ரவரி 4-இல் தலை துண்டிக்கப்பட்டார் என்பதும் — முந்தைய இரவில் அவரே எழுதிய கடிதம், நான்கு ஆண்டுகளுக்குப் பின் அந்த்வெர்ப்பில் அச்சான லத்தீன் இரத்தசாட்சி நூல், அருளாளர் பட்டத்திற்காக எழுதப்பட்ட ரோமன் வாழ்க்கை வரலாறு ஆகியவற்றால் உறுதிப்படுத்தப்பட்டவை.`,
          },
          {
            tier: `tradition`,
            heading: `பங்கின் சொந்த நினைவாக நிற்பது`,
            body: `காட்டுப் பாதையில் சாந்தாயி சந்தித்த குரு தெ பிரிட்டோதான் என்பது. அச்சிற்றாலயத்தை அவரே எழுப்பி, திருக்குடும்பத்திற்கு அர்ப்பணித்தார் என்பது. ஏறத்தாழ இருநூறு பேர் திருமுழுக்குப் பெற்றனர் என்பது. மறைப்பணியின் சொந்த வரலாற்றாசிரியரான பெஸ்ஸும் இதை உறுதியாகச் சொல்லவில்லை: புதிய ஊரில் கோவில் கட்டிய மறைப்பணியாளர் “அருட்தந்தை ஜான் தெ பிரிட்டோவேயன்றி வேறல்லர் என்றும், ஆண்டு 1685 என்றும் சொல்லப்படுகிறது” என்றே எழுதினார். பின் தாமே ஒரு கோட்டை வரைந்தார் — “இங்கே மரபு வரலாற்று ஆவணங்களைச் சந்திக்கிறது” — 1701-ஆம் ஆண்டு ஆண்டறிக்கையை முன்வைத்தார்.`,
          },
          {
            tier: `tradition`,
            heading: `நூல்கள் சொல்லாதவை`,
            body: `தெ பிரிட்டோவின் எந்த வாழ்க்கை வரலாறும் இவ்வூரின் பெயரைச் சொல்லவில்லை — ஃபேபரும் இல்லை, போயெரோவும் இல்லை, 1854-இன் சுருக்கமும் இல்லை; அவரது சிறைக் கடிதமும் இதைக் குறிப்பிடவில்லை. ஓரியூர் இங்கிருந்து இருநூறு கிலோமீட்டர் வடக்கே. வடக்கன்குளம் ஆலயத்தின் நிறுவுதலை, இங்கே ஞானப்பிரகாசம் என்ற பெயரில் திருமுழுக்குப் பெற்ற மறைக்கல்வி ஆசிரியர் சிதம்பரம் பிள்ளையின்மேல் முதன்மையாக ஏற்றுகிறார் ஒரு நவீன ஆய்வாளர். மேலும், இவ்வூரின் முதல் கல் ஆலயத்தின் கட்டுமானம் முற்றிலும் வேறு கைகளுக்கே ஆவணப்படுத்தப்பட்டுள்ளது: அதன் அடித்தளத்தை அருட்தந்தை புத்தாரி இட்டார்; 1752-இல் அதை அருட்தந்தை தோமஸினி நிறைவு செய்தார்.`,
          },
        ],
        closing: `இவை எதுவும் அப்பக்தியை அழிப்பதில்லை; அதற்கு இடம் காட்டுகின்றன. அருளானந்தர்மேல் வடக்கன்குளம் கொண்டிருக்கும் உரிமை நினைவின் உரிமை, அறுபடாத வணக்கத்தின் உரிமை — அவரது திருவிழாவைக் கொண்டாட இவ்வூருக்கு ஒருபோதும் ஓர் ஆவணம் தேவைப்பட்டதில்லை.`,
      },
      bond: {
        label: `எங்கள் பங்குடனான பிணைப்பு`,
        title: `இந்தத் திருத்தலம் அவரை நிறுவனராகக் கொள்வது ஏன்`,
        intro: `புனித ஜான் தெ பிரிட்டோ தமிழகமெங்கும் போற்றப்படுகிறார். வடக்கன்குளத்தில் அவர் தொடக்கமாகவே போற்றப்படுகிறார் — ஒரு பெண்ணின் குருசடிக்காகத் தம் குதிரையை நிறுத்தினார் என்று ஊர் நம்பும் அந்தக் குரு; அதற்குப் பின் வந்த அனைத்தையும் இவ்வூர் அவரிலிருந்தே எண்ணுகிறது.`,
        pillars: [
          {
            heading: `முதல் ஆலயம், 1685`,
            body: `1685-இல் இங்கே ஓலைக் கோவில் ஒன்று நின்றது; அதை எழுப்பியவராக இப்பங்கு எப்போதும் அவரையே பெயர் சொல்லி வந்துள்ளது. அதற்குப் பின் எழுந்த ஒவ்வொரு கட்டிடமும் அதே நிலத்தில்தான் நின்றுள்ளது; பங்கு தன் வயதை அவ்வாண்டிலிருந்தே எண்ணுகிறது.`,
          },
          {
            heading: `கிளைக் குடிசையிலிருந்து சின்ன ரோமாபுரி வரை`,
            body: `ஓலையிலிருந்து அருட்தந்தை புத்தாரியின் 1752 செங்கல் ஆலயம் வரை, 1872-இல் ஆசீர்வதிக்கப்பட்ட பெரிய இரட்டை நடை ஆலயம் வரை, 1993-இல் அறிவிக்கப்பட்ட திருத்தலம் வரை — அறுபடாத ஒரு வரிசை. ஒரே நிலத்தில் நான்கு ஆலயங்கள்; அவற்றுள் முதலாவது அவருடையது.`,
          },
          {
            heading: `ஊர் பயன்படுத்தும் பெயர்`,
            body: `இங்கே யாரும் “தெ பிரிட்டோ” என்று சொல்வதில்லை. அவர் அருளானந்தர் — 1695-இன் ரோமன் விசாரணையில் சாட்சி சொன்ன மறைக்கல்வி ஆசிரியர்களுக்கும் அவர் அப்பெயரால்தான் அறிமுகம்; தம் சொந்தப் பெயரைத் துறந்தபோது அவர் ஏற்ற தமிழ்ப் பெயர் அது.`,
          },
          {
            heading: `நினைவு மட்டுமல்ல, வழக்கம்`,
            body: `பிப்ரவரி 4-ஆம் நாள் அவரது திருவிழா பங்கின் ஆண்டுக் காலண்டரின் நிலையான நாட்களுள் ஒன்று; திருத்தல வளாகத்தில் அவரது குகை நிற்கிறது; ஊர் பிரிக்கப்பட்டுள்ள சிற்றினக் குழுக்களான அன்பியங்களுள் இரண்டு அவரது பெயரைத் தாங்கியுள்ளன.`,
          },
        ],
      },
      today: {
        label: `இப்பங்கில்`,
        title: `இன்றைய அருளானந்தர்`,
        intro: `இப்பங்கு அவரைப் பற்றிப் படிக்கவில்லை. ஆண்டின் எந்த மாலையிலும் நடந்து சென்று சேரக்கூடிய ஓர் இடமாகவே அவர் இங்கே இருக்கிறார்.`,
        items: [
          {
            heading: `திருத்தல வளாகத்தில் அவரது குகை`,
            body: `வேப்ப மரத்தடியில் அமைந்த மரத்தாலான கோத்திக் பாணிக் குகையில் அவரது உருவம் உள்ளது; இருபுறமும் புனித மிக்கேலும் புனித ரபேலும். 2019 ஆகஸ்ட் 6-ஆம் நாள் — பத்து நாள் மாதா பெருங்கூர் விழாவின் தொடக்க நாளில் — அது ஆசீர்வதிக்கப்பட்டது; அக்கம்பக்கத்துக் குடும்பங்கள் பங்குடன் சேர்ந்து அதைக் கட்டின.`,
          },
          {
            heading: `சிலுவைக் கோவிலில் புனித தேவசகாயத்தின் அருகில்`,
            body: `காட்சி மாதா ஆலயத்தின் சிலுவைக் கோவிலில் அவரது உருவம் புனித தேவசகாயத்தின் அருகிலேயே நிற்கிறது — இவ்விடத்தை நிறுவியவரும், இவ்விடத்தில் திருமுழுக்குப் பெற்றவரும். 2013 முதல் 2018 வரை பங்குத் தந்தையாக இருந்த அருட்தந்தை தத்தேயு ராஜன் அவர்களின் காலத்தில் இரு உருவங்களும் நிறுவப்பட்டன; முதல் சனிக்கிழமைப் பக்தி முயற்சியையும் அவரே அங்கே நடத்தினார்.`,
          },
          {
            heading: `அவரது திருவிழா, பிப்ரவரி 4`,
            body: `இரத்தசாட்சியின் நாளை இப்பங்கு ஆண்டுதோறும் பிப்ரவரியில் கொண்டாடுகிறது — ஜனவரியில் புனித சேபஸ்தியாரிலிருந்து ஆகஸ்ட்டில் மாதாவின் பத்து நாள் பெருங்கூர் வரை நீளும் காலண்டரின் நிலையான விழாக்களுள் ஒன்று.`,
          },
        ],
      },
      related: {
        heading: `தொடர்ந்து படிக்க`,
        items: [
          {
            title: `பங்கின் முழு வரலாறு`,
            body: `சாந்தாயியின் குருசடியிலிருந்து திருத்தலம் வரை — எட்டு அத்தியாயங்களில் முந்நூறு ஆண்டுகள்; ஒவ்வொரு தருணத்திற்கும் மூலம், ஒவ்வொரு ஐயத்திற்கும் இடம்.`,
            href: `/history`,
            cta: `வரலாறு`,
          },
          {
            title: `புனித தேவசகாயம் பிள்ளை`,
            body: `1745-இல் இந்த ஆலயத்தில் திருமுழுக்குப் பெற்று, 2022-இல் புனிதரானவர் — இப்பங்கின் இரண்டாம் புனிதர்; இவ்வூரைப் பற்றிய மிக உறுதியான சான்றும் இதுவே.`,
            href: `/saints/devasahayam-pillai`,
            cta: `அவரது பக்கம்`,
          },
          {
            title: `திருவிழாக்களும் திருப்பலி நேரங்களும்`,
            body: `பிப்ரவரி 4-இல் புனித ஜான் தெ பிரிட்டோ திருவிழா உட்பட, பங்கின் ஆண்டு முழுவதும்.`,
            href: `/mass-timings`,
            cta: `காலண்டர்`,
          },
        ],
      },
      sources: {
        heading: `ஆதாரங்கள்`,
        body: `ஓரியூர் சிறையிலிருந்து புனிதர் தாமே எழுதிய கடிதம் (1693 பிப்ரவரி 3); அவரது மரணம் குறித்து அச்சான மிகப் பழைமையான இரத்தசாட்சி நூல் (அந்த்வெர்ப், 1697); அருளாளர் பட்டத்திற்காக ஜூசெப்பே போயெரோ, இ.ச., எழுதிய ரோமன் வாழ்க்கை வரலாறு (1853); F. W. Faber-இன் ஆங்கில வாழ்க்கை வரலாறு (லண்டன், 1851); ஜோசப் பெர்த்ரானின் La Mission du Maduré; திருநெல்வேலி மாவட்டக் குறிப்பேடு (1917); ஆயர் ஸ்டீஃபன் நீல், ரொபேர்ட் ஹார்ட்கிரேவ்; பங்கின் சொந்த ஆங்கில நகலிலுள்ள பெஸ்ஸின் மறைப்பணி வரலாறு; பங்கின் சொந்தப் பதிவுகள் — இவற்றிலிருந்து இப்பக்கம் கட்டப்பட்டுள்ளது. மேலுள்ள ஒவ்வொரு பகுதியும் தான் நிற்கும் சான்றுகளைத் தானே பெயர் சொல்லிக் காட்டுகிறது. அவை அனைத்தும் ஆதாரங்கள் பக்கத்தில் முழுமையாகப் பட்டியலிடப்பட்டுள்ளன.`,
        chipsLabel: `இப்பக்கத்தின் அனைத்து மூலங்களும்`,
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
      intro: `கவராயம் திறந்தாற்போல் விரிந்து, ஒரே பலிபீடத்தில் சந்திக்கும் இரு நடைகள். சுண்ணாம்பிலும் பதனீரிலும் திரும்பும் இருபத்து நான்கு வளைவுகள், இரும்பே இல்லாத ஒரு கூரையைத் தாங்கி நிற்கின்றன. தொண்ணூற்றிரண்டு அடி வானளாவி உயரும் இரட்டைக் கோபுரங்கள், இவ்வூருக்கே ஒரு புதிய பெயரைத் தந்தன.`,
      heroAlt: `தெளிந்த வானின் பின்னணியில், வடக்கன்குளம் திருக்குடும்ப ஆலயத்தின் வெண்ணிறக் கோத்திக் முகப்பு, இரட்டை எண்கோணக் கோபுரங்களும் சிகரங்கள் நிறைந்த கூரையோரமும்`,
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
      overtureLabel: `மேலே பார்ப்பதற்கு முன்`,
      overtureLead: `பங்கு தானே அதைச் சொல்வதற்கு முன்பே, ஓர் அந்நியர் அதைச் சொன்னார். 1894-இல் ஓர் இயேசு சபை பிரெஞ்சு வரலாற்றாசிரியர் இவ்வாலயத்தைப் பார்த்து, “ஒருவேளை உலகிலேயே இணையற்றது” என்று எழுதினார்.`,
      overtureP1: `மற்றவர்களும் அதையே, தத்தம் வார்த்தைகளில் சொன்னார்கள். 1885-இல் ஒரு ஜெர்மன் கத்தோலிக்க மாத இதழ் இதை “கட்டிடக்கலையின் ஒரு தலைசிறந்த படைப்பு” என்று புகழ்ந்தது, இதைக் கட்டிய மனிதருக்கே அப்புகழைச் சேர்த்தது: சகோதரர் பெர்கந்தால். மறைமாவட்டத்தைப் புகழவேண்டிய அவசியமே இல்லாத பிரிட்டிஷ் மாவட்ட புவியியல் குறிப்பேடு கூட, இதை வெறுமனே “அழகிய ஆலயம்” என்று அழைத்தது.`,
      overtureP2: `அந்தப் புகழுக்குப் பின்னால் இரண்டு பேர் நின்றனர். பங்குத் தந்தை ஜோசப் கிரகோயர் பதினேழு ஆண்டுகள் கட்டிடம் எழுப்பும் பணியில் இருந்தார்; திட்டம் அவருடையதே: வாசல்களில் அகன்று விரிந்து, கிழக்கு நோக்கிச் செல்லச் செல்ல நெருங்கி, ஒரே பலிபீடத்தில் சந்திக்கும் இரு நடைகள். சகோதரர் ஜோசப் பெர்கந்தால் அதை நிஜமாக்கினார். முன்பு மேற்கு ஜெர்மனியில் ஒரு படைவீரர், பின்னர் இயேசு சபையின் துணைச் சகோதரர், தான் கட்டிடக்கலை பயின்று ஜெர்மனியிலும் பிரான்சிலும் உள்ள பெரும் ஆலயங்களைச் சுற்றிப் பார்த்திருப்பதாகச் சொன்னவர், அவரே திட்டங்களை வரைந்து பணியாளர்களுக்கு நேரடியாகத் தலைமை தாங்கினார். 1855-க்கும் 1872-க்கும் இடையில் அவர்கள் முழு ஆலயத்தையும் சுண்ணாம்புச் சாந்தின் மேல் மட்டுமே எழுப்பினார்கள். இரும்பு இல்லை. சிமெண்ட் இல்லை. தலைக்கு மேல் வளைவுகளில் ஒரு மர உத்திரம் கூட இல்லை.`,
      overtureP3: `இனி வருவது அந்தப் பதினேழு ஆண்டுகளின் பட்டியல் அல்ல. இது நீங்கள் உண்மையில் சந்திக்கும் வரிசையிலேயே அறிமுகமாகும் ஆலயமே: முதலில் கண்ணில் படுவது, பின் காதில் விழுவது, பின் உள்ளே நுழையும்போது ஒளியில் மின்னுவது, இறுதியில்தான் அனைத்தும் என்ன பொருள்படுகிறது என்பது.`,
      numbersKicker: `ஆலயம், சுருக்கமாக`,
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
          body: `அருட்தந்தை புத்தாரி தொடங்கி, அருட்தந்தை தோமஸினி பெருங்குடியின் அகன்ற செங்கற்களால் முடித்த சிலுவை வடிவக் கல் ஆலயம். பீடத்திற்கு மேல், தாய் மரியாளின் திருவுருவம் திறந்தும் மூடியும் வைக்கக்கூடிய கதவுகளுடன் கூடிய ஒரு மாடத்தில் நின்றது. 1803 அக்டோபர் அன்று அது திறந்திருந்த போதே, திருவுருவம் கண்ணீர் சிந்தத் தொடங்கியது, மணியும் வந்து காணுமாறு ஊரை அழைத்தது.`,
        },
        {
          year: `1872`,
          title: `மாபெரும் ஆலயம்`,
          body: `1855-இல், “வடக்கன்குளத்தின் அப்போஸ்தலர்” என்று தன் மறைமாவட்டமே அழைத்த பங்குத் தந்தை ஜோசப் கிரகியின் காலத்தில், ஆயர் கனோஸ் அடிக்கல்லை ஆசீர்வதிக்கிறார். பதினேழு ஆண்டுகளுக்குப் பின், 1872 ஜூன் 27-இல் ஆசீர்வாதமும், இரு நாட்கள் கழித்து இன்று நிற்கும் இக்கட்டிடத்தை அர்ப்பணிக்கும் திருப்பலியும் நிறைவேறுகின்றன. கிரகி பின்னாளில், உடல்நலம் தேடிப் பிரான்சு திரும்பும் கடல் பயணத்திலேயே காலமானார்.`,
        },
      ],
      churchesCaption: `பங்கின் பழைய புகைப்படம் ஒன்றில் ஆலயம்`,
      planDrawTitle: `திருக்குடும்ப ஆலயத்தின் தரை வரைபடம்: ஒரே பீடப்பகுதி, ஒன்றை நோக்கி நெருங்கும் இரு நடைகள், ஐந்து வாசல்கள்`,
      planNote: `அ. சிவசுப்பிரமணியன், “கிறித்தவமும் சாதியும்” (2001) நூலின் வரைபடம் 5-இலிருந்து மீள்வரையப்பட்டது, அச்சில் உள்ள இவ்வாலயத்தின் ஒரே அளவீட்டு வரைபடம்.`,
      motto: `TEMPLVM SIT DVPLEX, ARA SED VNA;
FIDES VNA SIT, VNAQVE MENS.`,
      mottoTr: `ஆலயம் இரட்டையாக இருக்கட்டும், ஆனால் பலிபீடம் ஒன்றே; விசுவாசம் ஒன்றாக, மனமும் ஒன்றாக இருக்கட்டும்.`,
      mottoCaption: `1872-இல் ஆசீர்வதிக்கப்பட்ட ஆலயத்தின் பலிபீடத்தில் இடம்பெற்றுள்ள வாசகம்`,
      craftLabel: `கட்டமைப்பு`,
      craftTitle: `இரும்பு ஆணி ஒன்று கூட இல்லை`,
      craftBody: `உட்புறத்தில் இருபத்து நான்கு வளைவுகள். அவற்றுள் பன்னிரண்டு பலிபீடத்திற்கு மேல் ஒரே மகுடமாய்ச் சேர்கின்றன, ஒன்றைக்கூடச் சிமெண்டோ, இரும்போ, மர உத்திரமோ தாங்கவில்லை. சுண்ணாம்புச் சாந்தில் மட்டுமே எழுப்பப்பட்டு, நூற்றைம்பது ஆண்டுகளாகத் தாமே தாங்கி நிற்கின்றன. இதன் பின்னால் நின்றவர் இயேசு சபையின் துணைச் சகோதரர் ஜோசப் பெர்கந்தால், இவ்வாலயம் பற்றிய குறிப்புகள் எவையும் பெரும்பாலும் பெயர் சொல்லாத ஒருவர். ஒரு காலத்தில் அவர் மேற்கு ஜெர்மனியில் ஒரு படைவீரராக இருந்தார். ஒரு கட்டிடத்தின் வரைபடம் வரையும் திறன் உண்டா எனக் கேட்கப்பட்டபோது, தான் கட்டிடக்கலை பயின்று ஜெர்மனியிலும் பிரான்சிலும் உள்ள பெரும் கட்டிடங்களைச் சுற்றிப் பார்த்திருப்பதாக மட்டும் பதிலளித்தார். இவ்வாலயம் ஆசீர்வதிக்கப்பட்டு பதினொரு மாதங்களில், அவர் காலமானார்.`,
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
          d: `சுட்ட சங்கும் சுண்ணாம்புக் கல்லும், பிணைப்பான்`,
        },
        {
          ta: `கடுக்காய்`,
          tr: `kadukkai`,
          gloss: `கடுக்காய்`,
          d: `Terminalia chebula, சாந்தை இறுகச் செய்யும் டானின் சத்து`,
        },
        {
          ta: `முட்டை`,
          tr: `muttai`,
          gloss: `முட்டை`,
          d: `கல் போல் இறுகும் சாந்துக்காகக் கலக்கப்பட்டது`,
        },
      ],
      recipeNote: `பங்கு தானே தரும் செய்முறை இது. ஆங்கிலப் பங்கு வரலாறு “கள்” (புளித்த சாறு) என்கிறது; தமிழ் ஆதாரங்கள் “பதனீர்” என்கின்றன. சுண்ணாம்பு, கடுக்காய், முட்டை ஆகியவற்றில் அனைத்து ஆதாரங்களும் ஒன்றுபடுகின்றன.`,
      craftCaption: `பீடப்பகுதிக்கு மேலுள்ள வளைவு, இரும்போ, உத்திரமோ, சட்டமோ இன்றி எழுப்பப்பட்டது`,
      creedLabel: `பொருள்`,
      creedTitle: `விசுவாசப் பிரமாணமாய் நிற்கும் ஆலயம்`,
      creedBody: `தன் கட்டிடத்தையே எண்களாகப் படிக்கிறது இப்பங்கு. பங்கின் சொந்தக் கையெழுத்துக் குறிப்பாலும் வாய்மொழியாலும் தலைமுறை தலைமுறையாகக் காக்கப்பட்ட மரபு இது, 1855-இல் கட்டியவர்களே எழுதி வைத்தது அல்ல. இங்கு எதுவும் வெறும் கட்டமைப்பு அல்ல. ஒவ்வொரு எண்ணும் ஒரு மறையுண்மை. கீழே ஒரு வரியைத் தொடுங்கள், அது வரைபடத்தில் ஒளிரும். பின், பலிபீடத்தில் காத்திருக்கும் எண்களையும் அதே வழியில் படியுங்கள்.`,
      creedReadTitle: `வரைபடம், ஒரு விசுவாசப் பிரமாணமாய்`,
      creedReadHint: `ஒரு வரியைத் தொட்டு வரைபடத்தில் ஒளியேற்றுங்கள்.`,
      creedReadings: [
        {
          n: `5`,
          anchor: `doors`,
          means: `ஐந்து காயங்கள்`,
          what: `வரைபடத்தின் ஐந்து வாசல்கள்`,
          note: `இரு கைகள், இரு பாதங்கள், ஈட்டியால் திறக்கப்பட்ட விலா.`,
        },
        {
          n: `12`,
          anchor: `piers`,
          means: `பன்னிரு தூண்கள்`,
          what: `ஒவ்வொரு நடையிலும் நான்கு வீதம், அளவெடுத்த வரைபடத்தில் குறிக்கப்பட்டவை`,
          note: `கூரையைத் தாங்க பன்னிரண்டு; திருச்சபையைத் தாங்க அனுப்பப்பட்டவர்களும் பன்னிரண்டு.`,
        },
        {
          n: `3`,
          anchor: `arrows`,
          means: `மூன்று ஆணிகள்`,
          what: `மூன்று நுழைவுத் திசைகள், ஒவ்வொன்றும் சிலுவையை நோக்கியவை`,
          note: `ஒரே ஆலயத்திற்கு மூன்று வழிகள்; ஒரே திருவுடலைப் பற்றியிருந்தவை மூன்று ஆணிகள்.`,
        },
        {
          n: `14`,
          anchor: `stations`,
          means: `பதினான்கு ஸ்தலங்கள்`,
          what: `நடு வாசலிலிருந்து சிலுவை வரை செல்லும் நடை`,
          note: `சிலுவைப் பாதை — தீர்ப்பு முதல் கல்லறை வரை பதினான்கு நிலைகளில் நடக்கப்படுவது.`,
        },
        {
          n: `1`,
          anchor: `altar`,
          means: `ஒரே ஆண்டவர்`,
          what: `இரு நடைகளும் சந்திக்கும் ஒரே பலிபீடம்`,
          note: `உள்ளே வர எத்தனை வழிகள் இருந்தாலும், முடிவில் இருப்பது ஒரே பீடம்.`,
        },
      ],
      creedAltarTitle: `பீடத்தில் காத்திருப்பவை`,
      creedAltarHint: `ஒரு வரியைத் தொட்டு பீடத்தில் கண்டுகொள்ளுங்கள்.`,
      altarPhotoAlt: `பெரும் பீடத்தின் பின்னால் நிற்கும் செதுக்கு அமைப்பு: சிலைகளுடன் ஐந்து வளைவு மாடங்கள், நடுவே சிலுவை, அதற்கு மேலே புறா`,
      altarPhotoNote: `பெரும் பீடம், மீதிப் படிப்பு காத்திருக்கும் இடம்`,
      creedAltarUncounted: `ஒன்பது சிலைகளும் அடிவரிசை வளைவுகளும் பீடத்தில் இன்னும் எண்ணிப் பார்க்கப்படவில்லை. பங்கின் குறிப்பு தரும் வண்ணமே அவை இங்கே பதிவு செய்யப்பட்டுள்ளன.`,
      creed: [
        {
          n: `5`,
          anchor: `upperArches`,
          what: `பீடத்தின் மேல் வரிசை வளைவுகள்`,
          means: `ஐந்து காயங்கள், மீண்டும் ஒருமுறை`,
          note: `அதே ஐந்து, பீடத்திற்கு மேலே கல்லில் இரண்டாம் முறை எண்ணப்பட்டவை.`,
        },
        {
          n: `9`,
          anchor: `flowers`,
          what: `பூங்கொத்துச் சிலைகள்`,
          means: `ஒன்பது கூட்டச் சம்மனசுகள்`,
          note: `சம்மனசுகள், அதிதூதர்கள், தலைமையாட்சியர், வல்லமையர், வல்லாண்மையர், ஆட்சியாளர், சிம்மாசனத்தார், கெருபீன்கள், செராபீன்கள்.`,
        },
        {
          n: `4`,
          anchor: `lowerArches`,
          what: `கீழ் வரிசை வளைவுகள்`,
          means: `மத்தேயு, மாற்கு, லூக்கா, யோவான்`,
          note: `நான்கு நற்செய்தியாளர்கள், ஆளுக்கு ஒரு வளைவு, பீடம் தாங்கும் அனைத்திற்கும் அடியில்.`,
        },
        {
          n: `3`,
          anchor: `trinity`,
          what: `எல்லாவற்றின் நடுவில்`,
          means: `தந்தை, மகன், தூய ஆவி`,
          note: `மேலே புறா, கீழே சிலுவையில் மகன் — பீடத்தின் சொந்த அச்சில்.`,
        },
      ],
      creedNoteCaption: `பங்கின் சொந்தக் குறிப்பு, “திருக்குடும்ப ஆலயம்: கட்டிடத்தின் தத்துவம்”`,
      towersLabel: `ஊரின் வான்கோடு`,
      towersTitle: `சின்ன ரோமாபுரி என்று ஏன் அழைக்கிறார்கள்`,
      towersBody: `இப்பெயர் உண்மையில் கோபுரங்களின் உயரத்தைப் பற்றியது அல்ல. பங்கு இதை ஒரே ஒரு எளிய ஒப்பீட்டில் சொல்கிறது: இவ்வாலயம், அது சொல்வதுபோல், “உலகப் பிரசித்தி பெற்ற ரோமாபுரி பேராலயம் போன்று” கட்டப்பட்டது, ரோமாபுரியைத் தவிர உலகில் வேறெங்கும் இல்லாத ஒரு வடிவமைப்பு. இதற்கு முன் இம்மாவட்டத்தில் வேறெதுவும் இதைப் போல் இருந்ததில்லை. அடி முதல் சிகரம் வரை எண்கோண வடிவில் உயரும் இரட்டைக் கோபுரங்கள். அவற்றைச் சுற்றி சிறு கோபுரங்களின் ஒரு வளையம். சுற்றுவட்டாரத்தில் எந்த ஆலயமும் இதுவரை முயற்சிக்காத ஒரு கம்பீரமான மேற்கத்திய பாணியில் எழுப்பப்பட்டவை. ஒரு சிற்றூர் ரோமாபுரி பேராலயத்தின் தோற்றத்தை அணிந்திருந்தது, 1926-இல் அதுவே தூத்துக்குடியின் முதல் ஆயருக்கு, வடக்கன்குளத்திற்கு இன்றும் அது பதிலளிக்கும் பெயரைத் தர போதுமான காரணமாயிற்று: சின்ன ரோமாபுரி.`,
      towersCaption: `இரட்டைக் கோபுரங்களும், சிகரங்கள் சூழ்ந்த கூரையும்`,
      bellsLabel: `ஆலய மணிகள்`,
      bellsTitle: `பிரான்சின் இரட்டை மணிகள்`,
      bellsBody: `இரு கோபுரங்களில் ஒவ்வொன்றிலும் உயரத்தில் ஒரு வெண்கல மணி தொங்குகிறது, 1861-இல் பிரான்சில் வார்க்கப்பட்டுக் கடல் கடந்து வடக்கன்குளம் வந்தது. நூற்றைம்பது ஆண்டுகளுக்கும் மேலாக அவை பங்கு மக்களைச் செபத்திற்கு அழைத்து வருகின்றன.`,
      bellsBeats: [
        {
          year: `1861`,
          title: `பிரான்சில் வார்ப்பு`,
          body: `காசிமிர் கிரகோயர் என்னும் பிரெஞ்சு அறக்கொடையாளர் இம்மணிகளை ஆலயத்திற்கு அளித்தார். எல்லாக் குறிப்புகளின்படியும் அவர் பங்குத் தந்தை ஜோசப் கிரகோயர் அவர்களின் உறவினர், கோபுர மணியின் வெண்கலத்தில் இன்றும் அவரது பெயர் பொறிக்கப்பட்டுள்ளது: “Donateur Casimir Grégoire”. இந்த எழுத்துகளுடன், வெண்கலத்திலேயே ஒரு சிலுவையும், குழந்தை இயேசுவைச் சுமந்த அன்னை மரியாளின் உருவமும் வார்க்கப்பட்டுள்ளன. வெளியான குறிப்புகள் லியோன் நகரின் பர்டின் வார்ப்பகத்தைக் குறிப்பிட்டு வந்தன. மணியின் வெண்கலம் வேறு சொல்கிறது: “Vve Grégoire de Valence (Drôme)”. பதிவும் வெண்கலமும் வேறுபடும் இடத்தில், வெண்கலத்தின் சொல்லே இறுதி.`,
        },
        {
          year: `கடல் வழி`,
          title: `நீண்ட பயணம்`,
          body: `மரப் பெட்டிகளில் அடைக்கப்பட்டு, கப்பலில் வந்து, சென்னைத் துறைமுகத்தில் இறங்கி, திருநெல்வேலி ஆட்சியர் அலுவலகம் வழியாகத் தெற்கே ஆலயத்தை அடைந்தன.`,
        },
        {
          year: `1872`,
          title: `கோபுரங்களில் ஏற்றம்`,
          body: `ஆலயம் அர்ப்பணிக்கப்பட்ட அதே ஆண்டில், இரட்டைக் கோபுரங்களில் ஒவ்வொன்றுக்கும் ஒரு மணி என ஏற்றப்பட்டன. செப வேளைகளிலும் ஒவ்வொரு திருவிழாவிலும் இன்றும் அவை ஒலிக்கின்றன.`,
        },
      ],
      bellsOlderLead: `இங்கு ஒலித்த முதல் மணிகள் இவை அல்ல.`,
      bellsOlder: `1752-இல் கட்டி முடிக்கப்பட்ட கல் ஆலயத்தில் ஒரு பழைய மணி ஒரு காலத்தில் தொங்கியது. 1803 அக்டோபர் மாதத்து ஒரு காலைப் பொழுதில், கண்ணீர் சிந்தத் தொடங்கிய அன்னையின் சொரூபத்தை வந்து காண ஊர் முழுவதையும் அழைத்தது அம்மணியே.`,
      bellsCaption: `கோபுரத்தில் தொங்கும் மணி, “Vve Grégoire de Valence (Drôme)” மற்றும் “Donateur Casimir Grégoire” என வார்க்கப்பட்டது`,
      lightLabel: `ஒளியும் நிறமும்`,
      lightTitle: `கண்ணாடி, சாயம், பொன்`,
      lightBody: `முதல் நூறு ஆண்டுகளில், ஆலயம் கண்ணாடியில் சொன்னது வேறொரு எளிமையான கதை. ஆலயத்தைச் சுற்றியுள்ள 23 சாளர வேலைப்பாடுகளிலும் சாதாரண, பொருந்தாத கண்ணாடியே இருந்தது. பக்கச் சுவர்களிலுள்ள மேலும் 16 சாளரங்கள் முற்றிலும் மூடப்பட்டே இருந்தன, இயேசு சபையின் நிர்வாகக் காலம் முழுவதும் காற்றுப் புகாதபடி அடைக்கப்பட்டிருந்தன, பங்கு இன்றும் சொல்லும் காரணம் வெறுமனே “குளிர்.” பின்னர் 1972 வந்தது, ஆலயத்தின் நூற்றாண்டு விழா, பங்கு ஒவ்வொரு சாளரத்தையும் இறுதியாக வண்ணக் கண்ணாடியால் நிரப்பியது, அடைக்கப்பட்டிருந்த சாளரங்களையும் திறந்தது. இன்று நீங்கள் காண்பது நூறு ஆண்டுகள் தாமதமாக வந்த அந்த அன்பளிப்பே: சிவப்பு, நீலம், மஞ்சள் நிற வைர வடிவக் கண்ணாடிகள் கூர்முனை கோத்திக் வளைவுகளுக்குள் பதிந்திருக்கின்றன, மும்மடல் ரோஜா வடிவங்கள் தம் மையத்தில் ஒளியைப் பிடிக்கின்றன, நடையின் மேல் உயரே, வண்ணம் தீட்டிய கூரை வளைவுக்குள் ஒரு ரோஜா சாளரம் ரத்தினத்தால் செதுக்கப்பட்ட சக்கரம் போல் அமர்ந்திருக்கிறது. உள்ளே, கூரை வளைவுகள், வில்வளைவுகள், தூண்கள் என எங்கும் பூக்களும் இயற்கைக் காட்சிகளும் தீட்டப்பட்டுள்ளன, வண்ணப் பூச்சாலோ ரசாயனத்தாலோ அல்ல, மரம் செடிகளிலிருந்து எடுத்த இயற்கைச் சாயங்களால். எதுவும் மங்கவில்லை. எதுவும் ஒருபோதும் மீண்டும் பூசப்படவில்லை.`,
      glassCaptions: [
        `வர்ணக் கண்ணாடி இதழ்ச் சாளரம், வண்ணம் தீட்டிய வளைவில்`,
        `1972 நூற்றாண்டு விழாவில் வண்ணமேற்றப்பட்ட நீள் சாளரங்கள்`,
        `வைர வடிவக் கண்ணாடிக் கட்டங்களும் மும்மடல் ரோஜா வடிவங்களும்`,
        `நடையின் வழியே கிழக்கு வாசல் நோக்கி விழும் ஒளி`,
      ],
      imagesLabel: `ஆலயம் சுமப்பவை`,
      imagesTitle: `கட்டிடம் தாங்கும் இரு சொரூபங்கள்`,
      imagesBody: `ஆலயம் எதற்காக என்பதை இரு சொரூபங்கள் சொல்கின்றன. ஒன்று நீங்கள் நுழையும் வாசலுக்கு மேல் காத்திருக்கிறது. மற்றொன்று நீங்கள் சென்றடையும் பீடத்திற்கு மேல் காத்திருக்கிறது.`,
      figures: [
        {
          title: `வாசலுக்கு மேல்`,
          body: `தலை வாயிலுக்கு மேல், முகப்பு மண்டபத்துக்குள், திருக்குடும்பத்தின் வண்ணப் புடைப்புச் சிற்பம் ஒன்று நிற்கிறது. மேலே பொன் ஒளிவட்டத்தில் ஒரு புறா இளைப்பாறுகிறது, உச்சியில் முக்கோணத்துள் ஒரு கண் பதிக்கப்பட்டுள்ளது, பிற்கால “பிரீமேசன்” அமைப்புகள் அதைத் தழுவிக்கொள்வதற்கு நூறாண்டுகளுக்கும் முன்பே தேவனாகிய தந்தையைக் குறிக்கக் கிறிஸ்தவ ஆலயங்களில் பயன்பாட்டில் இருந்த பழைய அடையாளம். இது எதிர்ச் சீர்திருத்தக் காலத்தில் தோன்றிய “இரு திரித்துவங்கள்” எனும் உருவகம், விண்ணகத் திரித்துவமும் மண்ணகத் திரித்துவமும் குழந்தை இயேசுவில் ஒன்றாய்ச் சந்திக்கின்றன. சுமார் 1600-இல் ஆண்ட்வெர்ப்பில் ஒரு பக்தி அச்சுப் படமாக இது உருவானது, அன்று முதல் இயேசு சபை ஆலயங்கள் இதைத் தொடர்ந்து சுமந்து வந்துள்ளன. உருவங்கள் மட்டும் பழையவை. அவற்றைச் சூழ்ந்த பொன் முலாமும் பின்னணி நீல வானமும் புதியவை; அப்பகுதி 2016-க்கும் 2022-க்கும் இடையில் மீண்டும் வண்ணம் தீட்டப்பட்டது. இச்சிற்பம் என்ன சொல்கிறது என்பதற்குப் பங்கிடமே சொந்த வார்த்தைகள் உண்டு: தலை வாயிலில் நிலைத்திருக்கும் திருக்குடும்பம் எழில் முகத்துடன் உங்களை உள்ளே அழைக்கிறது. “அன்பு மக்களே, உங்களது இதயத்தை எமக்குத் தந்திட உள்ளே வாருங்கள்!”`,
          caption: `நடு வாசலுக்கு மேலுள்ள “இரு திரித்துவங்கள்” சிற்பம்`,
        },
        {
          title: `பீடத்திற்கு மேல்`,
          body: `பெரும் பீடத்தில், குவிமாடம், கண்ணாடிக் கோபுரம், சிகரம் ஆகியவற்றின் கீழ் ஆறு சொரூபங்கள்: நடுவே சிலுவையில் அறையப்பட்ட கிறிஸ்து, அவருக்கு அருகில் அன்னை மரியாளும் புனித சூசையப்பரும், அவர்களுக்கு மேலே புனித செபஸ்தியார், புனித அந்தோணியார், புனித சவேரியார். தரை மொசைக் கற்களால் பதிக்கப்பட்டது. மரவேலைப்பாடு முழுவதும் பொன் முலாம், பங்கு இன்று வரை ஒருபோதும் மங்க விடாமல் காத்து வரும் பொன்.`,
          caption: `பொன் முலாம் பூசிய, மங்காத பெரும் பீடம்`,
        },
      ],
      inscription: `மரியே வாழ்க`,
      inscriptionGloss: `முகப்பு மண்டபத்தின் முகட்டில், தமிழ் எழுத்துகளில் புடைத்து நிற்கும் வாசகம். ஆலயத்தை நோக்கி வருபவரிடம் அது சொல்லும் முதல் சொல்.`,
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
      sourcesNote: `திருக்குடும்ப ஆலயத்தின் பங்கு வரலாறு; அ. சிவசுப்பிரமணியன், “கிறித்தவமும் சாதியும்” (2001); அகுஸ்த் ஜான், “Le Maduré” (1894); எச். ஆர். பேட், “Madras District Gazetteer: Tinnevelly” (1917); பங்கில் பாதுகாக்கப்படும் ஒரு கையெழுத்துக் குறிப்பு ஆகியவற்றிலிருந்து கட்டிடக்கலை விவரங்கள்.`,
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
      shrine: `திருத்தலம்`,
      visit: `வருகை`,
      record: `ஆவணங்கள்`,
      rights: `அனைத்து உரிமைகளும் பாதுகாக்கப்பட்டுள்ளன.`,
      builtBy: `இணையதளம் உருவாக்கியவர்`,
    },
  },
} as const;

export type Dict = typeof dict.en;
