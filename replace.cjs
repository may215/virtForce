const fs = require('fs');
let text = fs.readFileSync('README.md', 'utf8');

text = text.replace(/virtForce OS/g, 'Production SRE');
text = text.replace(/virtforce OS/g, 'Production SRE');
text = text.replace(/virtForce/g, 'Production SRE');
text = text.replace(/virtforce/g, 'production-sre');

text = text.replace(/A high-integrity, completely self-hosted developer swarm designed for single-operators and indie makers\./g, 'A high-integrity, completely self-hosted Site Reliability Engineering (SRE) orchestration platform designed for production environments.');

text = text.replace(/Unlike projects like HKUDS\/ClawTeam and SwarmClaw which rely on opaque, non-interactive terminal outputs or read-only text lists, \*\*Production SRE\*\* introduces of an state-of-the-art \*\*Interactive Topological CAD Swarm Canvas\*\*:/g, 'Unlike traditional orchestration tools which rely on opaque, non-interactive terminal outputs or read-only text lists, **Production SRE** introduces a state-of-the-art **Interactive Topological CAD Swarm Canvas**:');

text = text.replace(/https:\/\/github\.com\/Production SRE\/Production SRE\.git/g, 'https://github.com/production-sre/production-sre.git');
text = text.replace(/cd Production SRE/g, 'cd production-sre');

text = text.replace(/For single-operators working with existing, live code projects/g, 'For teams working with existing, live code projects');

text = text.replace(/developer swarm/g, 'autonomous SRE swarm');
text = text.replace(/developer agents/g, 'SRE agents');
text = text.replace(/developer-friendly autonomous agent orchestration platform/g, 'developer-friendly autonomous site reliability engineering platform');

fs.writeFileSync('README.md', text);
console.log('Replacements done.');
