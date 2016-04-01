var Classifier = require("classifier");
var detector   = new Classifier.Bayesian();

detector.train("Combien des élèves y a-t-il dans votre collège?", "french");
detector.train("Voulez-vous peser ce colis, s'il vous plaît.", "french");
detector.train("Ciao, non ti va di andare al cinema?", "italian");
detector.train("Mi sai dire quando apre il negozio?", "italian");

console.log(detector.classify("Non so quando andare il cinema"));
console.log(detector.classify("me"));
