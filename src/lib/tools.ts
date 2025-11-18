import type { Tool } from "@/lib/definitions";
import { slugify } from "./utils";

export const toolComponentMap = {
  ImageCompressor: () => import('@/components/tools/coming-soon'),
  ImageResizer: () => import('@/components/tools/image-resizer'),
  ImageConverter: () => import('@/components/tools/coming-soon'),
  AddTextWatermark: () => import('@/components/tools/coming-soon'),
  FlipRotateImage: () => import('@/components/tools/coming-soon'),
  ScientificCalculator: () => import('@/components/tools/scientific-calculator'),
  BMICalculator: () => import('@/components/tools/bmi-calculator'),
  AgeCalculator: () => import('@/components/tools/coming-soon'),
  LoanEMICalculator: () => import('@/components/tools/loan-emi-calculator'),
  SIPCalculator: () => import('@/components/tools/coming-soon'),
  PercentageCalculator: () => import('@/components/tools/coming-soon'),
  CurrencyConverter: () => import('@/components/tools/coming-soon'),
  GSTTaxCalculator: () => import('@/components/tools/coming-soon'),
  TipCalculator: () => import('@/components/tools/coming-soon'),
  DateTimeCalculator: () => import('@/components/tools/coming-soon'),
  TimeDurationCalculator: () => import('@/components/tools/coming-soon'),
  DiscountCalculator: () => import('@/components/tools/coming-soon'),
  FuelCostCalculator: () => import('@/components/tools/coming-soon'),
  WordCharacterCounter: () => import('@/components/tools/word-counter'),
  CaseConverter: () => import('@/components/tools/case-converter'),
  RemoveExtraSpaces: () => import('@/components/tools/space-remover'),
  RemoveDuplicateLines: () => import('@/components/tools/coming-soon'),
  TextToSlug: () => import('@/components/tools/text-to-slug'),
  ListSorter: () => import('@/components/tools/coming-soon'),
  MorseCodeTranslator: () => import('@/components/tools/coming-soon'),
  BinaryTextConverter: () => import('@/components/tools/binary-converter'),
  JSONFormatterValidator: () => import('@/components/tools/json-formatter'),
  Base64EncodeDecode: () => import('@/components/tools/base64-converter'),
  URLEncodeDecode: () => import('@/components/tools/url-encoder'),
  TimestampConverter: () => import('@/components/tools/coming-soon'),
  QRCodeGenerator: () => import('@/components/tools/qr-code-generator'),
  AdvancedColorPicker: () => import('@/components/tools/coming-soon'),
  StrongPasswordGenerator: () => import('@/components/tools/password-generator'),
  RandomNumberGenerator: () => import('@/components/tools/coming-soon'),
  UnitConverter: () => import('@/components/tools/unit-converter'),
  TimeZoneConverter: () => import('@/components/tools/coming-soon'),
  CountdownTimer: () => import('@/components/tools/coming-soon'),
  PomodoroTimer: () => import('@/components/tools/pomodoro-timer'),
  Stopwatch: () => import('@/components/tools/stopwatch'),
  LoremIpsumGenerator: () => import('@/components/tools/lorem-ipsum-generator'),
  EmojiPicker: () => import('@/components/tools/coming-soon'),
  RichTextEditor: () => import('@/components/tools/coming-soon'),
  NoteTakingApp: () => import('@/components/tools/note-taking-app'),
  ToDoList: () => import('@/components/tools/todo-list'),
  WorldClock: () => import('@/components/tools/coming-soon'),
  SimpleWeatherWidget: () => import('@/components/tools/coming-soon'),
};

const allTools: Omit<Tool, 'slug' | 'component' | 'icon'> & { icon: string }[] = [
  // Image Tools
  { name: 'Image Compressor', description: 'Reduce image file size without losing quality.', icon: 'Scissors', category: 'Image' },
  { name: 'Image Resizer', description: 'Resize images to your desired dimensions.', icon: 'ImageIcon', category: 'Image' },
  { name: 'Image Converter', description: 'Convert images between JPG, PNG, and WEBP.', icon: 'FlipHorizontal', category: 'Image' },
  { name: 'Add Text/Watermark', description: 'Add a text watermark to your images.', icon: 'Type', category: 'Image' },
  { name: 'Flip/Rotate Image', description: 'Flip and rotate images with simple controls.', icon: 'RotateCw', category: 'Image' },

  // Calculator Tools
  { name: 'Scientific Calculator', description: 'Perform complex mathematical calculations.', icon: 'Calculator', category: 'Calculator' },
  { name: 'BMI Calculator', description: 'Calculate your Body Mass Index (BMI).', icon: 'HeartPulse', category: 'Calculator' },
  { name: 'Age Calculator', description: 'Find out your exact age from your birth date.', icon: 'CalendarDays', category: 'Calculator' },
  { name: 'Loan EMI Calculator', description: 'Calculate your Equated Monthly Installments.', icon: 'Landmark', category: 'Calculator' },
  { name: 'SIP Calculator', description: 'Estimate returns on your SIP investments.', icon: 'Coins', category: 'Calculator' },
  { name: 'Percentage Calculator', description: 'Quickly perform various percentage calculations.', icon: 'Percent', category: 'Calculator' },
  { name: 'Currency Converter', description: 'Convert currencies with live exchange rates.', icon: 'Globe', category: 'Calculator' },
  { name: 'GST/Tax Calculator', description: 'Calculate Goods and Services Tax.', icon: 'Receipt', category: 'Calculator' },
  { name: 'Tip Calculator', description: 'Calculate tips and split bills easily.', icon: 'Wrench', category: 'Calculator' },
  { name: 'Date & Time Calculator', description: 'Calculate duration between two dates.', icon: 'Clock', category: 'Calculator' },
  { name: 'Time Duration Calculator', description: 'Add or subtract time durations.', icon: 'Timer', category: 'Calculator' },
  { name: 'Discount Calculator', description: 'Calculate final price after a discount.', icon: 'Tag', category: 'Calculator' },
  { name: 'Fuel Cost Calculator', description: 'Estimate the fuel cost for your trip.', icon: 'Fuel', category: 'Calculator' },

  // Text Tools
  { name: 'Word & Character Counter', description: 'Count words, characters, sentences, and paragraphs.', icon: 'FileText', category: 'Text' },
  { name: 'Case Converter', description: 'Convert text to various cases (uppercase, lowercase, etc.).', icon: 'CaseSensitive', category: 'Text' },
  { name: 'Remove Extra Spaces', description: 'Clean up text by removing extra spaces and lines.', icon: 'Eraser', category: 'Text' },
  { name: 'Remove Duplicate Lines', description: 'Delete duplicate lines from a list.', icon: 'ListOrdered', category: 'Text' },
  { name: 'Text to Slug', description: 'Create a URL-friendly slug from any text.', icon: 'Link2', category: 'Text' },
  { name: 'List Sorter', description: 'Sort lists alphabetically, numerically, or randomly.', icon: 'SortAsc', category: 'Text' },
  { name: 'Morse Code Translator', description: 'Translate text to Morse code and back.', icon: 'MessageCircle', category: 'Text' },
  { name: 'Binary ↔ Text Converter', description: 'Convert between binary code and plain text.', icon: 'Binary', category: 'Text' },

  // Web & Developer Tools
  { name: 'JSON Formatter & Validator', description: 'Format, validate, and beautify JSON code.', icon: 'Braces', category: 'Web & Developer' },
  { name: 'Base64 Encode/Decode', description: 'Encode to and decode from Base64.', icon: 'Hash', category: 'Web & Developer' },
  { name: 'URL Encode/Decode', description: 'Encode and decode URLs for safe transmission.', icon: 'Link2', category: 'Web & Developer' },
  { name: 'Timestamp Converter', description: 'Convert Unix timestamps to readable dates.', icon: 'Clock', category: 'Web & Developer' },
  { name: 'QR Code Generator', description: 'Generate QR codes for URLs, text, and more.', icon: 'QrCode', category: 'Web & Developer' },
  { name: 'Advanced Color Picker', description: 'A powerful color picker with history and palettes.', icon: 'Palette', category: 'Web & Developer' },
  
  // Utility Tools
  { name: 'Strong Password Generator', description: 'Create secure, random passwords.', icon: 'KeyRound', category: 'Utility' },
  { name: 'Random Number Generator', description: 'Generate random numbers within a range.', icon: 'Sparkles', category: 'Utility' },
  { name: 'Unit Converter', description: 'Convert between various units of measurement.', icon: 'Scale', category: 'Utility' },
  { name: 'Time Zone Converter', description: 'Compare time across different time zones.', icon: 'Globe', category: 'Utility' },
  { name: 'Countdown Timer', description: 'Set a timer that counts down to an event.', icon: 'Hourglass', category: 'Utility' },
  { name: 'Pomodoro Timer', description: 'A timer to boost your productivity.', icon: 'Timer', category: 'Productivity' },
  { name: 'Stopwatch', description: 'A simple stopwatch to measure time.', icon: 'StopCircle', category: 'Utility' },
  { name: 'Lorem Ipsum Generator', description: 'Generate placeholder text for your designs.', icon: 'BookText', category: 'Utility' },
  { name: 'Emoji Picker', description: 'Find and copy emojis with ease.', icon: 'Smile', category: 'Utility' },
  
  // New Productivity Tools
  { name: 'Rich Text Editor', description: 'A simple editor for formatted text.', icon: 'Type', category: 'Productivity' },
  { name: 'Note-Taking App', description: 'Jot down notes and ideas, saved in your browser.', icon: 'Notebook', category: 'Productivity' },
  { name: 'To-Do List', description: 'Organize your tasks and stay productive.', icon: 'ListTodo', category: 'Productivity' },
  { name: 'World Clock', description: 'View current times for cities around the world.', icon: 'Map', category: 'Productivity' },
  { name: 'Simple Weather Widget', description: 'Get current weather for any city.', icon: 'CloudSun', category: 'Productivity' },
];

export const tools: Omit<Tool, 'component'>[] = allTools.map(tool => {
  const slug = slugify(tool.name);
  return {
    ...tool,
    slug: slug,
  };
});
