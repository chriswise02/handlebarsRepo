document.getElementById('search').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const helpers = document.querySelectorAll('.helper');
    helpers.forEach(helper => {
        const title = helper.querySelector('h3').textContent.toLowerCase();
        helper.style.display = title.includes(query) ? '' : 'none';
    });
    
    const sections = document.querySelectorAll('.helper-category');
    sections.forEach(section => {
        const visibleHelpers = section.querySelectorAll('.helper:not([style*="display: none"])');
        section.style.display = visibleHelpers.length > 0 ? '' : 'none';
    });
});

Promise.all([
    fetch('categories.json').then(response => response.json()),
    fetch('helpers.json').then(response => response.json())
])
.then(([categoriesData, helpersData]) => {
    const content = document.getElementById('content');
    const navList = document.querySelector('nav ul');
    content.innerHTML = '';
    navList.innerHTML = '';

    categoriesData.categories.forEach(category => {
        const section = document.createElement('section');
        section.classList.add('helper-category');
        section.id = category;

        const h2 = document.createElement('h2');
        h2.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        section.appendChild(h2);

        const helpersKey = category.endsWith('Helpers') ? category : category + 'Helpers';
        console.log('Checking key:', helpersKey);
        console.log('Data available:', helpersData[helpersKey]);
        if (helpersData[helpersKey]) {
            helpersData[helpersKey].forEach(helper => {
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
        }

        content.appendChild(section);

        const li = document.createElement('li');
        const a = document.createElement('a');
        a.href = `#${category}`;
        a.textContent = category.charAt(0).toUpperCase() + category.slice(1);
        li.appendChild(a);
        navList.appendChild(li);
    });
})
.catch(error => console.error('Error loading data:', error));
