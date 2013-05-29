
// Create the Object Items
ObjectItem[] objectItems;

// Read the csv file
Table table;

// The file writer
PrintWriter output;



void setup() {
  setupObjectItems();

  setupTable();

  setupWriter();

  // Stops the program
  exit();
}



void setupObjectItems() {
  objectItems = new ObjectItem[33];
  //  for (int i=0; i<objectItems.length; i++) {
  //    objectItems[i] = new ObjectItem("l_group", "L Group", "The ...", "ordinary-chondirites");
  //  }
  
  int objectItemsCounter = 0;
  
  // NOT FOUND AT DATASET

  // type_1:
  //   name: 'Type 1'
  //   desc: 'Designates chondrites which have experienced a high degree of aqueous alteration. Most primary minerals have been replaced by secondary phases and chondrules are generally absent.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // type_2:
  //   name: 'Type 2'
  //   desc: 'Designates chondrites which are characterized by abundant hydrated minerals and abundant fine-grained matrix;  chondrules are present; sulfides are Ni-bearing.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // type_3:
  //   name: 'Type 3'
  //   desc: 'Designates chondrites that are characterized by abundant chondrules, low degrees of aqueous alteration, and unequilibrated mineral assemblages.  Many of the low-Ca pyroxene grains are monoclinic and exhibit polysynthetic twinning.  The type 3 chondrites may be divided into subtypes ranging from 3.00 (least metamorphosed) to 3.9 (nearly metamorphosed to type 4 levels).  If primary igneous glass occurs in the chondrules, it belongs to type 3.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // type_4:
  //   name: 'Type 4'
  //   desc: 'Designates chondrites that are characterized by abundant chondrules, and have been metamorphosed under conditions sufficient to homogenize olivine compositions and recrystallize fine-grained matrix.  Some of the low-Ca pyroxene grains may be monoclinic and exhibit polysynthetic twinning.  Primary igneous chondrule glass is absent.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // type_5:
  //   name: 'Type 5'
  //   desc: 'Designates chondrites that have been metamorphosed under conditions sufficient to homogenize olivine and pyroxene, convert all low-Ca pyroxene to orthopyroxene, cause the growth of various secondary minerals, and blur chondrule outlines.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // type_6:
  //   name: 'Type 6'
  //   desc: 'Designates chondrites that have been metamorphosed under conditions sufficient to homogenize all mineral compositions, convert all low-Ca pyroxene to orthopyroxene, coarsen secondary phases such as feldspar to sizes â¥50 Âµm, and obliterate many chondrule outlines; no melting has occurred.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // type_7:
  //   name: 'Type 7'
  //   desc: 'Designates chondrites which have been metamorphosed to nearly the point of melting. Minerals are equilibrated and chondrules are indistinct or absent. This term is not used consistently or widely accepted in the literature.'
  //   class: 'unknown'
  //   total: 0
  //   ids: []
  // anomalous:
  //   name: 'anomalous'
  //   desc: 'Designates meteorites that have been determined to be a member of a specific group, but have certain properties that are unusual or distinctive.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // kakangari_chondrite:
  //   name: 'Kakangari Chondrite'
  //   desc: 'A grouplet of chondrites with similarities to Kakangari, which do not fit into the major classes of chondrites such as carbonaceous, ordinary, or enstatite.'
  //   class: 'unknown'
  //   total: 0
  //   ids: []

  // MAJOR CLASSES

  // ordinary_chondrite:
  //   name: 'Ordinary Chondrite'
  //   desc: 'A major class of chondrites, distinguished by sub-solar Mg/Si and refractory/Si ratios, oxygen isotope compositions that plot above the terrestrial fractionation line, and a large volume percentage of chondrules, with only 10-15 vol% fine-grained matrix.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // carbonaceous_chondrite:
  //   name: 'Carbonaceous Chondrite'
  //   desc: 'A major class of chondrites that mostly have Mg/Si ratios near the solar value and oxygen isotope compositions that plot below the terrestrial fractionation line.'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // enstatite_chondrite:
  //   name: 'Enstatite Chondrite'
  //   desc: 'A major class of chondrites that mostly have sub-solar Mg/Si and refractory/Si ratios, oxygen isotope compositions that plot near the terrestrial fractionation line, and highly reduced mineral assemblages (containing little FeO, Si-bearing metal, and sulfides of elements normally considered lithophile).'
  //   class: 'iron'
  //   total: 0
  //   ids: []
  // stony_meteorite:
  //   name: 'Stony Meteorite'
  //   desc: 'unknown'
  //   class: 'iron'
  //   total: 0
  //   ids: []

  objectItems[objectItemsCounter] = new ObjectItem("l_group",
                                  "L Group",
                                  "The low-iron (L) chemical group of ordinary chondrites, distinguished by their relatively low siderophile element content, moderate sized chondrules (~0.7 mm), and oxygen isotope compositions that intermediate between H and LL group ordinary chondrites.",
                                  CLASS_ORDINARY_CHONDRITES);
  objectItemsCounter++;
  
  objectItems[objectItemsCounter] = new ObjectItem("h_group",
                                  "H Group",
                                  "The high-iron (H) chemical group of ordinary chondrites, distinguished by their high siderophile element content, relatively small chondrules (~0.3 mm), and oxygen isotope compositions that are closer to the terrestrial fractionation line than those of other ordinary chondrites.",
                                  CLASS_ORDINARY_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("ck_group",
                                  "CK Group",
                                  "The Karoonda (CK) chemical group of carbonaceous chondrites, distinguished by abundant fine-grained matrix (~75 vol%), mm-sized chondrules that lack igneous rims,  relatively few refractory inclusions, and a high degree of oxidation; most CK chondrites have been metamorphosed to type 4 or higher.",
                                  CLASS_ORDINARY_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("r_group",
                                  "R Group",
                                  "The Rumuruti (R) group of chondrites does not clearly belong to any of the major classes of chondrites (ordinary, carbonaceous, enstatite);  R chondrites have sub-solar Mg/Si and refractory/Si ratios, oxygen isotope compositions that plot above the terrestrial fractionation line and ordinary chondrites, and highly oxidized mineralogy.",
                                  CLASS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("cr_group",
                                  "CR Group",
                                  "The Renazzo (CR) chemical gorup of carbonaceous chondrites, distinguished by large, abundant porphyritic chondrules (0.7 mm, 50 vol%), many of which have igneous rims, few refractory inclusions, abundant metal (5-8 vol%), and fine-grained matrix that is commonly hydrated (up to 50 vol%).",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("acapulcoite_lodranite",
                                  "Acapulcoite-Lodranite",
                                  "Acapulcoites, named after the Acapulco, Mexico, fall of 1913, and lodranites, named after the Lodran, Pakistan, fall of 1868, are closely related, equigranular meteorites; acapulcoites are finer grained than lodranites and contain rare, relict chondrules, and there are transitional meteorites  between the two types (e.g., EET 84302, GRA 95209). Mineral assemblages are similar to, but distinct from those of ordinary chondrites. Compositions are subchondritic, with lodranites showing a higher degree of fractionation.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("achondrite",
                                  "Achondrite",
                                  "A stony meteorite that lacks chondrules and originated on a differentiated parent body.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("angrite",
                                  "Angrite",
                                  "Angrites, named after the Angra dos Reis, Brazil, fall of 1869, are a relatively rare type of basaltic achondrite with low alkali contents, high Ca/Al ratios, and a distinctive mineral assemblage, generally including Al-Ca-Ti-rich pyroxene, Ca-rich plagioclase, and Ca-rich olivine that may have exsolved the mineral kirschsteinite.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("aubrite",
                                  "Aubrite",
                                  "Aubrites, named after the Aubres, France, fall of 1836, are enstatite achondrites. Most are breccias (Shallowater being a notable exception) containing igneous and impact-melted clasts.  Like enstatite chondrites, aubrites have highly reduced mineralogy, but they probably do not come from the same parent asteroid as either EH or EL chondrites.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("brachinites",
                                  "Brachinite",
                                  "Brachinites, named after Brachina, a meteorite found in Australia in 1974, are olivine-rich achondrites that are relatively close to chondrites in many compositional properties, and so are frequently considered to be primitive achondrites. Their true origin is still an open question and not all brachinites may share the same origin.",
                                  CLASS_UNGROUPED);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("cb_group",
                                  "CB Group",
                                  "The Bencubbin-like (CB) association of carbonaceous chondrites.  The CBa subgroup is distinguished by cm-sized chondrule-like objects, abundant metal (>half the volume), no fine-grained matrix, and almost no refractory inclusions.  The CBb subgroup contains small chondrules (0.2 - 1 mm), abundant metal (~70 vol%), and some refractory inclusions.  It is uncertain whether any or all CB meteorites are true chondrites, as they may have formed slightly later in solar system history.",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("ch_group",
                                  "CH Group",
                                  "The high-metal (CH) chemical group of carbonaceous chondrites, similar to Allan Hills 85085; CH chondrites have tiny chondrules and refractory inclusions (~0.02 mm), abundant metal (~20 vol%), no fine-grained matrix except as xenolithic clasts, and rare sulfides consistent with overall low volatile element contents.  It is uncertain whether members of the group are true chondrites, as they may have formed slightly later in solar system history.",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("chondrite",
                                  "Chondrite",
                                  "A primitive meteorite, usually bearing chondrules, that has not experienced igneous differentiation on its parent body.",
                                  CLASS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("ci_group",
                                  "CI Group",
                                  "The Ivuna (CI) chemical group of carbonaceous chondrites, distinguished by the complete absence of chondrules and refractory inclusions, and high degree of hydration.",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("cm_group",
                                  "CM Group",
                                  "The Mighei (CM) chemical group of carbonaceous chondrites, distinguished by small chondrules and refractory inclusions (0.3 mm), abundant fine-grained matrix (~70 vol%), and abundant hydrated minerals.",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("co_group",
                                  "CO Group",
                                  "The Ornans (CO) chemical group of carbonaceous chondrites, distinguished by small chondrules and refractory inclusions (",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("cv_group",
                                  "CV Group",
                                  "The Vigarano (CV) chemical group of carbonaceous chondrites, distinguished by large (mm-sized) chondrules, many of which are surrounded by igneous rims, large refractory inclusions and abundant matrix (40 vol%); CV chondrites may be divided into oxidized and reduced subgroups.",
                                  CLASS_CARBONACEOUS_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("diogenite",
                                  "Diogenite",
                                  "Diogenites are an abundant type of achondrite, linked by geochemical traits such as oxygen isotopic ratios and certain elemental ratios, of which Fe/Mn is the most widely cited. The dominant mineral in diogenites is orthopyroxene. The diogenites are strongly linked with two other achondrite groups: eucrites and howardites; the three groups are collectively known as HED meteorites and may come from asteroid 4 Vesta.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("eh_group",
                                  "EH Group",
                                  "The high-iron (EH) chemical group of enstatite chondrites, distinguished by small chondrules (0.2 mm), abundant metal (~10 vol%) that is rich in Si (~3 wt%), and an extremely reduced mineral assemblage including niningerite (MgS) and perryite (Fe-Ni silicide).",
                                  CLASS_ENSTATITE_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("el_roup",
                                  "EL Group",
                                  "The low-iron (EL) chemical group of enstatite chondrites, distinguished by moderately large chondrules (0.6 mm), abundant metal (~10 vol%) that is Si-bearing (~1 wt%), and an extremely reduced mineral assemblage containing ferroan alabandite ((Fe,Mn)S).",
                                  CLASS_ENSTATITE_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("eucrites",
                                  "Eucrites",
                                  "Eucrites are the most abundant type of basaltic achondrite, linked by geochemical traits such as oxygen isotopic ratios and certain elemental ratios, of which Fe/Mn is the most widely cited. The main minerals in eucrites are Fe-rich pyroxene and Na-poor plagioclase. The eucrites are strongly linked with the diogenites and howardites; the three groups are collectively known as HED meteorites and may come from asteroid 4 Vesta.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("howardite",
                                  "Howardite",
                                  "Howardites are an abundant group of polymict-breccia achondrites that appear to represent mixtures of eucrites + diogenites (these three linked groups are collectively known as HED meteorites and may come from asteroid 4 Vesta). The main minerals in howardites are pyroxene (largely orthopyroxene) and Na-poor plagioclase. A minority of howardites are rich in solar-wind noble gases and thus inferred to be regolith breccias.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("iron_meteorite",
                                  "Iron Meteorite",
                                  "A meteorite that is dominantly composed of Fe-Ni metal and that crystallized from a melt.",
                                  CLASS_IRON);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("ll_group",
                                  "LL Group",
                                  "The low-iron, low metal (LL) chemical group of ordinary chondrites, distinguished by their low siderophile element content, fairly large chondrules (~0.9 mm), and oxygen isotope compositions that are further above the terrestrial fractionation line than those of other ordinary chondrites.",
                                  CLASS_ORDINARY_CHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("lunar_meteorites",
                                  "Lunar Meteorites",
                                  "Lunar meteorites are lunar rocks that were ejected from the Moon by impacts and later fell to the Earth as meteorites.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("martian_meteorites",
                                  "Martian Meteorites",
                                  "Martian meteorites are martian rocks that were ejected from Mars by impacts and later fell to the Earth as meteorites. Three well-known types are shergottites (basaltic to lherzolitic igneous rocks, named after the Shergotty, India, fall of 1865), nakhlites (clinopyroxenites or wehrlites, formed as cumulate rocks, and named after the Nakhla, Egypt, fall of 1911), and chassignites (dunitic cumulate rocks named after the Chassigny, France, fall of 1815).",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("mesosiderite",
                                  "Mesosiderite",
                                  "A brecciated meteorite containing subequal silicate and metallic components; the silicates are dominantly igneous rock fragments.",
                                  CLASS_STONY_IRON);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("Pallasite",
                                  "Pallasite",
                                  "A meteorite that is a mixture of metal and silicates (usually olivine grains).",
                                  CLASS_STONY_IRON);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("primitive_achondrite",
                                  "Primitive Achondrite",
                                  "A meteorite that has lost its chondritic texture due to heating and partial melting, but still has nearly chondritic composition.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("relict_meteorite",
                                  "Relict Meteorite",
                                  "A highly altered object that may have a meteoritic origin. These are dominantly (>95%) composed of secondary minerals formed on the body on which the object was found.",
                                  CLASS_UNGROUPED);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("ungrouped",
                                  "Ungrouped",
                                  "Describes meteorites which have been well-enough characterized to determine that they do not fit into any of the established groups.",
                                  CLASS_UNGROUPED);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("ureilite",
                                  "Ureilite",
                                  "Ureilites, named after the Novo-Urei, Russia, fall of 1886, are ultramafic achondrites that contain interstitial carbon as graphite or diamond.  The majority consist of olivine + uninverted pigeonite.  In a few, the pyroxene is augite and/or orthopyroxene instead. In addition, about 10% of ureilites are polymict breccias, containing a few percent of feldspathic material in addition to typical ureilitic components.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;

  objectItems[objectItemsCounter] = new ObjectItem("winonaite",
                                  "Winonaite",
                                  "Winonaites, named after the Winona, Arizona, find of 1928, are equigranular rocks, some of which may contain relict chondrules, that have mineralogy and composition that are similar to chondrites.The mineral assemblage is more reduced than that of H chondrites.  Winonaites are related to the silicate inclusions found in IAB complex irons.",
                                  CLASS_ACHONDRITES);
  objectItemsCounter++;
}



void setupTable() {
  // You need to copy the csv file to the data directory.
  table = loadTable("meteorites.csv", "header");
  int totalItems = table.getRowCount();
  //println("--> Total Rows: " + totalItems);
  // Loop the csv file
  for (int i=0; i<totalItems; i++) {
    String recclass = table.getString(i, "recclass");
    println("["+i+"] recclass = " + recclass);
  }
}



void setupWriter() {
  // Create a new file in the sketch directory
  output = createWriter("classification.js"); 
  println("--> Create File Ready");

  // Write data to the file
  output.println("# THIS FILE IS GENERATED BY THE \"CreateClassificationScript\" PROCESSING APP");
  output.println("");

  output.println("classification =");
  for (int i=0; i<objectItems.length; i++) {
    writeObjectItem(output, objectItems[i]);
  }
  output.println("");

  // create a small helper script for debugging....
  output.println("# Loop the classification object");
  output.println("# Used for debugging stuff...");
  output.println("# for i of classification");
  output.println("#   o = classification[i]");
  output.println("#   console.log 'name: ' + o.name");
  output.println("#   console.log 'desc: ' + o.desc");
  output.println("");

  // Writes the remaining data to the file
  output.flush();
  // Finishes the file
  output.close();
  println("--> File Writer Ready");
}
