# Chatbot Setup Guide

## Overview
The Campus Connect application now includes an AI-powered chatbot that understands the complete app structure and can provide intelligent, context-aware assistance for all campus services, library management, canteen orders, academic resources, and general campus information.

## Features
- **App-Aware Intelligence**: Understands complete Campus Connect structure and workflows
- **Context-Aware Responses**: Provides specific guidance based on user roles and modules
- **Comprehensive Knowledge**: Covers all modules (Library, Canteen, Academic, Campus, Dashboard)
- **Role-Based Assistance**: Tailored responses for Students, Professors, Librarians, Canteen Staff, and Admins
- **Dual Theme Support**: Integrates with both Classic and Cyber themes
- **Real-time Chat**: Instant messaging interface with typing indicators
- **Floating Interface**: Always accessible floating chat button
- **Mock & Real AI**: Works with both intelligent mock responses and real OpenAI API

## Environment Setup

### 1. Create Environment File
Create a `.env.local` file in the project root with the following variables:

```env
# MongoDB Configuration
VITE_MONGODB_URI=mongodb://localhost:27017/campus-connect

# Clerk Authentication
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_publishable_key_here

# OpenAI API Configuration (Optional)
VITE_OPENAI_API_KEY=sk-your_openai_api_key_here
VITE_OPENAI_MODEL=gpt-3.5-turbo
```

### 2. OpenAI API Key (Optional)
If you want to use real AI responses instead of mock responses:

1. Get an OpenAI API key from [OpenAI Platform](https://platform.openai.com/api-keys)
2. Add it to your `.env.local` file as `VITE_OPENAI_API_KEY`
3. The chatbot will automatically use the real OpenAI API

**Note**: Without the API key, the chatbot will use intelligent mock responses that are still very helpful for campus-related queries.

## Usage

### For Users
1. Look for the floating chat button in the bottom-right corner
2. Click to open the chat interface
3. Type your questions about campus services
4. The bot will provide helpful responses and guidance

### For Developers
The chatbot is integrated into the main app layout and will appear on all protected routes. It includes:

- **Mock API**: `src/lib/api/mock-chat.ts` - Intelligent mock responses
- **OpenAI API**: `src/lib/api/openai-chat.ts` - Real AI integration
- **Component**: `src/components/Chatbot.tsx` - Main chat interface
- **Configuration**: Environment-based API selection

## API Integration

### App Guide Integration
The chatbot uses a comprehensive app guide (`src/lib/app_guide.json`) that includes:
- Complete module descriptions and features
- Role-based permissions and capabilities
- Step-by-step workflows for common tasks
- Common queries and help topics
- Feature lists and access controls

### Mock Responses (Default)
The mock API provides intelligent responses based on the app guide for:
- **Library**: Book borrowing/returning, QR code scanning, due dates, fines
- **Canteen**: Pre-ordering system, menu viewing, order tracking, payments
- **Academic**: Study materials, assignments, study groups, forums
- **Campus**: Events, facility booking, announcements, services
- **General**: Dashboard, themes, permissions, navigation

### Real OpenAI Integration
When an API key is provided, the chatbot uses OpenAI's GPT model with:
- Complete app guide context in system prompts
- Campus-specific workflows and processes
- Role-based response customization
- Professional and helpful tone
- Error handling and fallbacks

## Customization

### Adding New Responses
Edit `src/lib/api/mock-chat.ts` to add new keyword-based responses:

```typescript
const campusKeywords = {
  // Add new keywords and responses
  'new-service': 'Response for new service...',
};
```

### Updating App Guide
Modify `src/lib/app_guide.json` to add new modules, features, or workflows:

```json
{
  "modules": {
    "NewModule": {
      "description": "Description of new module",
      "features": ["Feature 1", "Feature 2"],
      "access_roles": ["Student", "Professor"]
    }
  }
}
```

### Styling
The chatbot automatically adapts to the current theme (Classic/Cyber). Customize styles in `src/components/Chatbot.tsx`.

### System Prompts
For OpenAI integration, modify the system prompt in `src/lib/api/openai-chat.ts` to change the bot's behavior and knowledge base.

## Security Notes

1. **Environment Variables**: Never commit `.env.local` to version control
2. **API Keys**: Keep OpenAI API keys secure and rotate them regularly
3. **Frontend Exposure**: In production, consider using a backend proxy for API calls
4. **Rate Limiting**: Implement rate limiting for production use

## Troubleshooting

### Chatbot Not Appearing
- Check if you're on a protected route (requires authentication)
- Verify the component is properly imported in `App.tsx`

### API Errors
- Check environment variables are properly set
- Verify API key format and validity
- Check browser console for error messages

### Mock Responses Not Working
- Ensure the mock API is properly imported
- Check for JavaScript errors in the console

## Future Enhancements

Potential improvements for the chatbot:
- Voice input/output capabilities
- File upload support for documents
- Integration with campus database
- Multi-language support
- Advanced conversation memory
- Integration with specific campus services APIs
