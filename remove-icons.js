const fs = require("fs");
const path = require("path");

// Icon patterns to remove or replace
const iconPatterns = [
  // Remove icon imports
  {
    pattern: /import\s*{[^}]*}\s*from\s*"lucide-react";/g,
    replacement: 'import {} from "lucide-react";',
  },

  // Remove icon elements with className
  { pattern: /<[A-Z][a-zA-Z]*\s+className="[^"]*"\s*\/>/g, replacement: "" },

  // Remove icon elements with other props
  {
    pattern: /<[A-Z][a-zA-Z]*\s+[^>]*className="[^"]*"[^>]*\/>/g,
    replacement: "",
  },

  // Replace specific icon usages in JSX
  { pattern: /<ArrowLeft className="h-4 w-4"\s*\/>/g, replacement: "←" },
  {
    pattern: /<Loader2 className="[^"]*animate-spin[^"]*"\s*\/>/g,
    replacement: "",
  },

  // Remove icon containers
  {
    pattern:
      /<div className="p-3 rounded-xl bg-[^"]*border[^"]*">\s*<[A-Z][a-zA-Z]*[^>]*\/>\s*<\/div>/g,
    replacement: "",
  },
];

// Files to process
const aiToolFiles = [
  "src/pages/ai-tools/MentorRecommendation.tsx",
  "src/pages/ai-tools/JobMatch.tsx",
  "src/pages/ai-tools/DonationPrediction.tsx",
  "src/pages/ai-tools/EventPrediction.tsx",
  "src/pages/ai-tools/SentimentAnalysis.tsx",
  "src/pages/ai-tools/FraudDetection.tsx",
];

function removeIconsFromFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, "utf8");

    // Apply patterns
    iconPatterns.forEach(({ pattern, replacement }) => {
      content = content.replace(pattern, replacement);
    });

    // Clean up empty import statements
    content = content.replace(
      /import\s*{\s*}\s*from\s*"lucide-react";\s*\n?/g,
      ""
    );

    // Clean up extra whitespace
    content = content.replace(/\n\s*\n\s*\n/g, "\n\n");

    fs.writeFileSync(filePath, content, "utf8");
    console.log(`✓ Processed ${filePath}`);
  } catch (error) {
    console.error(`✗ Error processing ${filePath}:`, error.message);
  }
}

// Process all files
aiToolFiles.forEach(removeIconsFromFile);

console.log("Icon removal complete!");
