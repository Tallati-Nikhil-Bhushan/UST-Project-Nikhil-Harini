import { Component, ElementRef, inject, TemplateRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { API_KEY_CONF } from 'src/config';
import { GeminiConfig } from './chat-form';
import { ChatdataService } from '../chatdata.service';
import { ConvertTextToHtmlPipe } from "./convert-text-to-html.pipe";

@Component({
  selector: 'app-chatbot',
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent {
  @ViewChild("messagesContainer") private messagesContainer!: ElementRef;
  private dataService = new ChatdataService();
  public messagesHistory: { role: string; parts: string }[] = [];
  public userMessage: string = ''; // Bind this with ngModel to capture the user message

  // Default API config (no need for user to input these)
  apiKey = "AIzaSyDKnxxabL8aDjVx2mXK1DgfjjqZ2vY9eLQ";
  temperature = 0.2;
  bot = { id: 1, value: "Gemini" };
  model = "gemini-1.0-pro";

  ngOnInit(): void {
    this.userMessage = "You are a mental health support chatbot. Your role is to guide users through improving their mental well-being by offering empathetic responses, asking reflective questions, and suggesting mindfulness exercises. Begin the conversation by asking the user about their emotional state and encouraging them to express their feelings. Provide suggestions such as deep breathing exercises, journaling, or practicing gratitude when needed. Focus on listening, offering encouragement, and providing positive reinforcement, while helping the user to identify ways to manage stress and anxiety. Use a compassionate tone throughout the conversation.";
    this.sendMessage();
    this.userMessage = "";
  }

  ngAfterViewInit() {
    this.scrollToBottom();
  }

  scrollToBottom(): void {
    if (this.messagesContainer && this.messagesContainer.nativeElement) {
      try {
        this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
      } catch (err) {
        console.error("Error scrolling to bottom:", err);
      }
    }
  }

  sendMessage() {
    if (!this.userMessage.trim()) return; // Prevent sending empty or whitespace messages

    // Append the user's message
    this.messagesHistory.push(
      {
        role: 'user',
        parts: this.userMessage
      },
      {
        role: 'model',
        parts: ''
      }
    );

    if(this.messagesHistory.length == 2){
      this.messagesHistory[0].parts = '';
    }
    this.scrollToBottom();

    // Send the message to the backend service
    this.dataService.generateContentWithGeminiPro(
      this.userMessage,
      this.messagesHistory,
      { apiKey: this.apiKey, temperature: this.temperature, bot: this.bot, model: this.model }
    ).subscribe({
      next: (res: any) => {
        res = res;
        this.messagesHistory = this.messagesHistory.slice(0,-2); // Remove the placeholders
        this.messagesHistory.push(
          { role: 'user', parts: this.userMessage },
          { role: 'model', parts: res }
        );
        this.scrollToBottom();
        this.userMessage = '';
      },
      error: (error: any) => {
        console.error("Error generating content:", error);
        this.messagesHistory.push({
          role: 'model',
          parts: 'Sorry, something went wrong. Please try again later.'
        });
        this.scrollToBottom();
      }
    });
  }
}
