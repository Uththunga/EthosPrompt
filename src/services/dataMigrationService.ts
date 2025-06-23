import { supabase } from '../lib/supabase';
import { categories } from '../data/categories-data';
import type { Category, Subcategory, PromptGroup, Prompt } from '../lib/supabase';

interface SamplePrompt {
  title: string;
  description: string;
  content: string;
  tags: string[];
  industry?: string;
  use_case?: string;
}

class DataMigrationService {
  /**
   * Migrate all categories, subcategories, and prompt groups to the database
   */
  async migrateCategories(): Promise<void> {
    try {
      console.log('Starting category migration...');

      for (const category of categories) {
        // Insert category
        const categoryData: Category = {
          id: category.id,
          name: category.name,
          icon: category.icon.name || 'BookOpen', // Use icon name
          description: category.description,
          prompt_count: category.promptCount,
          bg_gradient: category.bgGradient,
          trending: category.trending || false,
          featured: category.featured || false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        };

        const { error: categoryError } = await supabase
          .from('categories')
          .upsert(categoryData);

        if (categoryError) {
          console.error(`Error inserting category ${category.id}:`, categoryError);
          continue;
        }

        console.log(`✅ Migrated category: ${category.name}`);

        // Insert subcategories
        for (const subcategory of category.subcategories) {
          const subcategoryData: Subcategory = {
            id: subcategory.id,
            category_id: category.id,
            name: subcategory.name,
            description: subcategory.description,
            examples: subcategory.examples,
            skill_level: subcategory.skillLevel.toLowerCase() as 'beginner' | 'intermediate' | 'advanced',
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString()
          };

          const { error: subcategoryError } = await supabase
            .from('subcategories')
            .upsert(subcategoryData);

          if (subcategoryError) {
            console.error(`Error inserting subcategory ${subcategory.id}:`, subcategoryError);
            continue;
          }

          console.log(`  ✅ Migrated subcategory: ${subcategory.name}`);

          // Insert prompt groups if they exist
          if (subcategory.promptGroups) {
            for (const promptGroup of subcategory.promptGroups) {
              const promptGroupData: PromptGroup = {
                id: promptGroup.id,
                subcategory_id: subcategory.id,
                name: promptGroup.name,
                created_at: new Date().toISOString(),
                updated_at: new Date().toISOString()
              };

              const { error: promptGroupError } = await supabase
                .from('prompt_groups')
                .upsert(promptGroupData);

              if (promptGroupError) {
                console.error(`Error inserting prompt group ${promptGroup.id}:`, promptGroupError);
                continue;
              }

              console.log(`    ✅ Migrated prompt group: ${promptGroup.name}`);
            }
          }
        }
      }

      console.log('✅ Category migration completed successfully!');

    } catch (error) {
      console.error('Error in category migration:', error);
      throw error;
    }
  }

  /**
   * Generate and insert sample prompts for each subcategory
   */
  async generateSamplePrompts(): Promise<void> {
    try {
      console.log('Starting sample prompt generation...');

      for (const category of categories) {
        for (const subcategory of category.subcategories) {
          // Generate 3 beginner-level prompts for each subcategory
          const samplePrompts = this.generatePromptsForSubcategory(
            category.name,
            subcategory.name,
            subcategory.description,
            subcategory.examples
          );

          for (const samplePrompt of samplePrompts) {
            const promptData: Omit<Prompt, 'id' | 'created_at' | 'updated_at'> = {
              title: samplePrompt.title,
              description: samplePrompt.description,
              content: samplePrompt.content,
              category_id: category.id,
              subcategory_id: subcategory.id,
              prompt_group_id: subcategory.promptGroups?.[0]?.id || null,
              tags: samplePrompt.tags,
              industry: samplePrompt.industry || null,
              use_case: samplePrompt.use_case || null,
              skill_level: 'beginner',
              access_type: 'free'
            };

            const { error: promptError } = await supabase
              .from('prompts')
              .insert(promptData);

            if (promptError) {
              console.error(`Error inserting prompt for ${subcategory.name}:`, promptError);
              continue;
            }
          }

          console.log(`  ✅ Generated ${samplePrompts.length} prompts for: ${subcategory.name}`);
        }
      }

      console.log('✅ Sample prompt generation completed successfully!');

    } catch (error) {
      console.error('Error in sample prompt generation:', error);
      throw error;
    }
  }

  /**
   * Generate sample prompts for a specific subcategory
   */
  private generatePromptsForSubcategory(
    categoryName: string,
    subcategoryName: string,
    description: string,
    examples: string[]
  ): SamplePrompt[] {
    const prompts: SamplePrompt[] = [];

    // Generate 3 prompts based on the subcategory
    for (let i = 1; i <= 3; i++) {
      const example = examples[Math.min(i - 1, examples.length - 1)] || 'Create content';
      
      prompts.push({
        title: `${subcategoryName} Prompt ${i}`,
        description: `A beginner-friendly prompt for ${subcategoryName.toLowerCase()}. ${description}`,
        content: `You are an expert in ${categoryName.toLowerCase()}. Help me with ${example.toLowerCase()}. 

Please provide:
1. A clear and actionable approach
2. Step-by-step guidance
3. Best practices to follow
4. Common mistakes to avoid

Context: [Describe your specific situation here]
Goal: [What you want to achieve]
Constraints: [Any limitations or requirements]

Please tailor your response to be practical and immediately actionable.`,
        tags: [
          categoryName.toLowerCase().replace(/\s+/g, '-'),
          subcategoryName.toLowerCase().replace(/\s+/g, '-'),
          'beginner',
          'template'
        ],
        industry: this.getIndustryForCategory(categoryName),
        use_case: example
      });
    }

    return prompts;
  }

  /**
   * Get appropriate industry tag for a category
   */
  private getIndustryForCategory(categoryName: string): string {
    const industryMap: { [key: string]: string } = {
      'Marketing & Content': 'marketing',
      'Digital Creators': 'content-creation',
      'Education & Teaching': 'education',
      'Software Development': 'technology',
      'Customer Support': 'customer-service',
      'Legal Services': 'legal',
      'HR & Recruitment': 'human-resources',
      'Healthcare': 'healthcare',
      'Data Science & Analysis': 'data-science',
      'Finance & Investing': 'finance',
      'E-commerce & Retail': 'ecommerce',
      'Technology & SaaS': 'technology'
    };

    return industryMap[categoryName] || 'general';
  }

  /**
   * Clear all existing data (use with caution!)
   */
  async clearAllData(): Promise<void> {
    try {
      console.log('⚠️  Clearing all existing data...');

      // Delete in reverse order due to foreign key constraints
      await supabase.from('prompts').delete().neq('id', '00000000-0000-0000-0000-000000000000');
      await supabase.from('prompt_groups').delete().neq('id', 'dummy');
      await supabase.from('subcategories').delete().neq('id', 'dummy');
      await supabase.from('categories').delete().neq('id', 'dummy');

      console.log('✅ All data cleared successfully!');

    } catch (error) {
      console.error('Error clearing data:', error);
      throw error;
    }
  }

  /**
   * Run complete migration (categories + sample prompts)
   */
  async runCompleteMigration(clearFirst: boolean = false): Promise<void> {
    try {
      if (clearFirst) {
        await this.clearAllData();
      }

      await this.migrateCategories();
      await this.generateSamplePrompts();

      console.log('🎉 Complete migration finished successfully!');

    } catch (error) {
      console.error('Error in complete migration:', error);
      throw error;
    }
  }
}

export default new DataMigrationService();
