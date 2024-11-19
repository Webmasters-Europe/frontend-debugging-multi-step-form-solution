import { describe, it, expect } from 'vitest';
import {
  isEmpty,
  isValidEmail,
  hasMinLength,
  hasTwoWords,
} from '../../src/utils/validation';

describe('Utility Functions', () => {
  describe('isEmpty', () => {
    it('should return true for empty strings', () => {
      expect(isEmpty('')).toBe(true);
      expect(isEmpty('   ')).toBe(true);
    });

    it('should return false for non-empty strings', () => {
      expect(isEmpty('John')).toBe(false);
      expect(isEmpty(' John Doe ')).toBe(false);
    });
  });

  describe('isValidEmail', () => {
    it('should validate correct email formats', () => {
      expect(isValidEmail('john@example.com')).toBe(true);
      expect(isValidEmail('jane.doe@sub.domain.co')).toBe(true);
    });

    it('should invalidate incorrect email formats', () => {
      expect(isValidEmail('johnexample.com')).toBe(false);
      expect(isValidEmail('jane@.com')).toBe(false);
      expect(isValidEmail('jane@com')).toBe(false);
    });
  });

  describe('hasMinLength', () => {
    it('should return true if value meets minimum length', () => {
      expect(hasMinLength('password', 6)).toBe(true);
      expect(hasMinLength('123456', 6)).toBe(true);
    });

    it('should return false if value does not meet minimum length', () => {
      expect(hasMinLength('pass', 6)).toBe(false);
      expect(hasMinLength('123', 6)).toBe(false);
    });
  });

  describe('hasTwoWords', () => {
    it('should return true if fullName has at least two words', () => {
      expect(hasTwoWords('John Doe')).toBe(true);
      expect(hasTwoWords('Jane Mary Doe')).toBe(true);
    });

    it('should return false if fullName has less than two words', () => {
      expect(hasTwoWords('John')).toBe(false);
      expect(hasTwoWords('   Jane   ')).toBe(false);
    });
  });
});
