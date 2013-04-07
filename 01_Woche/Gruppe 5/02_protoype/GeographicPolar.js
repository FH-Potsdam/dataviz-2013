$(document).ready(function() {
    $('article#tut1 a.runScript').click(function() {

        // Referenz auf das DOM-Objekt der Zeichenfläche
        var element = $('article#tut1 > div.paper');
        
        // Dimensionen der Zeichenfläche
        var w = element.outerWidth();
        var h = element.outerHeight();

        // Das SVG-Element erzeugen!
        var paper = new Raphael(element, w, h);

        // Zwei Kreise zeichnen!		
        paper.circle(w / 4, h / 2, w / 10);
        paper.circle(w / 2, h / 2, w / 5);
        return false;
    });
});