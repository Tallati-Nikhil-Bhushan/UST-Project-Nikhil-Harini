import { Component } from '@angular/core';

@Component({
  selector: 'app-articles-blog',
  templateUrl: './articles-blog.component.html',
  styleUrls: ['./articles-blog.component.css']
})
export class ArticlesBlogComponent {

  articles = [
    {
      imageUrl: 'assets/article.png', // Adjust the path accordingly
      title: 'Stories from young people with depression',
      description: 'We put together this page with stories from young people to share some examples of how depression can affect your life and how you can find your path forward.',
      link: 'https://au.reachout.com/mental-health-issues/depression/stories-from-young-people-with-depression'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    {
      imageUrl: 'assets/path_to_image2.png', // Adjust the path accordingly
      title: 'The Power of Insight Building for People with Mental Illness',
      description: 'Learn about the importance of insight building for individuals dealing with mental health issues.',
      link: 'https://www.google.com'
    },
    // Add more articles as needed
  ];

}
