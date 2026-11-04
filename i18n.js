/* EN / FR switch for the portfolio pages.
   Finds elements whose (whitespace-normalised) innerHTML is an English string in DICT and swaps it
   for the French. Headings flip letter by letter like a split-flap board; body text scrambles into place.
   The choice is remembered per visitor (localStorage) and can be forced with ?lang=fr / ?lang=en.
   Load it synchronously after the page markup and before the page's own script. */
(function () {
  'use strict';
  var NB = ' ', NN = ' '; // non-breaking space (before colons), narrow one (thousands)
  var C = NB + ':';

  var DICT = {
    /* ---------------- homepage ---------------- */
    '_title:Tomaso Portunato — Investment Analyst, Geneva': 'Tomaso Portunato — Analyste en investissements, Genève',
    '_desc:Investment tools built by Tomaso Portunato, investment analyst in Geneva: listed companies, private markets, family-office structures and real estate, from public data.':
      'Outils d’investissement réalisés par Tomaso Portunato, analyste en investissements à Genève' + C + ' sociétés cotées, marchés privés, structures de family office et immobilier, à partir de données publiques.',
    'Geneva · CH': 'Genève · CH',
    '#eyebrowText': ['Investment analyst · Geneva', 'Analyste en investissements · Genève'],
    'Investment tools<span class="dot">.</span>': 'Outils d’investissement<span class="dot">.</span>',
    'See the tools →': 'Voir les outils →',
    'Get in touch': 'Me contacter',
    'AI design note': 'Note sur l’IA',
    'Deal analysis': 'Analyse de transactions',
    'Fund operations': 'Gestion de fonds',
    'Market research': 'Études de marché',
    'Tools': 'Outils',
    'Six live builds': 'Six outils en ligne',
    'Work': 'Travail',
    'Personal': 'Perso',
    'Public Equities': 'Actions cotées',
    'Deal Analysis': 'Analyse de transactions',
    'Family Office': 'Family office',
    'Market Research': 'Études de marché',
    'Private Markets': 'Marchés privés',
    'Alternative Data': 'Données alternatives',
    'Live': 'En ligne',
    'NVIDIA, Tesla, Apple and Amazon as survey atlases built from their SEC filings: segments, ownership, debt, suppliers, risk-factor redlines and real estate, every figure linked to its filing.':
      'NVIDIA, Tesla, Apple et Amazon en atlas de relevés tirés de leurs documents déposés à la SEC' + C + ' segments, actionnariat, dette, fournisseurs, évolution des facteurs de risque et immobilier, chaque chiffre relié à son document.',
    'Geneva parcel screener: live cadastre, zoning, permits, PLQ and energy data from the canton\'s public services, on one screen per parcel.':
      'Sélection de parcelles à Genève' + C + ' cadastre, zones, autorisations, PLQ et données énergétiques en direct depuis les services publics du canton, sur un seul écran par parcelle.',
    'A family holding structure engraved as a tree: effective ownership along every chain, look-through by person, and succession or sale scenarios that reconcile.':
      'Une structure de détention familiale gravée en arbre' + C + ' détention effective le long de chaque chaîne, vue par personne, et scénarios de succession ou de cession qui se réconcilient.',
    'Every Dutch logistics and industrial building over 5,000 m², drawn in 3D from the national building register: stock, size, age and recent supply for any catchment.':
      'Chaque bâtiment logistique et industriel des Pays-Bas de plus de 5' + NN + '000 m², dessiné en 3D à partir du registre national des bâtiments' + C + ' stock, taille, âge et offre récente pour toute zone.',
    'A family office\'s private-markets programme, one ring per vintage: strategies, NAV and unfunded commitments, with the cash-flow J-curve and a forecast.':
      'Le programme de marchés privés d’un family office, un anneau par millésime' + C + ' stratégies, NAV et engagements non appelés, avec la courbe en J des flux et une prévision.',
    'Free public data that moves before eight companies report (Taiwanese supplier sales, car registrations, every US flight, refining margins): the expected quarter, its tailwinds and headwinds, and a record against a naive forecast.':
      'Des données publiques gratuites qui bougent avant les résultats de huit sociétés (ventes des fournisseurs taïwanais, immatriculations, chaque vol intérieur américain, marges de raffinage)' + C + ' le trimestre attendu, ce qui le porte et ce qui le freine, et un historique face à une prévision naïve.',
    'On building these tools — a design note <span class="arr">→</span>': 'Comment ces outils sont faits — une note <span class="arr">→</span>',
    'Built with Claude, outside work': 'Réalisé avec Claude, en dehors du travail',
    'Things I build with Claude outside work: an imaginary house, a piece of furniture and a small game. Each one runs in the browser.':
      'Ce que je construis avec Claude en dehors du travail' + C + ' une maison imaginaire, un meuble et un petit jeu. Tout fonctionne dans le navigateur.',
    '3D · Furniture': '3D · Mobilier',
    'Browser game': 'Jeu web',
    'A fictional stone farmhouse in Provence, modelled in 3D: x-ray every floor, pull the storeys apart and move the sun through the day.':
      'Un mas en pierre imaginaire en Provence, modélisé en 3D' + C + ' chaque étage aux rayons X, les niveaux écartés et le soleil qui tourne au fil de la journée.',
    'A fold-out home office in Swiss stone pine, rebuilt in 3D from six showroom photos.':
      'Un bureau dépliable en arolle, reconstitué en 3D à partir de six photos de showroom.',
    'A three-minute hoverbike ride at the edge of the day: hand-inked look, procedural world and sound, under 60 KB.':
      'Trois minutes en hoverbike à la tombée du jour' + C + ' rendu encré à la main, monde et son procéduraux, moins de 60' + NN + 'Ko.',
    'Get in touch<span class="dot">.</span>': 'Écrivez-moi<span class="dot">.</span>',
    'If you\'re working on something interesting in European private markets, I\'d like to hear about it.':
      'Si vous travaillez sur un projet intéressant dans les marchés privés européens, j’aimerais en entendre parler.',
    'Geneva': 'Genève',
    'Copy': 'Copier',
    'Copied': 'Copié',

    /* ---------------- design note ---------------- */
    '_title:AI Design Note · Tomaso Portunato': 'Note sur l’IA · Tomaso Portunato',
    'AI Design Note': 'Note sur l’IA',
    'Design note · 2026': 'Note de conception · 2026',
    'Design note': 'Note de conception',
    'How I use AI in these tools': 'Comment j’utilise l’IA dans ces outils',
    'Notes on where a model helps in investment work, and where I keep it out.':
      'Où un modèle aide dans le travail d’investissement, et où je le tiens à l’écart.',
    'Author': 'Auteur',
    'Context': 'Contexte',
    'Investment analyst, Geneva': 'Analyste en investissements, Genève',
    'Updated': 'Mise à jour',
    'November 2026': 'Novembre 2026',
    'Contents': 'Sommaire',
    'Where I start': 'Point de départ',
    'I built these tools in 2026, alongside my job as an investment analyst on a pan-European logistics fund. A few answer questions I\'m asked at work. The others came out of conversations with people across Geneva\'s finance community about the questions they keep coming back to. Each tool is built around one drawing instead of a table: what a listed company\'s own filings say about it, what the canton\'s records say about a Geneva parcel, who really owns an asset at the end of a chain of holding companies, how much logistics stock sits in a catchment, what a family\'s private-markets programme is worth and when it will be called, what public data says about a quarter before the company reports it.':
      'J’ai construit ces outils en 2026, en parallèle de mon poste d’analyste en investissements pour un fonds logistique paneuropéen. Quelques-uns répondent à des questions qu’on me pose au travail. Les autres sont nés de conversations avec des acteurs de la place financière genevoise, autour des questions qui reviennent sans cesse. Chaque outil repose sur un dessin plutôt que sur un tableau' + C + ' ce que disent d’une société cotée ses propres documents, ce que disent les registres du canton d’une parcelle genevoise, qui détient vraiment un actif au bout d’une chaîne de holdings, combien de surfaces logistiques compte une zone, ce que vaut le programme de marchés privés d’une famille et quand il sera appelé, ce que disent les données publiques d’un trimestre avant que la société ne publie.',
    'My rule for where AI goes is simple. If a step needs judgement, the analyst keeps it. If a step is mostly copying, reformatting or translating, a model can take the first pass, provided the result is quick to check against the source. In practice that means extraction and first drafts, and never the valuation call or the investment conclusion.':
      'Ma règle est simple. Si une étape demande du jugement, l’analyste la garde. Si elle consiste surtout à copier, remettre en forme ou traduire, un modèle peut faire un premier passage, à condition que le résultat se vérifie vite contre la source. En pratique, cela veut dire l’extraction et les premiers jets, jamais l’évaluation ni la conclusion d’investissement.',
    'The risk I worry about most is people using these models for work they couldn\'t do without them. The output reads well, so errors last longer than they should.':
      'Le risque qui m’inquiète le plus, c’est d’utiliser ces modèles pour un travail qu’on ne saurait pas faire sans eux. Le résultat se lit bien, alors les erreurs survivent plus longtemps qu’elles ne devraient.',
    'No tool calls a model while you use it, and none shows text a model would have written. The finance is computed in code from the underlying data: IRR from dated cash flows, effective ownership along the chain, segments that reconcile to the reported totals. The one place a model works is in building Dossier, where it reads company filings and every quote it returns is checked word for word against the filing before it can appear.':
      'Aucun outil n’appelle un modèle pendant que vous l’utilisez, et aucun n’affiche un texte qu’un modèle aurait écrit. La finance est calculée dans le code à partir des données' + C + ' TRI à partir de flux datés, détention effective le long de la chaîne, segments qui se réconcilient avec les totaux publiés. Le seul endroit où un modèle travaille, c’est la construction de Dossier' + C + ' il lit les documents des sociétés, et chaque citation qu’il rapporte est vérifiée mot pour mot contre le document avant de pouvoir apparaître.',
    'The other constraint is confidentiality. Fund data, tenant credit files and loan terms shouldn\'t go into a model unless the firm knows where that data is stored, whether it\'s retained, and who can see it. That\'s why everything here runs on public or illustrative data only.':
      'L’autre contrainte est la confidentialité. Les données d’un fonds, les dossiers de crédit des locataires et les conditions de prêt ne devraient pas passer par un modèle tant que la société ne sait pas où ces données sont stockées, si elles sont conservées et qui peut les voir. C’est pourquoi tout ici repose uniquement sur des données publiques ou illustratives.',
    'How to read the numbers': 'Comment lire les chiffres',
    'Every figure carries a small tag: SRC for a value taken from its source, CALC for one computed in code from real data, ILL for illustrative data made up for the demo. Click it to see the source, the date and how it was computed. Real data comes from public sources through nightly or periodic snapshots: the Dutch building register, the ECB and the SEC. The family office in Vintage and Lineage is fictional, and labelled so on screen.':
      'Chaque chiffre porte une petite étiquette' + C + ' SRC pour une valeur reprise de sa source, CALC pour une valeur calculée dans le code à partir de données réelles, ILL pour une donnée illustrative inventée pour la démonstration. Un clic montre la source, la date et le calcul. Les données réelles viennent de sources publiques, par instantanés nocturnes ou périodiques' + C + ' le registre néerlandais des bâtiments, la BCE et la SEC. Le family office de Vintage et de Lineage est fictif, et signalé comme tel à l’écran.',
    'A listed company\'s filings already say most of what an analyst wants: how it makes money, who owns it, how it is financed, who it depends on, and what it now warns about that it didn\'t last year. The trouble is that it\'s spread over thousands of documents.':
      'Les documents d’une société cotée disent déjà l’essentiel de ce que cherche un analyste' + C + ' comment elle gagne de l’argent, qui la détient, comment elle se finance, de qui elle dépend, et de quoi elle avertit aujourd’hui qu’elle ne mentionnait pas l’an dernier. Le problème, c’est que tout cela est dispersé dans des milliers de documents.',
    'Dossier draws NVIDIA, Tesla, Apple and Amazon as survey atlases of nine plates each: segments as an exploded stack, ownership rings, the board and pay, the debt maturity wall, a network of customers and suppliers, the share price with every filing on it, a redline of the risk factors year on year, and the company\'s physical footprint. Every figure links to the SEC filing it came from.':
      'Dossier dessine NVIDIA, Tesla, Apple et Amazon en atlas de neuf planches chacun' + C + ' les segments en pile éclatée, les anneaux de l’actionnariat, le conseil et les rémunérations, le mur des échéances de dette, le réseau de clients et de fournisseurs, le cours de l’action avec chaque dépôt, les facteurs de risque comparés d’une année à l’autre, et l’empreinte physique de la société. Chaque chiffre renvoie au document de la SEC dont il provient.',
    'This is the one place a model works. Customers, suppliers, related parties, covenants and risk changes sit in the text of the filings, so the AI coding assistant I build with read them during the build and wrote each fact with its verbatim quote. A script then rejects any quote that isn\'t word for word in the downloaded filing, and a claim that a risk is new has to agree with the year-on-year diff. 109 facts passed. The site itself never calls a model.':
      'C’est le seul endroit où un modèle travaille. Clients, fournisseurs, parties liées, covenants et évolution des risques se trouvent dans le texte des documents' + C + ' l’assistant de programmation IA avec lequel je construis les a donc lus pendant la construction et a noté chaque fait avec sa citation exacte. Un script rejette ensuite toute citation qui ne figure pas mot pour mot dans le document téléchargé, et un risque présenté comme nouveau doit correspondre à la comparaison d’une année à l’autre. 109 faits ont passé le contrôle. Le site lui-même n’appelle jamais de modèle.',
    'Geneva\'s planning data is public, but it\'s split across separate SITG layers: cadastre, zoning, building footprints, permits, PLQs, raising-the-roof potential and the OCEN heating index. Building a view of one parcel means opening each of them in turn.':
      'Les données d’aménagement de Genève sont publiques, mais réparties entre plusieurs couches du SITG' + C + ' cadastre, zones, emprises des bâtiments, autorisations, PLQ, potentiel de surélévation et indice de dépense de chaleur de l’OCEN. Se faire une idée d’une parcelle oblige à les ouvrir une à une.',
    'Parcelle opens on the Ville de Genève with every parcel drawn like a cadastral plan, queries those layers live from the canton\'s services and shows them together for each parcel, with a link to the official RDPPF extract and to any PLQ document. The scan tool screens a commune by zone, plot size and how much of the permitted volume is already built, leaves streets and other public land out, and exports the shortlist to CSV.':
      'Parcelle s’ouvre sur la Ville de Genève, chaque parcelle dessinée comme sur un plan cadastral, interroge ces couches en direct auprès des services du canton et les réunit pour chaque parcelle, avec un lien vers l’extrait RDPPF officiel et vers le PLQ éventuel. L’outil de recherche filtre une commune par zone, surface et part du volume autorisé déjà construite, écarte les routes et le domaine public, et exporte la sélection en CSV.',
    'Every figure shows where it came from. Where something is inferred, such as commune rent levels, it\'s labelled as such; figures that couldn\'t be traced to a source were taken out. The data tab tests every public source live. Owner identity is left out on purpose. There\'s no AI here: it\'s a screening tool, and deciding what a parcel is worth stays with the analyst.':
      'Chaque chiffre indique sa provenance. Ce qui est déduit, comme les niveaux de loyer par commune, est signalé comme tel' + NB + '; les chiffres sans source traçable ont été retirés. L’onglet des données teste chaque source publique en direct. L’identité des propriétaires est volontairement absente. Pas d’IA ici' + C + ' c’est un outil de tri, et décider de ce que vaut une parcelle reste le travail de l’analyste.',
    'Who actually owns an asset in a family structure is a product of percentages along a chain: a trust, a holding company, a subsidiary, an SPV. The org chart shows the boxes and leaves the multiplication to the reader.':
      'Qui détient vraiment un actif dans une structure familiale est un produit de pourcentages le long d’une chaîne' + C + ' un trust, une holding, une filiale, une SPV. L’organigramme montre les cases et laisse la multiplication au lecteur.',
    'Lineage draws a fictional Geneva family, the same one as in Vintage, as an engraved holding structure. Select any asset and its chain to the ultimate owners lights up, with each owner\'s effective share; select a person to see everything they have an interest in. Succession, a buy-out and a property sale can be run on top, separately or together.':
      'Lineage dessine une famille genevoise fictive, la même que dans Vintage, en structure de détention gravée. Choisissez un actif et sa chaîne jusqu’aux bénéficiaires finaux s’allume, avec la part effective de chacun' + NB + '; choisissez une personne pour voir tout ce dans quoi elle a un intérêt. Une succession, un rachat et la vente d’un bien peuvent s’y ajouter, séparément ou ensemble.',
    'The checks matter more than the drawing here. Effective shares along every path must sum to 100%, value must be conserved at every node, and after any scenario the family\'s wealth must equal what it was plus the explicit flows. Those hold across every scenario combination, tested in code.':
      'Ici, les contrôles comptent plus que le dessin. Les parts effectives le long de chaque chemin doivent faire 100' + NB + '%, la valeur doit se conserver à chaque nœud, et après tout scénario le patrimoine de la famille doit égaler ce qu’il était plus les flux explicites. Ces règles tiennent pour toutes les combinaisons de scénarios, testées dans le code.',
    'How much logistics stock sits around Venlo? The Dutch building register already holds the answer for every building, with its real outline and construction year.':
      'Combien de surfaces logistiques autour de Venlo' + NB + '? Le registre néerlandais des bâtiments a déjà la réponse pour chaque bâtiment, avec son contour réel et son année de construction.',
    'Corridor draws every building in the register of at least 5,000 m² with an industrial unit, 8,814 of them, extruded in 3D over a paper map of the Netherlands. Heights come from the national lidar survey where it can measure the roof, and are marked as assumed where it can\'t. Drop a catchment anywhere and the panel gives the count, total footprint, median size, age profile and the share built since 2015; scrub the years and watch the box boom of the 2000s and 2010s rise.':
      'Corridor dessine chaque bâtiment du registre d’au moins 5' + NN + '000 m² comprenant une unité industrielle, 8' + NN + '814 au total, extrudés en 3D sur une carte papier des Pays-Bas. Les hauteurs viennent du relevé lidar national quand il peut mesurer le toit, et sont signalées comme supposées sinon. Posez une zone n’importe où et le panneau donne le nombre, l’emprise totale, la taille médiane, la pyramide des âges et la part construite depuis 2015' + NB + '; faites défiler les années et regardez monter le boom des entrepôts des années 2000 et 2010.',
    'The hard part was deciding what not to count. The register\'s industrial use also covers farming, so 1,523 glasshouses are screened out using the national topographic map and the lidar roof height. Footprint is labelled footprint, not lettable area. There\'s no AI here: it\'s the register, drawn.':
      'Le plus difficile a été de décider quoi ne pas compter. L’usage industriel du registre couvre aussi l’agriculture' + C + ' 1' + NN + '523 serres sont donc écartées à l’aide de la carte topographique nationale et de la hauteur des toits mesurée par lidar. L’emprise est appelée emprise, pas surface locative. Pas d’IA ici' + C + ' c’est le registre, dessiné.',
    'A family office\'s private-markets programme is a set of commitments made over many years, each calling and returning cash on its own timetable. The usual report is a table, which tells you the totals and hides the shape.':
      'Le programme de marchés privés d’un family office est un ensemble d’engagements pris sur de nombreuses années, chacun appelant et rendant du capital à son propre rythme. Le rapport habituel est un tableau, qui donne les totaux et cache la forme.',
    'Vintage draws the programme of a fictional Geneva family like an orrery, the old clockwork model of the planets: one ring per vintage, one sector per strategy, each fund a planet sized to its NAV with a dashed ring for what is still to be called. Below it, the cumulative cash-flow tide shows the J-curve and a low, base and high forecast. Click a fund for its metrics, cash flows and look-through holdings.':
      'Vintage dessine le programme d’une famille genevoise fictive comme un planétaire, l’ancien modèle mécanique des planètes' + C + ' un anneau par millésime, un secteur par stratégie, chaque fonds une planète à la taille de sa NAV, avec un anneau pointillé pour ce qui reste à appeler. En dessous, la marée des flux cumulés montre la courbe en J et une prévision basse, centrale et haute. Un clic sur un fonds montre ses indicateurs, ses flux et ses participations sous-jacentes.',
    'The funds are illustrative, but nothing on the screen is typed in. IRR is computed from dated cash flows, TVPI is distributions plus NAV over paid-in, and the NAV roll-forward has to hold every quarter. Exchange rates are the real ECB fixes. Those identities are tested in code, because a sharp reader will check whether the IRR fits the multiple.':
      'Les fonds sont illustratifs, mais rien à l’écran n’est saisi à la main. Le TRI est calculé à partir de flux datés, le TVPI correspond aux distributions plus la NAV rapportées au capital versé, et la NAV doit se raccorder d’un trimestre à l’autre. Les taux de change sont les cours réels de la BCE. Ces identités sont testées dans le code, car un lecteur attentif vérifiera si le TRI colle au multiple.',
    'Hedge funds pay for data that shows a quarter before the company reports it. More of it is free and official than people think: Taiwanese suppliers publish their sales every month, the Dutch and German registers count every new car, the US government publishes every domestic flight, and the energy agency prices refined products every day.':
      'Les hedge funds paient pour des données qui révèlent un trimestre avant que la société ne publie. Une bonne partie est gratuite et officielle' + C + ' les fournisseurs taïwanais publient leurs ventes chaque mois, les registres néerlandais et allemand comptent chaque voiture neuve, le gouvernement américain publie chaque vol intérieur, et l’agence de l’énergie donne chaque jour le prix des produits raffinés.',
    'Signals collects that data for eight companies (NVIDIA, Apple, Tesla, Amazon, Delta, United, Valero and Marathon Petroleum), maps where it comes from, and turns it into a reading for the quarter in progress. Each reading is a walk-forward test: for every past quarter the model is fitted only on earlier quarters, given only the data that was public on that quarter\'s report day, and compared with a naive forecast, last quarter\'s growth. Each company page opens on the call: the figure expected for the quarter, which sources are running ahead of last quarter and which behind, and how well the method has done.':
      'Signals rassemble ces données pour huit sociétés (NVIDIA, Apple, Tesla, Amazon, Delta, United, Valero et Marathon Petroleum), montre d’où elles viennent et en tire une lecture du trimestre en cours. Chaque lecture est un test glissant' + C + ' pour chaque trimestre passé, le modèle n’est ajusté que sur les trimestres antérieurs, ne reçoit que les données publiques le jour de la publication, et il est comparé à une prévision naïve, la croissance du trimestre précédent. Chaque page de société s’ouvre sur la prévision' + C + ' le chiffre attendu pour le trimestre, les sources en avance ou en retard sur le trimestre précédent, et les résultats passés de la méthode.',
    'The record is the point. The refining margin works for Valero and Marathon, Taiwanese suppliers for Apple and, on a shorter record, European registrations for Tesla. For NVIDIA no free signal beats its own guidance plus its usual beat, and for Delta nothing beats the naive forecast; the app says so rather than show a number it can\'t stand behind. One idea I tested, that TSMC\'s sales lead NVIDIA\'s by a quarter, wasn\'t borne out and stays out of the model. There\'s no AI in the readings: every number is arithmetic on public data, checked against its source.':
      'Tout tient à l’historique. La marge de raffinage fonctionne pour Valero et Marathon, les fournisseurs taïwanais pour Apple et, sur un historique plus court, les immatriculations européennes pour Tesla. Pour NVIDIA, aucun signal gratuit ne bat ses propres prévisions plus son dépassement habituel, et pour Delta rien ne bat la prévision naïve' + NB + '; l’application le dit plutôt que d’afficher un chiffre qu’elle ne peut pas défendre. Une idée testée, selon laquelle les ventes de TSMC précéderaient celles de NVIDIA d’un trimestre, ne s’est pas vérifiée et reste hors du modèle. Pas d’IA dans les lectures' + C + ' chaque chiffre est un calcul sur des données publiques, vérifié contre sa source.',
    'If you work in investments, listed or private, and want to compare notes, I\'m at <a href="mailto:tportunato@gmail.com">tportunato@gmail.com</a>.':
      'Si vous travaillez dans l’investissement, coté ou non coté, et souhaitez échanger, écrivez-moi à <a href="mailto:tportunato@gmail.com">tportunato@gmail.com</a>.',
    'Back to portfolio': 'Retour au portfolio'
  };

  var norm = function (s) { return s.replace(/\s+/g, ' ').trim(); };
  var EN2FR = {}, ATTR = [], TITLE = {}, DESC = {};
  Object.keys(DICT).forEach(function (k) {
    if (k.indexOf('_title:') === 0) TITLE[k.slice(7)] = DICT[k];
    else if (k.indexOf('_desc:') === 0) DESC[k.slice(6)] = DICT[k];
    else if (k.charAt(0) === '#') ATTR.push([k, DICT[k][0], DICT[k][1]]);
    else EN2FR[norm(k)] = DICT[k];
  });

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var LANG = 'en', entries = null, pageTitle = document.title, metaDesc = document.querySelector('meta[name="description"]');
  var pageDesc = metaDesc ? metaDesc.getAttribute('content') : '';

  /* collect every translatable element once; re-run to pick up clones (the ticker duplicates itself) */
  function collect() {
    entries = entries || [];
    var seen = new Set(entries.map(function (e) { return e.el; }));
    ATTR.forEach(function (a) { var el = document.querySelector(a[0]); if (el && !seen.has(el)) { entries.push({ el: el, en: a[1], fr: a[2], text: true }); seen.add(el); } });
    var all = document.body.getElementsByTagName('*');
    for (var i = 0; i < all.length; i++) {
      var el = all[i];
      if (seen.has(el) || el.closest('script,style,svg,[data-no-i18n]')) continue;
      var h = norm(el.innerHTML);
      if (Object.prototype.hasOwnProperty.call(EN2FR, h)) { entries.push({ el: el, en: h, fr: EN2FR[h] }); seen.add(el); }
      else {
        for (var k in EN2FR) { if (EN2FR[k] === el.innerHTML && !seen.has(el)) { entries.push({ el: el, en: k, fr: EN2FR[k] }); seen.add(el); break; } }
      }
    }
  }

  var plain = function (html) { var d = document.createElement('div'); d.innerHTML = html; return d.textContent; };
  var visible = function (el) {
    var r = el.getBoundingClientRect();
    return r.width > 0 && r.height > 0 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth && getComputedStyle(el).visibility !== 'hidden';
  };
  var isBig = function (el) { return !!el.closest('h1, h2, .wipe-word, .doc-title'); };
  var GL = 'abcdefghijklmnopqrstuvwxyzéèàçôû', GU = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÉÈÀ';
  var rnd = function (c) { var up = c !== c.toLowerCase(); var g = up ? GU : GL; return g.charAt(Math.random() * g.length | 0); };

  /* body text: random letters that settle into the new text from left to right */
  function scramble(el, from, to, html) {
    var n = to.length, D = Math.max(420, Math.min(1000, 320 + n * 2.6)), lock = [], t0 = performance.now();
    for (var i = 0; i < n; i++) lock.push((i / n) * D * 0.7 + Math.random() * D * 0.3);
    el.setAttribute('aria-busy', 'true');
    (function step(now) {
      var t = now - t0, out = '';
      for (var j = 0; j < n; j++) {
        var c = to.charAt(j);
        if (t >= lock[j] || /[\s.,:;·—()\-→]/.test(c)) out += c;
        else out += (t < lock[j] * 0.35 && j < from.length && from.charAt(j) !== ' ') ? from.charAt(j) : rnd(c);
      }
      if (t < D) { el.textContent = out; requestAnimationFrame(step); }
      else { el.innerHTML = html; el.removeAttribute('aria-busy'); }
    })(t0);
  }

  /* headings: each letter flips over like a split-flap board */
  function flap(el, from, to, html) {
    var n = Math.max(from.length, to.length), frag = document.createDocumentFragment(), spans = [];
    el.setAttribute('aria-busy', 'true');
    for (var i = 0; i < n; i++) {
      var a = from.charAt(i) || '', b = to.charAt(i) || '';
      if (b === ' ' && (a === ' ' || !a)) { frag.appendChild(document.createTextNode(' ')); continue; }
      var s = document.createElement('span');
      s.style.display = 'inline-block'; s.style.whiteSpace = 'pre'; s.style.transformOrigin = '50% 55%'; s.style.backfaceVisibility = 'hidden';
      s.textContent = a === ' ' ? NB : (a || '');
      spans.push([s, b === ' ' ? NB : b, i]); frag.appendChild(s);
    }
    el.textContent = ''; el.appendChild(frag);
    var left = spans.length;
    if (!left) { el.innerHTML = html; el.removeAttribute('aria-busy'); return; }
    var stagger = Math.min(34, 520 / spans.length);
    spans.forEach(function (p) {
      var s = p[0], delay = p[2] * stagger;
      var a1 = s.animate([{ transform: 'perspective(500px) rotateX(0deg)' }, { transform: 'perspective(500px) rotateX(90deg)' }], { duration: 130, delay: delay, easing: 'cubic-bezier(.55,0,1,.45)', fill: 'forwards' });
      a1.onfinish = function () {
        s.textContent = p[1];
        var a2 = s.animate([{ transform: 'perspective(500px) rotateX(-90deg)' }, { transform: 'perspective(500px) rotateX(0deg)' }], { duration: 190, easing: 'cubic-bezier(0,.55,.45,1)', fill: 'forwards' });
        a2.onfinish = function () { if (--left === 0) { el.innerHTML = html; el.removeAttribute('aria-busy'); } };
      };
    });
  }

  function setLang(lang, animate) {
    if (lang === LANG && entries) return;
    LANG = lang; collect();
    document.documentElement.lang = lang;
    document.title = lang === 'fr' ? (TITLE[pageTitle] || pageTitle) : pageTitle;
    if (metaDesc) metaDesc.setAttribute('content', lang === 'fr' ? (DESC[pageDesc] || pageDesc) : pageDesc);
    entries.forEach(function (e) {
      var html = lang === 'fr' ? e.fr : e.en, cur = e.el.textContent;
      if (e.text) { // per-character split element (homepage eyebrow): animate as text, then hand back plain text
        if (animate && !reduced && visible(e.el)) scramble(e.el, cur, html, html); else e.el.textContent = html;
        return;
      }
      var to = plain(html);
      if (!animate || reduced || !visible(e.el)) { e.el.innerHTML = html; return; }
      (isBig(e.el) ? flap : scramble)(e.el, cur, to, html);
    });
    document.querySelectorAll('.lang-switch button').forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.lang === lang)); });
    try { localStorage.setItem('lang', lang); } catch (err) { /* private mode */ }
  }

  /* the switch itself: inside a [data-lang-switch] slot if the page has one, otherwise fixed top-right */
  var css = document.createElement('style');
  css.textContent =
    '.lang-switch{display:inline-flex;gap:0;font:500 10.5px/1 "DM Mono",ui-monospace,monospace;letter-spacing:.14em;border:1px solid currentColor;border-radius:999px;overflow:hidden}' +
    '.lang-switch button{all:unset;cursor:pointer;padding:7px 10px 6px;color:inherit;opacity:.55;transition:opacity .2s,background .2s,color .2s}' +
    '.lang-switch button:hover{opacity:1}' +
    '.lang-switch button[aria-pressed="true"]{opacity:1;background:currentColor}' +
    '.lang-switch{color:#0F2744}.lang-switch button[aria-pressed="true"] span{color:#fff}' +
    '.lang-switch button:focus-visible{outline:2px solid #D52B1E;outline-offset:-2px}' +
    '.lang-fixed{position:fixed;top:18px;right:20px;z-index:9000;color:#fff;mix-blend-mode:difference}' +
    '.lang-fixed button[aria-pressed="true"] span{color:#000}' +
    '@media (max-width:640px){.lang-fixed{top:12px;right:12px}}';
  document.head.appendChild(css);
  var sw = document.createElement('div');
  sw.className = 'lang-switch'; sw.setAttribute('role', 'group'); sw.setAttribute('aria-label', 'Language / Langue'); sw.setAttribute('data-no-i18n', '');
  sw.innerHTML = '<button type="button" data-lang="en" aria-pressed="true" lang="en"><span>EN</span></button><button type="button" data-lang="fr" aria-pressed="false" lang="fr"><span>FR</span></button>';
  var slot = document.querySelector('[data-lang-switch]');
  if (slot) slot.appendChild(sw); else { sw.classList.add('lang-fixed'); document.body.appendChild(sw); }
  sw.addEventListener('click', function (e) { var b = e.target.closest('button'); if (b) setLang(b.dataset.lang, true); });

  window.I18N = { t: function (en) { return LANG === 'fr' && EN2FR[norm(en)] ? plain(EN2FR[norm(en)]) : en; }, lang: function () { return LANG; }, set: setLang,
    _coverage: function () { collect(); var m = new Set(entries.map(function (e) { return e.en; })); return Object.keys(EN2FR).filter(function (k) { return !m.has(k); }); } };

  /* first paint: ?lang= wins, then the saved choice; applied before the page script splits or animates anything */
  var want = (location.search.match(/[?&]lang=(en|fr)\b/) || [])[1];
  if (!want) { try { want = localStorage.getItem('lang'); } catch (err) { want = null; } }
  if (want === 'fr') setLang('fr', false); else collect();
  /* pick up elements the page script creates later (ticker clones) */
  window.addEventListener('load', function () { collect(); if (LANG === 'fr') { LANG = 'en'; setLang('fr', false); } });
})();
