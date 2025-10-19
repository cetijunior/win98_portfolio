// src/data/fileStructure.js

// This data simulates the content of C: Drive (Work Experience) and D: Drive (Projects).
// You can replace 'resumeData.experience' with actual data here.

const fileStructure = {
    'C: Drive (Experience)': [
        {
            icon: '🏢',
            title: 'Senior Developer Experience',
            type: 'Folder',
            content: [
                { title: 'Project_Alpha.md', type: 'File', size: '12 KB', date: '01/2024' },
                { title: 'Project_Beta.md', type: 'File', size: '18 KB', date: '06/2023' },
            ]
        },
        {
            icon: '💼',
            title: 'Mid-Level Roles',
            type: 'Folder',
            content: [
                { title: 'Client_A_Report.pdf', type: 'File', size: '550 KB', date: '10/2022' },
            ]
        },
        { icon: '📝', title: 'Resume.docx', type: 'File', size: '30 KB', date: '09/2025' },
    ],
    'D: Drive (Personal)': [
        { icon: '💾', title: 'Family_Photos', type: 'Folder', content: [], size: '1.2 GB' },
        { icon: '🎵', title: 'Music_Collection', type: 'Folder', content: [], size: '3.5 GB' },
        { icon: '🗑️', title: 'Recycle Bin', type: 'Folder', content: [], size: '10 MB' },
    ],
    // This drive can trigger the 'AboutApp' from the main DesktopExperience component
    'About (Info)': [
        { icon: '⚙️', title: 'System Info', type: 'File', size: '1 KB', date: '01/2000' },
        { icon: '❓', title: 'Read Me First.txt', type: 'File', size: '5 KB', date: '09/2025' },
    ],
};

export default fileStructure;