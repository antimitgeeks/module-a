import { useState, useCallback } from 'react';
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import WidgetPreviewListItem from './WidgetPreviewListItem';

export default function WidgetPreviewList({ ITEMS }) {
  const [items, setItems] = useState(ITEMS);
  const handleDragEnd = useCallback(({ source, destination }) => {
    setItems(oldItems => {
      const newItems = oldItems.slice();
      const [temp] = newItems.splice(source.index, 1);
      newItems.splice(destination.index, 0, temp);
      // settingsListOrderUpdate(newItems);
      return newItems;
    });

  }, []);

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="root">
        {provided => {
          return (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {items.map((item, index) => (
                <WidgetPreviewListItem
                  key={item.id}
                  id={item.id}
                  index={index}
                  title={item.title}
                  image={item.image}
                  length={ITEMS.length}
                />
              ))}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </DragDropContext>
  );
}