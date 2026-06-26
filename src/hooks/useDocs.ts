import { useState, useEffect } from 'react';

export function useDocs() {
  const [docReadme, setDocReadme] = useState('');
  const [docArchitecture, setDocArchitecture] = useState('');
  const [docInstall, setDocInstall] = useState('');
  const [docCompose, setDocCompose] = useState('');

  useEffect(() => {
    async function fetchOSDocs() {
      try {
        const [r, a, i, d] = await Promise.all([
          fetch('/README.md').then(res => res.text()).catch(() => ''),
          fetch('/ARCHITECTURE.md').then(res => res.text()).catch(() => ''),
          fetch('/INSTALL.md').then(res => res.text()).catch(() => ''),
          fetch('/docker-compose.yml').then(res => res.text()).catch(() => ''),
        ]);
        setDocReadme(r || '# virtForce OS\nSecure containerized AI agent swarms.');
        setDocArchitecture(a || '# System Architecture\nIsolated sandbox container loops.');
        setDocInstall(i || '# Installation Blueprint\nRequires Docker and GCP credentials.');
        setDocCompose(d || 'version: "3.8"\nservices:\n  orchestrator:\n    image: virtforce/core');
      } catch (err) {
        console.error('Failed to load markdown files:', err);
      }
    }
    fetchOSDocs();
  }, []);

  return { docReadme, docArchitecture, docInstall, docCompose };
}
