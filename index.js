fetch("data.json")
    .then(res => res.json())
    .then(data => {

        localStorage.setItem('indexData', JSON.stringify(data));
        // Website title
        const titleElement = document.getElementById("title");
        titleElement.innerHTML = data.html.head.title;

        // Navigation links
        const displayElement1 = document.getElementById("pg1");
        displayElement1.innerHTML = data.html.body.header.nav.a[0].content;
        displayElement1.href = data.html.body.header.nav.a[0].href;

        const displayElement2 = document.getElementById("pg2");
        displayElement2.innerHTML = data.html.body.header.nav.a[1].content;
        displayElement2.href = data.html.body.header.nav.a[1].href;

        const displayElement3 = document.getElementById("pg3");
        displayElement3.innerHTML = data.html.body.header.nav.a[2].content;
        displayElement3.href = data.html.body.header.nav.a[2].href;

        const displayElement4 = document.getElementById("pg4");
        displayElement4.innerHTML = data.html.body.header.nav.a[3].content;
        displayElement4.href = data.html.body.header.nav.a[3].href;

        const displayElement5 = document.getElementById("pg5");
        displayElement5.innerHTML = data.html.body.header.nav.a[4].content;
        displayElement5.href = data.html.body.header.nav.a[4].href;

        // Main Content
        const mainContent = data.html.body.main;

        // Heading 1
        const heading1Element = document.getElementById("heading1");
        heading1Element.innerHTML = mainContent.h2[0].content;

        const img0Element = document.getElementById("img0");
        img0Element.src = mainContent.img[0].src;
        img0Element.alt = mainContent.img[0].alt;

        const homep1Element = document.getElementById("homep1");
        homep1Element.innerHTML = mainContent.p[0].content;

        // Heading 2
        const heading2_1Element = document.getElementById("heading2_1");
        heading2_1Element.innerHTML = mainContent.h2[1].content;

        const img1Element = document.getElementById("img1");
        img1Element.src = mainContent.img[1].src;
        img1Element.alt = mainContent.img[1].alt;

        const homep2Element = document.getElementById("homep2");
        homep2Element.innerHTML = mainContent.p[1].content;

        // Heading 3
        const heading3Element = document.getElementById("heading3");
        heading3Element.innerHTML = mainContent.h2[2].content;

        const homep3_p1Element = document.getElementById("homep3_p1");
        homep3_p1Element.innerHTML = mainContent.div[1].homep3.p[0].content;

        const homep3_p2Element = document.getElementById("homep3_p2");
        homep3_p2Element.innerHTML = mainContent.div[1].homep3.p[1].content;

        const homep3_ulElement = document.getElementById("homep3_ul");
        homep3_ulElement.innerHTML = ''; // Clear previous content

        const liElements = mainContent.div[1].homep3.ul.li;
        for (let i = 0; i < liElements.length; i++) {
            const liElement = document.createElement("li");
            liElement.innerHTML = liElements[i].content;
            homep3_ulElement.appendChild(liElement);
        }

        const img4_1Element = document.getElementById("img4_1");
        img4_1Element.src = mainContent.img[5].src;
        img4_1Element.alt = mainContent.img[5].alt;

        const img4_2Element = document.getElementById("img4_2");
        img4_2Element.src = mainContent.img[6].src;
        img4_2Element.alt = mainContent.img[6].alt;

        // Footer
        const footer_p1Element = document.getElementById("footer_p1");
        footer_p1Element.innerHTML = data.html.body.footer.p[0].content;

        const footer_p2Element = document.getElementById("footer_p2");
        footer_p2Element.innerHTML = data.html.body.footer.p[1].content;

        const footer_h4Element = document.getElementById("footer_h4");
        footer_h4Element.innerHTML = data.html.body.footer.div.h4;

        const footer_ulElement = document.getElementById("footer_ul");
        const footer_liElements = data.html.body.footer.div.ul.li;
        for (let i = 0; i < footer_liElements.length; i++) {
            const liElement = document.createElement("li");
            const aElement = document.createElement("a");
            aElement.href = footer_liElements[i].a.href;
            aElement.innerHTML = footer_liElements[i].a.content;
            liElement.appendChild(aElement);
            footer_ulElement.appendChild(liElement);
        }

        

    })
    .catch(error => console.log(`Error - ${error}`));
