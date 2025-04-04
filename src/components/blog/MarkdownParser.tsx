// MarkdownParser.jsx
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

const MarkdownParser = ({ content }) => {
  const components = {
    // Custom components for your special tags
    tw: ({ node, ...props }) => <Typewriter text={props.children} />,
    ttr: ({ node, ...props }) => <TapToReveal>{props.children}</TapToReveal>,
    float: ({ node, position, width, ...props }) => (
      <FloatingModule position={position} width={width}>
        {props.children}
      </FloatingModule>
    ),
    img: ({ node, alt, ...props }) => (
      <img 
        {...props} 
        alt={alt || node.properties.alt} 
        loading="lazy" 
      />
    )
  };

  return (
    <ReactMarkdown
      components={components}
      remarkPlugins={[remarkGfm]}
    >
      {content}
    </ReactMarkdown>
  );
};

export default MarkdownParser;