let link = window.prompt('Please enter Wiki link:');
let cycles = window.prompt('How many cycles?');

isValidWikiLink(link, cycles);

function extractEmbeddedLinksFromUrl(link) {
    window.open(link);

    let links = document.getElementsByTagName("a");
    let urls = [];

    for (let idx = 0; idx < links.length; idx++) {
        if (links[i].getAttribute("href") != '' || links[i].getAttribute("href") != null)
            urls.push(links[i].getAttribute("href"));
    }

    return urls;
}

function arrayToCsvFile(linksArr, filename) {
    let csvContent = 'data:text/csv;charset=utf-8,';

    linksArr.foreach(function (rowLink) {
        let row = rowLink.join(',');
        csvContent += row;
    });

    csvContent += linksArr.length;

    let encodedUri = encodeURI(csvContent);

    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", filename);
    document.body.appendChild(link);
}

function isValidWikiLink(link, n) {
    if (n < 1 || n > 20)
        throw "Invalid number of cycles";

    let isValid = (/^(wikipedia\.org)$/).test(link);

    if (isValid) {
        let request;
        if (window.XMLHttpRequest)
            request = new XMLHttpRequest();
        else
            request = new ActiveXObject("Microsoft.XMLHTTP");

        request.open('GET', link, false);
        request.send();
        if (request.status !== 200) {
            alert("Wiki link is not available.");
        } else {
            let history = [];
            let extractedLinks = extractEmbeddedLinksFromUrl(link);

            for (let cycleIdx = 0; cycleIdx < n; cycleIdx++) {
                let newUrl = 'https://wikipedia.org' + extractedUrls[cycleIdx];

                if (history.includes(newUrl))
                    continue;

                let newLinks = extractEmbeddedLinksFromUrl(newUrl);
                for (newLinkIdx = 0; newLinkIdx < newLinks.length; newLinkIdx++) {
                    if (!extractedLinks.includes(newLinks[newLinkIdx]))
                        extractedLinks.push(newLinks[newLinkIdx]);
                }
            }

            history.push(newUrl);
        }
    }
}