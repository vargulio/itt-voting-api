const express = require('express');
const app = express();
const mongoose = require('mongoose');
const Parties = require('./party.model');
const Users = require('./user.model');
const Sessions = require('./session.model');
const Results = require('./results.model');

const bodyParser = require('body-parser');

mongoose.connect('mongodb+srv://admin:admin@cluster0.m5cjunj.mongodb.net/voting_db?retryWrites=true&w=majority').then(res => {
  console.log('connected to mongo');

  // Parties.create([
  //   {
  //     "name": "Astelin",
  //     "slogan": "repurpose integrated markets",
  //     "picture": "Graphic Interface",
  //     "leader": "Edgar Palfreeman",
  //     "agitation": "Division of Thyroid Gland Isthmus, Open Approach"
  //   },
  //   {
  //     "name": "Metoclopramide",
  //     "slogan": "whiteboard value-added convergence",
  //     "picture": "strategy",
  //     "leader": "Florenza MacCarrick",
  //     "agitation": "Supplement Left Toe Phalanx with Nonaut Sub, Open Approach"
  //   },
  //   {
  //     "name": "SWEETGUM POLLEN",
  //     "slogan": "aggregate granular deliverables",
  //     "picture": "actuating",
  //     "leader": "Marylin Orbine",
  //     "agitation": "Restriction of Right Hand Vein, Percutaneous Approach"
  //   },
  //   {
  //     "name": "Lyrica",
  //     "slogan": "aggregate revolutionary infomediaries",
  //     "picture": "4th generation",
  //     "leader": "Archibold Ough",
  //     "agitation": "Drainage of Bilateral Ureters with Drain Dev, Via Opening"
  //   },
  //   {
  //     "name": "Daytime Cold and Flu Relief",
  //     "slogan": "streamline value-added communities",
  //     "picture": "Ergonomic",
  //     "leader": "Marcy Povlsen",
  //     "agitation": "Insertion of Int Fix into Sacrum, Perc Approach"
  //   },
  //   {
  //     "name": "Good Neighbor Pharmacy",
  //     "slogan": "engage viral synergies",
  //     "picture": "24 hour",
  //     "leader": "Rachael Debnam",
  //     "agitation": "Replacement of Left Testis with Synth Sub, Open Approach"
  //   },
  //   {
  //     "name": "PRAVASTATIN SODIUM",
  //     "slogan": "transition open-source deliverables",
  //     "picture": "capability",
  //     "leader": "Mathias Ilbert",
  //     "agitation": "Magnetic Resonance Imaging (MRI) of Bi Up Extrem Vein"
  //   },
  //   {
  //     "name": "Leader Childrens Pain and Fever",
  //     "slogan": "scale best-of-breed synergies",
  //     "picture": "human-resource",
  //     "leader": "Georgie Jiracek",
  //     "agitation": "Drainage of Right Toe Phalanx, Open Approach, Diagnostic"
  //   },
  //   {
  //     "name": "Cimzia",
  //     "slogan": "e-enable revolutionary e-services",
  //     "picture": "knowledge base",
  //     "leader": "Belinda Yoakley",
  //     "agitation": "Restriction of Descending Colon, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Cold-EEZE",
  //     "slogan": "seize viral synergies",
  //     "picture": "needs-based",
  //     "leader": "Sig Endon",
  //     "agitation": "Restrict Int Mamm, L Lymph w Extralum Dev, Perc"
  //   },
  //   {
  //     "name": "LISINOPRIL AND HYDROCHLOROTHIAZIDE",
  //     "slogan": "reinvent wireless e-business",
  //     "picture": "Synergistic",
  //     "leader": "Jock Loudon",
  //     "agitation": "Bypass Stomach to Trans Colon with Autol Sub, Open Approach"
  //   },
  //   {
  //     "name": "Daytime Multi-Symptom Cold Relief",
  //     "slogan": "morph collaborative infrastructures",
  //     "picture": "fresh-thinking",
  //     "leader": "Isabel Bernon",
  //     "agitation": "LDR Brachytherapy of Bladder using Oth Isotope"
  //   },
  //   {
  //     "name": "Potassium Chloride",
  //     "slogan": "reinvent holistic infrastructures",
  //     "picture": "non-volatile",
  //     "leader": "Michele Pringley",
  //     "agitation": "Supplement Left Trunk Muscle with Nonaut Sub, Open Approach"
  //   },
  //   {
  //     "name": "CoTZ SPF 58",
  //     "slogan": "integrate value-added metrics",
  //     "picture": "optimizing",
  //     "leader": "Zaria Quince",
  //     "agitation": "Drainage of R Knee Bursa/Lig with Drain Dev, Perc Approach"
  //   },
  //   {
  //     "name": "Pulmo Tartarus 6/8",
  //     "slogan": "productize vertical mindshare",
  //     "picture": "groupware",
  //     "leader": "Fernandina Bradd",
  //     "agitation": "Transfer Left Wrist Bursa and Ligament, Open Approach"
  //   },
  //   {
  //     "name": "Stemphylium",
  //     "slogan": "aggregate distributed supply-chains",
  //     "picture": "Configurable",
  //     "leader": "Opalina Bendan",
  //     "agitation": "Division of Right Metacarpal, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Duck Feathers",
  //     "slogan": "cultivate next-generation users",
  //     "picture": "Assimilated",
  //     "leader": "Selia Naptine",
  //     "agitation": "Replace of R Zygomatic Bone with Nonaut Sub, Perc Approach"
  //   },
  //   {
  //     "name": "HAND SANITIZING",
  //     "slogan": "enhance collaborative vortals",
  //     "picture": "capacity",
  //     "leader": "Felike Guilloud",
  //     "agitation": "Drainage of Right Hepatic Duct with Drain Dev, Perc Approach"
  //   },
  //   {
  //     "name": "Levothyroxine Sodium",
  //     "slogan": "unleash synergistic markets",
  //     "picture": "open system",
  //     "leader": "Valaria Torresi",
  //     "agitation": "Removal of Other Device from Head, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Meloxicam",
  //     "slogan": "reinvent world-class technologies",
  //     "picture": "system-worthy",
  //     "leader": "Valida Disbrey",
  //     "agitation": "Fusion of Left Carpal Joint with Int Fix, Open Approach"
  //   },
  //   {
  //     "name": "Estradiol Valerate",
  //     "slogan": "envisioneer value-added experiences",
  //     "picture": "access",
  //     "leader": "Alon Shepley",
  //     "agitation": "Insertion of Spacer into R Metacarpocarp Jt, Perc Approach"
  //   },
  //   {
  //     "name": "Diltiazem Hydrochloride",
  //     "slogan": "repurpose dot-com e-tailers",
  //     "picture": "service-desk",
  //     "leader": "Haslett Ratley",
  //     "agitation": "Bypass Right Lacrimal Duct to Nasal Cavity, Open Approach"
  //   },
  //   {
  //     "name": "Natures Gate",
  //     "slogan": "reinvent one-to-one technologies",
  //     "picture": "asynchronous",
  //     "leader": "Greggory Richen",
  //     "agitation": "Introduction of Nutritional Substance into Lower GI, Endo"
  //   },
  //   {
  //     "name": "Lactated Ringers",
  //     "slogan": "architect sexy interfaces",
  //     "picture": "Compatible",
  //     "leader": "Gib Neat",
  //     "agitation": "Supplement Ampulla of Vater with Autol Sub, Perc Approach"
  //   },
  //   {
  //     "name": "Fentanyl Citrate",
  //     "slogan": "incubate cutting-edge e-markets",
  //     "picture": "executive",
  //     "leader": "Josefa Andress",
  //     "agitation": "Excision of Left Foot, Percutaneous Approach"
  //   },
  //   {
  //     "name": "XtraCare Foaming Facial Cleanser",
  //     "slogan": "envisioneer innovative solutions",
  //     "picture": "bottom-line",
  //     "leader": "Ranice Blockey",
  //     "agitation": "Drainage of Thymus, Open Approach, Diagnostic"
  //   },
  //   {
  //     "name": "Cacao Bean",
  //     "slogan": "implement magnetic e-business",
  //     "picture": "stable",
  //     "leader": "Conn Dillingstone",
  //     "agitation": "Supplement R Low Arm Subcu/Fascia w Autol Sub, Perc"
  //   },
  //   {
  //     "name": "bareMinerals 5-in-1 BB Advanced Performance Eyeshadow Broad Spectrum SPF 15",
  //     "slogan": "implement cross-media channels",
  //     "picture": "algorithm",
  //     "leader": "Winona Alenichicov",
  //     "agitation": "Extirpation of Matter from Mid Colic Art, Perc Endo Approach"
  //   },
  //   {
  //     "name": "miconazole 1",
  //     "slogan": "extend one-to-one e-business",
  //     "picture": "Reverse-engineered",
  //     "leader": "Stan MacAscaidh",
  //     "agitation": "Replacement of R Ext Ear with Autol Sub, Extern Approach"
  //   },
  //   {
  //     "name": "hydrocortisone acetate pramoxine HCl",
  //     "slogan": "exploit robust users",
  //     "picture": "infrastructure",
  //     "leader": "Winonah Lozano",
  //     "agitation": "Reposition Lingula Bronchus, Open Approach"
  //   },
  //   {
  //     "name": "Alendronate Sodium",
  //     "slogan": "synthesize killer schemas",
  //     "picture": "Universal",
  //     "leader": "Loleta Runge",
  //     "agitation": "Remove Radioact Elem from Up Extrem Subcu/Fascia, Extern"
  //   },
  //   {
  //     "name": "Cryogel Island Rain Natural Pain Relieving",
  //     "slogan": "unleash seamless deliverables",
  //     "picture": "Cloned",
  //     "leader": "Felizio Bradley",
  //     "agitation": "Excision of Lumbar Vertebra, Percutaneous Approach"
  //   },
  //   {
  //     "name": "California Black Oak",
  //     "slogan": "e-enable value-added e-services",
  //     "picture": "hybrid",
  //     "leader": "Olva Ducker",
  //     "agitation": "Removal of Monitoring Device from Low Art, Perc Approach"
  //   },
  //   {
  //     "name": "Sinusin",
  //     "slogan": "repurpose strategic web services",
  //     "picture": "Customer-focused",
  //     "leader": "Zelig Fesby",
  //     "agitation": "Drainage of Urethra with Drainage Device, Perc Approach"
  //   },
  //   {
  //     "name": "GAVISCON",
  //     "slogan": "expedite integrated e-tailers",
  //     "picture": "architecture",
  //     "leader": "Nettie Penny",
  //     "agitation": "Removal of Radioactive Element from GI Tract, Endo"
  //   },
  //   {
  //     "name": "Ice External Analgesic",
  //     "slogan": "e-enable innovative vortals",
  //     "picture": "Virtual",
  //     "leader": "Gerri Mundwell",
  //     "agitation": "Drainage of Left Sphenoid Bone, Perc Endo Approach, Diagn"
  //   },
  //   {
  //     "name": "FRESH JUICE C",
  //     "slogan": "maximize bleeding-edge convergence",
  //     "picture": "Seamless",
  //     "leader": "Boris Shipton",
  //     "agitation": "Reposition Left Sternoclavicular Joint, Perc Approach"
  //   },
  //   {
  //     "name": "Indomethacin",
  //     "slogan": "deploy proactive platforms",
  //     "picture": "User-centric",
  //     "leader": "Cathie Summerson",
  //     "agitation": "Destruction of Right Neck Muscle, Open Approach"
  //   },
  //   {
  //     "name": "Marcaine",
  //     "slogan": "morph ubiquitous infomediaries",
  //     "picture": "homogeneous",
  //     "leader": "Eleonore Borland",
  //     "agitation": "Dilate R Com Iliac Art, Bifurc, w 2 Intralum Dev, Open"
  //   },
  //   {
  //     "name": "Olive Leaf Antibacterial Foaming Hand Wash",
  //     "slogan": "seize one-to-one web-readiness",
  //     "picture": "grid-enabled",
  //     "leader": "Alec Kamen",
  //     "agitation": "Replacement of L Humeral Head with Synth Sub, Perc Approach"
  //   },
  //   {
  //     "name": "Lady Speed Stick",
  //     "slogan": "streamline transparent partnerships",
  //     "picture": "homogeneous",
  //     "leader": "Lek Gaffer",
  //     "agitation": "Release Right Seminal Vesicle, Percutaneous Approach"
  //   },
  //   {
  //     "name": "PANADOL",
  //     "slogan": "whiteboard impactful markets",
  //     "picture": "Fundamental",
  //     "leader": "Barrett Robiot",
  //     "agitation": "Bypass Ileum to Sigmoid Colon, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Lidocaine Hydrochloride and Epinephrine",
  //     "slogan": "harness front-end schemas",
  //     "picture": "Pre-emptive",
  //     "leader": "Kale Hunnicot",
  //     "agitation": "Contact Radiation of Jejunum"
  //   },
  //   {
  //     "name": "Omeprazole",
  //     "slogan": "empower impactful solutions",
  //     "picture": "4th generation",
  //     "leader": "Thom Raith",
  //     "agitation": "Excision of Left Ear Skin, External Approach, Diagnostic"
  //   },
  //   {
  //     "name": "tussin dm",
  //     "slogan": "utilize robust methodologies",
  //     "picture": "Programmable",
  //     "leader": "Bridgette Callander",
  //     "agitation": "Bypass Left Ventricle to L Int Mammary, Open Approach"
  //   },
  //   {
  //     "name": "Topcare Pain Relieving 40ct",
  //     "slogan": "embrace compelling portals",
  //     "picture": "Sharable",
  //     "leader": "Jere Tomaszewski",
  //     "agitation": "Replace of L Metatarsal with Synth Sub, Perc Endo Approach"
  //   },
  //   {
  //     "name": "West Cottonwood",
  //     "slogan": "mesh transparent e-services",
  //     "picture": "encryption",
  //     "leader": "Everard Woolway",
  //     "agitation": "Transfer Left Upper Leg Muscle with Subcu, Open Approach"
  //   },
  //   {
  //     "name": "Topcare Mucus Relief",
  //     "slogan": "innovate proactive portals",
  //     "picture": "Open-source",
  //     "leader": "Delia McDugal",
  //     "agitation": "Removal of Monitor Dev from Low Intest Tract, Perc Approach"
  //   },
  //   {
  //     "name": "German Cockroach",
  //     "slogan": "revolutionize cutting-edge communities",
  //     "picture": "Team-oriented",
  //     "leader": "Devland Collington",
  //     "agitation": "Dilate L Axilla Art, Bifurc, w Intralum Dev, Perc Endo"
  //   },
  //   {
  //     "name": "Toxodetox",
  //     "slogan": "enhance B2C synergies",
  //     "picture": "Distributed",
  //     "leader": "Torrence Aguirre",
  //     "agitation": "Replacement of Tongue with Autol Sub, Extern Approach"
  //   },
  //   {
  //     "name": "Prochlorperazine Maleate",
  //     "slogan": "whiteboard impactful synergies",
  //     "picture": "intranet",
  //     "leader": "Connor Spilisy",
  //     "agitation": "Destruction of Right Middle Lung Lobe, Open Approach"
  //   },
  //   {
  //     "name": "Assured Vaporizing Chest Rub",
  //     "slogan": "envisioneer cutting-edge interfaces",
  //     "picture": "Programmable",
  //     "leader": "Reginauld Monson",
  //     "agitation": "Revision of Autol Sub in R Patella, Open Approach"
  //   },
  //   {
  //     "name": "Ceftriaxone Sodium",
  //     "slogan": "optimize granular applications",
  //     "picture": "eco-centric",
  //     "leader": "Alwin Thunnercliff",
  //     "agitation": "Revision of Int Fix in R Humeral Shaft, Extern Approach"
  //   },
  //   {
  //     "name": "DIFFERIN",
  //     "slogan": "scale impactful ROI",
  //     "picture": "discrete",
  //     "leader": "Brear Geraldini",
  //     "agitation": "Wound Mgmt Trmt Integu Body w Electrotherap Equip"
  //   },
  //   {
  //     "name": "Kids Cough and Fever Relief",
  //     "slogan": "seize seamless initiatives",
  //     "picture": "matrices",
  //     "leader": "Grady Wallach",
  //     "agitation": "Dilation of L Axilla Vein with Intralum Dev, Open Approach"
  //   },
  //   {
  //     "name": "SENSORCAINE",
  //     "slogan": "visualize rich networks",
  //     "picture": "Function-based",
  //     "leader": "Sherri Grayshan",
  //     "agitation": "Insertion of Other Device into L Knee, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Bullfrog Surfer",
  //     "slogan": "incubate sexy networks",
  //     "picture": "Business-focused",
  //     "leader": "Orella Missenden",
  //     "agitation": "Remove Infusion Dev from R Metacarpocarp Jt, Perc"
  //   },
  //   {
  //     "name": "OMNI",
  //     "slogan": "embrace end-to-end content",
  //     "picture": "radical",
  //     "leader": "Dallas Tuppeny",
  //     "agitation": "Repair Para-aortic Body, Percutaneous Approach"
  //   },
  //   {
  //     "name": "Alprazolam",
  //     "slogan": "integrate vertical ROI",
  //     "picture": "contingency",
  //     "leader": "Lori Craxford",
  //     "agitation": "Dilate Abd Aorta, Bifurc, w 3 Intralum Dev, Perc"
  //   },
  //   {
  //     "name": "Hydrocodone Bitartrate and Acetaminophen",
  //     "slogan": "maximize one-to-one systems",
  //     "picture": "reciprocal",
  //     "leader": "Vinny Caldroni",
  //     "agitation": "Drainage of Accessory Sinus with Drain Dev, Perc Approach"
  //   },
  //   {
  //     "name": "Black Rice Platinum Absolute Youth SPF 15",
  //     "slogan": "productize B2C architectures",
  //     "picture": "Synergized",
  //     "leader": "Weber Sevin",
  //     "agitation": "Repair Right Ureter, Via Natural or Artificial Opening"
  //   },
  //   {
  //     "name": "Budpak Diaper Rash",
  //     "slogan": "engineer B2B platforms",
  //     "picture": "upward-trending",
  //     "leader": "Leilah Waber",
  //     "agitation": "Reposition Right Renal Artery, Perc Endo Approach"
  //   },
  //   {
  //     "name": "CEFTIN",
  //     "slogan": "revolutionize open-source initiatives",
  //     "picture": "encompassing",
  //     "leader": "Katie Ackeroyd",
  //     "agitation": "Replacement of R Scapula with Nonaut Sub, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Up and Up Mucus Relief",
  //     "slogan": "exploit innovative users",
  //     "picture": "bottom-line",
  //     "leader": "Georgi Mandy",
  //     "agitation": "Excision of Lower Jaw, Percutaneous Approach, Diagnostic"
  //   },
  //   {
  //     "name": "Tramadol Hydrchloride",
  //     "slogan": "visualize collaborative metrics",
  //     "picture": "Intuitive",
  //     "leader": "Timofei Tipping",
  //     "agitation": "Drainage of Upper Tooth, External Approach, All"
  //   },
  //   {
  //     "name": "Neutrogena Ultra Sheer Dry Touch",
  //     "slogan": "envisioneer real-time interfaces",
  //     "picture": "reciprocal",
  //     "leader": "Faythe Hawksley",
  //     "agitation": "Repair Left Main Bronchus, Endo"
  //   },
  //   {
  //     "name": "Famotidine",
  //     "slogan": "maximize synergistic action-items",
  //     "picture": "Integrated",
  //     "leader": "Celia Luby",
  //     "agitation": "Remove Drain Dev from Head & Neck Subcu/Fascia, Perc"
  //   },
  //   {
  //     "name": "Diltiazem Hydrochloride",
  //     "slogan": "transform ubiquitous e-business",
  //     "picture": "algorithm",
  //     "leader": "Salvidor Eggleston",
  //     "agitation": "Measure of Peripheral Nervous Electr Activity, Perc Approach"
  //   },
  //   {
  //     "name": "Anti-Aging Vitamin Complex 7-in-1 Broad Spectrum SPF15 Sunscreen",
  //     "slogan": "envisioneer proactive web-readiness",
  //     "picture": "Optional",
  //     "leader": "Nikkie Syddall",
  //     "agitation": "Change Other Device in Up Intest Tract, Extern Approach"
  //   },
  //   {
  //     "name": "Stavudine",
  //     "slogan": "harness user-centric technologies",
  //     "picture": "capability",
  //     "leader": "Xena Streeten",
  //     "agitation": "Repair Abdominal Wall, External Approach"
  //   },
  //   {
  //     "name": "MoReturn Hair",
  //     "slogan": "grow 24/7 models",
  //     "picture": "Universal",
  //     "leader": "Paige Rickersy",
  //     "agitation": "Computerized Tomography (CT Scan) of Left Forearm"
  //   },
  //   {
  //     "name": "Alternaria alternata",
  //     "slogan": "envisioneer plug-and-play convergence",
  //     "picture": "complexity",
  //     "leader": "Griswold Rickerby",
  //     "agitation": "Insertion of Intralum Dev into L Com Carotid, Open Approach"
  //   },
  //   {
  //     "name": "NoHist DM",
  //     "slogan": "productize revolutionary content",
  //     "picture": "intangible",
  //     "leader": "Elliot Buzek",
  //     "agitation": "Drain of R Knee Bursa/Lig with Drain Dev, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Severe Cold Multi-Symptom",
  //     "slogan": "scale vertical content",
  //     "picture": "parallelism",
  //     "leader": "Crissy Kidston",
  //     "agitation": "Revision of Drain Dev in R Metatarsotars Jt, Extern Approach"
  //   },
  //   {
  //     "name": "Olanzapine",
  //     "slogan": "grow sticky e-business",
  //     "picture": "Automated",
  //     "leader": "Amerigo Stockman",
  //     "agitation": "Revision of Nonaut Sub in Fallopian Tube, Extern Approach"
  //   },
  //   {
  //     "name": "BC",
  //     "slogan": "drive sticky web-readiness",
  //     "picture": "incremental",
  //     "leader": "Dannye O'Carmody",
  //     "agitation": "Introduce Oth Antineoplastic in Periton Cav, Via Opening"
  //   },
  //   {
  //     "name": "Thiamine",
  //     "slogan": "iterate open-source eyeballs",
  //     "picture": "functionalities",
  //     "leader": "Anet Wilsher",
  //     "agitation": "Caregiver Training in Therapeutic Exercise using Prosthesis"
  //   },
  //   {
  //     "name": "IZBA",
  //     "slogan": "engineer extensible schemas",
  //     "picture": "solution",
  //     "leader": "Tabbatha Genicke",
  //     "agitation": "Extirpation of Matter from Left Pleura, Open Approach"
  //   },
  //   {
  //     "name": "Hydrochlorothiazide",
  //     "slogan": "grow best-of-breed vortals",
  //     "picture": "coherent",
  //     "leader": "Cointon Southernwood",
  //     "agitation": "Dilate R Com Iliac Art w Drug-elut Intra, Perc Endo"
  //   },
  //   {
  //     "name": "Megestrol Acetate",
  //     "slogan": "repurpose front-end e-markets",
  //     "picture": "definition",
  //     "leader": "Louis Handscomb",
  //     "agitation": "Reattachment of Female Perineum, Open Approach"
  //   },
  //   {
  //     "name": "Eight Hour Cream Lip Protectant Sheer Tint SPF 15 Plum",
  //     "slogan": "unleash 24/7 communities",
  //     "picture": "throughput",
  //     "leader": "Jamal Robertson",
  //     "agitation": "Removal of Nonaut Sub from R Tibia, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Vitamin B Complex",
  //     "slogan": "iterate customized action-items",
  //     "picture": "stable",
  //     "leader": "Cos Fortescue",
  //     "agitation": "Division of Right Scapula, Open Approach"
  //   },
  //   {
  //     "name": "BAUME PRODIGIEUX LEVRES 02 LEGENDAIRE PINK",
  //     "slogan": "grow proactive ROI",
  //     "picture": "Progressive",
  //     "leader": "Sibbie Orteu",
  //     "agitation": "Repair Right Atrium, Percutaneous Endoscopic Approach"
  //   },
  //   {
  //     "name": "Cold Multi-Symptom Daytime Rapid Release",
  //     "slogan": "evolve extensible applications",
  //     "picture": "demand-driven",
  //     "leader": "Eugene Philcott",
  //     "agitation": "Excision of L Low Arm & Wrist Tendon, Perc Approach, Diagn"
  //   },
  //   {
  //     "name": "Irbesartan",
  //     "slogan": "generate mission-critical solutions",
  //     "picture": "Universal",
  //     "leader": "Ynes Pauley",
  //     "agitation": "Drainage of Right Knee Tendon, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Foaming Antibacterial",
  //     "slogan": "e-enable real-time e-commerce",
  //     "picture": "3rd generation",
  //     "leader": "Erich Mc Elory",
  //     "agitation": "Occlusion of Left Subclavian Artery, Open Approach"
  //   },
  //   {
  //     "name": "Temazepam",
  //     "slogan": "engineer B2B web services",
  //     "picture": "solution-oriented",
  //     "leader": "Moore Vowden",
  //     "agitation": "Drainage of Left Sublingual Gland, Open Approach, Diagnostic"
  //   },
  //   {
  //     "name": "Hydrocodone Bitartrate And Acetaminophen",
  //     "slogan": "utilize magnetic architectures",
  //     "picture": "Organized",
  //     "leader": "Leroy Huortic",
  //     "agitation": "Excision of Right Colic Artery, Perc Endo Approach"
  //   },
  //   {
  //     "name": "Pantoprazole Sodium",
  //     "slogan": "matrix transparent vortals",
  //     "picture": "Mandatory",
  //     "leader": "Elnore Turvie",
  //     "agitation": "Dichotic Stimuli Assessment using Sound Field / Booth"
  //   },
  //   {
  //     "name": "BURWEED MARSHELDER POLLEN",
  //     "slogan": "repurpose viral metrics",
  //     "picture": "bifurcated",
  //     "leader": "Noni McLorinan",
  //     "agitation": "Ventil, Resp/Circ Assess Circ Head, Neck w Mech Equip"
  //   },
  //   {
  //     "name": "Male Balance",
  //     "slogan": "target ubiquitous deliverables",
  //     "picture": "service-desk",
  //     "leader": "Delila Rider",
  //     "agitation": "Dilate L Fem Art, Bifurc, w 4+ Intralum Dev, Perc"
  //   },
  //   {
  //     "name": "Russian Thistle",
  //     "slogan": "monetize plug-and-play functionalities",
  //     "picture": "Switchable",
  //     "leader": "Georgianna Josipovitz",
  //     "agitation": "Removal of Spacer from Left Sacroiliac Joint, Open Approach"
  //   },
  //   {
  //     "name": "ONDANSETRON",
  //     "slogan": "productize cross-media schemas",
  //     "picture": "orchestration",
  //     "leader": "Cloris Costanza",
  //     "agitation": "Transfer R Low Arm & Wrist Muscle with Skin, Open Approach"
  //   },
  //   {
  //     "name": "Alka-Seltzer Heartburn Plus Gas ReliefChews Tropical Punch",
  //     "slogan": "disintermediate frictionless ROI",
  //     "picture": "Total",
  //     "leader": "Neal Oggers",
  //     "agitation": "Inspection of Penis, Open Approach"
  //   },
  //   {
  //     "name": "Olanzapine",
  //     "slogan": "engineer revolutionary web services",
  //     "picture": "firmware",
  //     "leader": "Mehetabel Brou",
  //     "agitation": "Release Left Submaxillary Gland, Open Approach"
  //   },
  //   {
  //     "name": "Terrasil Molluscum Treatment",
  //     "slogan": "leverage enterprise vortals",
  //     "picture": "Synergized",
  //     "leader": "Jillana Slemmonds",
  //     "agitation": "Release Right Lower Lobe Bronchus, Via Opening"
  //   },
  //   {
  //     "name": "Chlorhexidine Gluconate",
  //     "slogan": "synthesize robust vortals",
  //     "picture": "pricing structure",
  //     "leader": "Iseabal Becks",
  //     "agitation": "Alteration of Right Lower Leg with Synth Sub, Open Approach"
  //   },
  //   {
  //     "name": "Lucky Antibacterial Hand Soap",
  //     "slogan": "exploit leading-edge e-commerce",
  //     "picture": "fresh-thinking",
  //     "leader": "Mickey Ratie",
  //     "agitation": "Insertion of Intralum Dev into R Colic Art, Open Approach"
  //   },
  //   {
  //     "name": "PURE SELECT Purifying Anti-Aging",
  //     "slogan": "cultivate strategic ROI",
  //     "picture": "Automated",
  //     "leader": "Abbye Wodeland",
  //     "agitation": "Insertion of Spacer into C-thor Jt, Open Approach"
  //   },
  //   {
  //     "name": "Glyburide",
  //     "slogan": "redefine granular e-business",
  //     "picture": "Configurable",
  //     "leader": "Zora Whitters",
  //     "agitation": "Supplement Right External Ear with Synth Sub, Open Approach"
  //   }
  // ], (err, results) => console.log(err));
})
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, identity, partyName");
  next();
});


app.use(bodyParser.urlencoded());

app.use(bodyParser.json());



app.get('/parties', (req, res) => {

  const sessionId = req.get('identity');
  console.log('sessionId', sessionId);
  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {
        Parties.find({}).then(results => {
          res
            .status(200)
            .send(results.map(i => ({ name: i.name, slogan: i.slogan, picture: i.picture, id: i.id })))
            .end();
        })
      }



    })
  }



});

app.get('/parties-search', (req, res) => {

  const sessionId = req.get('identity');
  const keyword = req.get('partyName');

  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {

        if (keyword === undefined) {
          res.status(400).send({ message: 'You have to provide search criteria' });
        } else {

          Parties.find({ name: { $regex: keyword, $options: 'i' } }, (err, results) => {

            res.status(200).send(results.map(i => ({ name: i.name, slogan: i.slogan, picture: i.picture, id: i.id })));

          })
        }


      }
    })
  }
});

app.get('/party/:id', (req, res) => {

  const sessionId = req.get('identity');
  const partyId = req.params.id;

  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {


        Parties.findById(partyId, (err, result) => {
          if (!result) {
            res.status(404).send({ message: 'There is no such party' });
          } else {
            res.status(200).send(result);
          }

        })
      }
    })
  }
});


app.post('/vote/:id', async (req, res) => {

  const sessionId = req.get('identity');
  const partyId = req.params.id;

  const session = await Sessions.findById(sessionId).catch(e => {
    console.log('Ne namiram takava sessia');
  });
  if (!session) {
    res.status(401).send({ message: 'You are not logged in' });
    return;
  }

  const party = await Parties.findById(partyId).catch(e => {
    console.log('Greshka v turseneto na partiq');
  })

  if (!party) {
    res.status(400).send({ message: 'No such party!' });
    return;
  }

  const user = await Users.find({ username: session.username }).catch(e => {
    console.log('Greshka v tyrseneto na user');
  })
  if (!user[0]) {
    res.status(400).send({ message: 'No such user!' });
    return;
  }

  if (user[0].hasVoted) {
    res.status(406).send({ message: 'You cannot vote twice' });
    return;
  }

  // update the hasVoted prop of the user
  await Users.findOneAndUpdate({ username: session.username }, { hasVoted: true });

  const results = await Results.find({ partyId }).catch(e => {
    console.log('Error when updating results');
  });



  if (results && results.length === 0) {
    await Results.create({ partyId, voters: 1 }).catch(e => {
      res.status(500).send({ message: 'Error when creating new result entry' });
    });
  } else {
    await Results.findOneAndUpdate({ partyId }, { voters: results[0].voters + 1 }).catch(e => {
      res.status(500).send({ message: 'Error when updating result entry' });
    })
  }
  res.status(200).send();
});


app.get('/results', (req, res) => {

  const sessionId = req.get('identity');

  if (!sessionId) {
    res.status(401).send({ message: 'You are not logged in' });
  } else {
    Sessions.findById(sessionId, (err, session) => {
      if (!session) {
        res.status(401).send({ message: 'You are not logged in' });

      } else {
        Results.find({}).then(results => {
          res
            .status(200)
            .send(results.map(i => ({ partyId: i.partyId, voters: i.voters })))
            .end();
        })
      }



    })
  }



});



app.post('/users', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  Users.find({ username }, (err, result) => {
    if (result && result[0]) {

      res.status(400).send({ message: 'The username is taken!' });
    } else {

      Users.create({
        username,
        password,
        hasVoted: false
      }, (err, result) => {
        if (!err) {
          res.status(200).send(result);
        } else {
          res.status(500).send();
        }
      })

    }
  })
})

app.post('/login', (req, res) => {

  const username = req.body.username;
  const password = req.body.password;

  Users.find({ username, password }, (err, result) => {
    if (result && result[0]) {
      Sessions.find({ username }, (err, sessions) => {
        if (sessions && sessions[0]) {
          res.status(200).send({ sessionId: sessions[0].id });
        } else {
          Sessions.create({ username }, (err, session) => {
            res.status(200).send({ sessionId: session.id });
          })
        }
      })

    } else {

      res.status(400).send({ message: 'Wrong credentials' });

    }
  })
})


app.post('/logout', (req, res) => {

  const id = req.body.id;

  Sessions.findByIdAndRemove(id, (err, result) => {

    if (result) {
      res.status(200).send();
    } else {
      res.status(400).send({ message: 'No session with this id' });
    }
  })
});



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
  console.log('Press Ctrl+C to quit.');
});