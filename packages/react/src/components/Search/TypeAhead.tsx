import React, {
  forwardRef,
  ReactNode,
  useMemo,
  useRef,
  useState,
  useEffect,
  cloneElement,
  isValidElement,
} from 'react';
import cx from 'classnames';
import { usePrefix } from '../../internal/usePrefix';

interface TypeAheadProps {
  children?: ReactNode;
  className?: string;
  suggestions?: string[];
  size?: 'xs' | 'sm' | 'md' | 'lg';
  value?: string;
  onSelect?: (suggestion: string) => void;
}

const TypeAhead = forwardRef<HTMLDivElement, TypeAheadProps>(
  (
    {
      className,
      children,
      suggestions = [],
      size = 'md',
      value = '',
      onSelect,
    },
    ref
  ) => {
    const prefix = usePrefix();
    const inputRef = useRef<HTMLInputElement>(null);
    const listboxRef = useRef<HTMLUListElement>(null);
    const [activeIndex, setActiveIndex] = useState<number>(-1);
    const [isOpen, setIsOpen] = useState<boolean>(true);

    const typeaheadClasses = cx(`${prefix}--typeahead`, className);
    const listClasses = cx(`${prefix}--typeahead__list`, {
      [`${prefix}--typeahead__list--${size}`]: size,
    });

    // Filter suggestions - match all keywords
    const filteredSuggestions = useMemo(() => {
      if (!value || value.trim() === '') {
        return [];
      }
      const keywords = value
        .toLowerCase()
        .split(/\s+/)
        .filter((keyword) => keyword.length > 0);

      return suggestions.filter((suggestion) => {
        const lowerSuggestion = suggestion.toLowerCase();
        if (lowerSuggestion === value.toLowerCase()) {
          return false;
        }
        return keywords.every((keyword) => lowerSuggestion.includes(keyword));
      });
    }, [suggestions, value]);

    // Reset active index and open state when suggestions change
    useEffect(() => {
      setActiveIndex(-1);
      setIsOpen(true);
    }, [filteredSuggestions]);

    // Highlight matching keywords
    const highlightMatch = (text: string, query: string) => {
      if (!query || !query.trim()) return text;

      const keywords = query
        .toLowerCase()
        .split(/\s+/)
        .filter((keyword) => keyword.length > 0);

      if (keywords.length === 0) return text;

      const pattern = keywords
        .map((k) => k.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))
        .join('|');
      const regex = new RegExp(`(${pattern})`, 'gi');
      const parts = text.split(regex);

      return (
        <span>
          {parts.map((part, index) => {
            const isMatch = keywords.some(
              (keyword) => part.toLowerCase() === keyword
            );
            return isMatch ? (
              <strong
                key={index}
                className={`${prefix}--typeahead__item-highlight`}>
                {part}
              </strong>
            ) : (
              <span key={index}>{part}</span>
            );
          })}
        </span>
      );
    };

    const handleSelect = (suggestion: string) => {
      onSelect?.(suggestion);
      setActiveIndex(-1);
      setIsOpen(false);
      setTimeout(() => {
        inputRef.current?.focus();
      }, 0);
    };

    const handleBlur = (e: React.FocusEvent) => {
      // Check if focus is moving outside the typeahead component
      const currentTarget = e.currentTarget;
      setTimeout(() => {
        if (!currentTarget.contains(document.activeElement)) {
          setIsOpen(false);
        }
      }, 0);
    };

    const handleFocus = () => {
      if (filteredSuggestions.length > 0) {
        setIsOpen(true);
      }
    };

    const handleInputKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (filteredSuggestions.length === 0) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (activeIndex < filteredSuggestions.length - 1) {
            const newIndex = activeIndex + 1;
            setActiveIndex(newIndex);
            const items = listboxRef.current?.querySelectorAll('button');
            items?.[newIndex]?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (activeIndex > 0) {
            const newIndex = activeIndex - 1;
            setActiveIndex(newIndex);
            const items = listboxRef.current?.querySelectorAll('button');
            items?.[newIndex]?.focus();
          } else if (activeIndex === 0) {
            setActiveIndex(-1);
            inputRef.current?.focus();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setActiveIndex(-1);
          setIsOpen(false);
          break;
      }
    };

    const handleButtonKeyDown = (
      e: React.KeyboardEvent<HTMLButtonElement>,
      index: number
    ) => {
      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          if (index < filteredSuggestions.length - 1) {
            const newIndex = index + 1;
            setActiveIndex(newIndex);
            const items = listboxRef.current?.querySelectorAll('button');
            items?.[newIndex]?.focus();
          }
          break;
        case 'ArrowUp':
          e.preventDefault();
          if (index > 0) {
            const newIndex = index - 1;
            setActiveIndex(newIndex);
            const items = listboxRef.current?.querySelectorAll('button');
            items?.[newIndex]?.focus();
          } else {
            setActiveIndex(-1);
            inputRef.current?.focus();
          }
          break;
        case 'Escape':
          e.preventDefault();
          setActiveIndex(-1);
          setIsOpen(false);
          inputRef.current?.focus();
          break;
      }
    };

    // Clone children to add keyboard handler and ref
    const enhancedChildren = isValidElement(children)
      ? cloneElement(children as React.ReactElement<Record<string, unknown>>, {
          onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => {
            handleInputKeyDown(e);
            const childElement = children as React.ReactElement<{
              onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
            }>;
            const originalOnKeyDown = childElement.props?.onKeyDown;
            if (originalOnKeyDown) {
              originalOnKeyDown(e);
            }
          },
          ref: (node: HTMLInputElement) => {
            inputRef.current = node;
          },
          onFocus: (e: React.FocusEvent<HTMLInputElement>) => {
            handleFocus();
            const childElement = children as React.ReactElement<{
              onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
            }>;
            const originalOnFocus = childElement.props?.onFocus;
            if (originalOnFocus) {
              originalOnFocus(e);
            }
          },
        })
      : children;

    return (
      <div ref={ref} className={typeaheadClasses} onBlur={handleBlur}>
        {enhancedChildren}
        {filteredSuggestions.length > 0 && isOpen && (
          <div className={`${prefix}--typeahead__menu`}>
            <ul ref={listboxRef} className={listClasses}>
              {filteredSuggestions.map((suggestion, index) => {
                const itemClasses = cx(`${prefix}--typeahead__item`, {
                  [`${prefix}--typeahead__item--${size}`]: size,
                  [`${prefix}--typeahead__item--active`]: index === activeIndex,
                });

                return (
                  <li key={index}>
                    <button
                      type="button"
                      className={itemClasses}
                      tabIndex={-1}
                      onClick={() => handleSelect(suggestion)}
                      onKeyDown={(e) =>
                        handleButtonKeyDown(e, index, suggestion)
                      }>
                      {highlightMatch(suggestion, value)}
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
);

TypeAhead.displayName = 'TypeAhead';

export { TypeAhead };
export default TypeAhead;
