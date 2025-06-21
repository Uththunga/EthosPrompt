import { describe, it, expect } from 'vitest'
import { allPrompts } from '@/data/prompts/all-prompts'
import { categories } from '@/data/categories-data'

describe('Data Integration', () => {
  it('all prompts have valid structure', () => {
    allPrompts.forEach(prompt => {
      expect(prompt).toHaveProperty('id')
      expect(prompt).toHaveProperty('title')
      expect(prompt).toHaveProperty('description')
      expect(prompt).toHaveProperty('prompt')
      expect(prompt).toHaveProperty('categoryId')
      expect(prompt).toHaveProperty('subcategoryId')
      
      // Validate required string fields are not empty
      expect(prompt.id).toBeTruthy()
      expect(prompt.title).toBeTruthy()
      expect(prompt.description).toBeTruthy()
      expect(prompt.prompt).toBeTruthy()
      expect(prompt.categoryId).toBeTruthy()
      expect(prompt.subcategoryId).toBeTruthy()
    })
  })

  it('prompt categories exist in categories data', () => {
    const categoryIds = categories.map(cat => cat.id)
    
    allPrompts.forEach(prompt => {
      expect(categoryIds).toContain(prompt.categoryId)
    })
  })

  it('prompts have valid difficulty levels', () => {
    const validDifficulties = ['Very Easy', 'Easy', 'Moderate', 'Challenging', 'Advanced', 'Expert', 'Master']
    
    allPrompts.forEach(prompt => {
      if ('difficulty' in prompt) {
        expect(validDifficulties).toContain(prompt.difficulty)
      }
    })
  })

  it('categories have valid structure', () => {
    categories.forEach(category => {
      expect(category).toHaveProperty('id')
      expect(category).toHaveProperty('name')
      expect(category).toHaveProperty('description')
      expect(category).toHaveProperty('icon')
      
      // Validate required fields are not empty
      expect(category.id).toBeTruthy()
      expect(category.name).toBeTruthy()
      expect(category.description).toBeTruthy()
      expect(category.icon).toBeTruthy()
    })
  })

  it('all categories have associated prompts', () => {
    const promptCategoryIds = [...new Set(allPrompts.map(prompt => prompt.categoryId))]
    const categoryIds = categories.map(cat => cat.id)
    
    categoryIds.forEach(categoryId => {
      expect(promptCategoryIds).toContain(categoryId)
    })
  })

  it('prompts have valid tags array', () => {
    allPrompts.forEach(prompt => {
      if ('tags' in prompt) {
        expect(Array.isArray(prompt.tags)).toBe(true)
        prompt.tags.forEach(tag => {
          expect(typeof tag).toBe('string')
          expect(tag.length).toBeGreaterThan(0)
        })
      }
    })
  })
})
