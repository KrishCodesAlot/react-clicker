/**
 * Formats a number with abbreviations (K, M, B, T)
 * @param {number} num - The number to format
 * @param {number} decimals - Number of decimal places (default: 1)
 * @returns {string} - Formatted number string
 */
export function formatNumber(num, decimals = 1) {
  // Handle negative numbers
  const isNegative = num < 0;
  num = Math.abs(num);
  
  // Define abbreviations and their thresholds
  const abbreviations = [
    { value: 1e12, suffix: 'T' }, // Trillion
    { value: 1e9, suffix: 'B' },  // Billion
    { value: 1e6, suffix: 'M' },  // Million
    { value: 1e3, suffix: 'K' }   // Thousand
  ];
  
  // Find the appropriate abbreviation
  for (const { value, suffix } of abbreviations) {
    if (num >= value) {
      const formatted = (num / value).toFixed(decimals);
      // Remove unnecessary trailing zeros and decimal point
      const cleaned = parseFloat(formatted).toString();
      return (isNegative ? '-' : '') + cleaned + suffix;
    }
  }
  
  // For numbers less than 1000, return with specified decimals
  if (num < 1000 && num !== Math.floor(num)) {
    return (isNegative ? '-' : '') + num.toFixed(decimals);
  }
  
  // For whole numbers less than 1000, return as is
  return (isNegative ? '-' : '') + Math.floor(num).toString();
}

/**
 * Formats a number with more precise abbreviations and optional full display
 * @param {number} num - The number to format
 * @param {Object} options - Formatting options
 * @param {number} options.decimals - Number of decimal places (default: 1)
 * @param {boolean} options.forceDecimals - Always show decimals (default: false)
 * @param {number} options.threshold - Minimum value to start abbreviating (default: 1000)
 * @returns {string} - Formatted number string
 */
export function formatNumberAdvanced(num, options = {}) {
  const {
    decimals = 1,
    forceDecimals = false,
    threshold = 1000
  } = options;
  
  // Handle special cases
  if (num === 0) return '0';
  if (!isFinite(num)) return 'Infinity';
  if (isNaN(num)) return 'NaN';
  
  // Handle negative numbers
  const isNegative = num < 0;
  num = Math.abs(num);
  
  // If below threshold, return as is
  if (num < threshold) {
    if (forceDecimals || num !== Math.floor(num)) {
      return (isNegative ? '-' : '') + num.toFixed(decimals);
    }
    return (isNegative ? '-' : '') + Math.floor(num).toString();
  }
  
  // Use the basic formatter for larger numbers
  return formatNumber(isNegative ? -num : num, decimals);
}

// Example usage and test cases
if (typeof module !== 'undefined' && module.exports) {
  // Test the formatter
  const testCases = [
    0,
    1,
    10,
    100,
    999,
    1000,
    1234,
    12345,
    123456,
    1234567,
    12345678,
    123456789,
    1234567890,
    12345678901,
    123456789012,
    1234567890123,
    -1234,
    -1234567,
    0.1,
    0.12345,
    1234.5678
  ];
  
  console.log('Number Formatter Test Results:');
  console.log('==============================');
  testCases.forEach(num => {
    console.log(`${num.toString().padEnd(15)} => ${formatNumber(num)}`);
  });
}