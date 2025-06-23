# Prompt Card Components

This directory contains enhanced prompt card components that provide improved user experience with in-place prompt viewing and easy copy functionality.

## Components

### 1. PromptCard.tsx (Enhanced)
The main prompt card component with modal integration.

**Features:**
- Modal popup for full prompt viewing
- Enhanced copy functionality with visual feedback
- Favorites integration
- Access control support
- Responsive design

**Usage:**
```tsx
import PromptCard from './components/prompts/PromptCard';

<PromptCard 
  prompt={promptData}
  showPreview={true}
  className="custom-class"
/>
```

**Props:**
- `prompt: Prompt` - The prompt data from Supabase
- `showPreview?: boolean` - Show preview content in card (default: false)
- `className?: string` - Additional CSS classes

### 2. ExpandablePromptCard.tsx
Alternative card component with inline expansion.

**Features:**
- Inline content expansion without modal
- Same rich content display as modal
- Smooth animations
- Better for mobile devices
- Preserves page context

**Usage:**
```tsx
import ExpandablePromptCard from './components/prompts/ExpandablePromptCard';

<ExpandablePromptCard 
  prompt={promptData}
  showPreview={true}
  defaultExpanded={false}
  className="custom-class"
/>
```

**Props:**
- `prompt: Prompt` - The prompt data from Supabase
- `showPreview?: boolean` - Show preview content when collapsed (default: false)
- `defaultExpanded?: boolean` - Start in expanded state (default: false)
- `className?: string` - Additional CSS classes

### 3. PromptModal.tsx
Standalone modal component for displaying full prompt content.

**Features:**
- Full prompt content display with formatting
- Copy functionality with visual feedback
- Tags and metadata display
- Use cases and examples
- Favorites integration
- Access control support

**Usage:**
```tsx
import PromptModal from './components/prompts/PromptModal';

<PromptModal 
  prompt={promptData}
  isOpen={isModalOpen}
  onClose={() => setIsModalOpen(false)}
/>
```

**Props:**
- `prompt: Prompt` - The prompt data from Supabase
- `isOpen: boolean` - Modal visibility state
- `onClose: () => void` - Function to close modal

## Key Improvements

### 1. In-place Prompt Viewing
- **Modal Version**: Click "View Prompt" to open full content in overlay
- **Expandable Version**: Click "View Full Prompt" to expand inline
- No need to navigate to separate pages

### 2. Enhanced Copy Functionality
- Prominent copy buttons with clear visual feedback
- Success states with green checkmark and "Copied!" message
- Loading states during copy operation
- Error handling with toast notifications
- 2-second timeout for success state

### 3. Better User Experience
- Accessible keyboard navigation
- Responsive design for all screen sizes
- Smooth animations and transitions
- Clear visual hierarchy
- Consistent styling with app theme

### 4. Access Control Integration
- Respects user access levels (free vs premium)
- Shows appropriate upgrade prompts
- Handles authentication requirements
- Graceful fallbacks for restricted content

## Demo Page

Visit `/demo/prompt-cards` to see both components in action with:
- Side-by-side comparison
- Feature comparison table
- Usage instructions
- Interactive examples

## Technical Details

### Dependencies
- React 18+
- React Router DOM
- Lucide React (icons)
- React Hot Toast (notifications)
- Radix UI Dialog (modal primitives)
- Tailwind CSS (styling)

### Accessibility
- ARIA labels and roles
- Keyboard navigation support
- Focus management
- Screen reader compatibility
- High contrast support

### Performance
- Lazy loading of modal content
- Optimized re-renders with React.memo
- Efficient state management
- Minimal bundle impact

## Migration Guide

### From Old PromptCard
If you're using the old PromptCard component:

1. **Import Path**: Update import to use the new component
   ```tsx
   // Old
   import PromptCard from '../components/PromptCard';
   
   // New
   import PromptCard from '../components/prompts/PromptCard';
   ```

2. **Props**: The new component uses Supabase `Prompt` type
   ```tsx
   // Ensure your prompt data matches the Supabase schema
   interface Prompt {
     id: string;
     title: string;
     description: string;
     content: string;
     access_type: 'free' | 'premium';
     skill_level: string;
     // ... other fields
   }
   ```

3. **Features**: New features are automatically available
   - Modal viewing is built-in
   - Enhanced copy functionality works out of the box
   - No additional setup required

### Choosing Between Modal and Expandable
- **Use Modal** for detailed content review and when you want to focus user attention
- **Use Expandable** for quick access and when preserving page context is important
- Both provide the same functionality, just different interaction patterns

## Future Enhancements

Potential improvements for future versions:
- Keyboard shortcuts for copy (Ctrl+C)
- Bulk copy operations
- Prompt comparison mode
- Print-friendly formatting
- Export to various formats
- Collaborative features (sharing, comments)
