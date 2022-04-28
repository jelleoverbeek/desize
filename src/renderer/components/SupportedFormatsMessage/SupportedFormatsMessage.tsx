import React from 'react';
import APP_CONFIG from '../../../config';

const SupportedFormatsMessage: React.FunctionComponent = (): JSX.Element => (
  <p className="paragraph--small">
    Supported formats are
    {APP_CONFIG.supportedFileTypes.map((fileType, index) => {
      const amount = APP_CONFIG.supportedFileTypes.length - 1;
      return (
        <span className="instructions__file-type" key={fileType.title}>
          {' '}
          {fileType.title}
          {index !== amount && index !== amount - 1 ? ', ' : null}
          {index === amount - 1 ? ' and ' : null}
        </span>
      );
    })}
    .
  </p>
);

export default SupportedFormatsMessage;
