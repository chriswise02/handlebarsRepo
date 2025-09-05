document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const helpers = document.querySelectorAll('.helper');
    helpers.forEach(helper => {
        const text = helper.textContent.toLowerCase();
        helper.style.display = text.includes(query) ? '' : 'none';
    });
});

fetch('helpers.json')
    .then(response => response.json())
    .then(data => {
        const content = document.getElementById('content');
        content.innerHTML = '';

        Object.keys(data).forEach(category => {
            const section = document.createElement('section');
            section.classList.add('helper-category');

            const h2 = document.createElement('h2');
            h2.textContent = category.replace(/([A-Z])/g, ' $1').trim();
            section.appendChild(h2);

            data[category].forEach(helper => {
                const div = document.createElement('div');
                div.classList.add('helper');

                const h3 = document.createElement('h3');
                h3.textContent = helper.title;
                div.appendChild(h3);

                const p = document.createElement('p');
                p.textContent = helper.description;
                div.appendChild(p);

                const pre = document.createElement('pre');
                const code = document.createElement('code');
                code.textContent = helper.example;
                pre.appendChild(code);
                div.appendChild(pre);

                const span = document.createElement('span');
                span.classList.add('tag');
                span.textContent = helper.category;
                div.appendChild(span);

                section.appendChild(div);
            });

            content.appendChild(section);
        });
    })
    .catch(error => console.error('Error loading helpers:', error));
