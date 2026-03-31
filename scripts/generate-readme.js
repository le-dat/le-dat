const fs = require('fs');
const path = require('path');

const projectJson = JSON.parse(fs.readFileSync('project.json', 'utf8'));
const template = fs.readFileSync('template.md', 'utf8');

const projectsMarkdown = projectJson.projects
  .map((p) => {
    const links = [];
    if (p.url) links.push(`[Live Demo](${p.url})`);
    if (p.source) links.push(`[Source](${p.source})`);
    const linksStr = links.length > 0 ? `🔗 ${links.join(' · ')}` : '';

    return `### ${p.emoji} [${p.name}](${p.source}) — *${p.period}*${linksStr ? ` | ${linksStr}` : ''}
> ${p.description}`;
  })
  .join('\n\n');

const readme = template.replace('{{PROJECTS_SECTION}}', projectsMarkdown);

fs.writeFileSync('README.md', readme);
console.log('README.md generated successfully.');
