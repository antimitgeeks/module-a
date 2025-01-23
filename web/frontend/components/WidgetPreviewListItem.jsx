import { InlineStack, Text, Icon, Tooltip, Box } from '@shopify/polaris';
import { DragHandleIcon, PlusIcon } from '@shopify/polaris-icons';
import { Draggable } from "react-beautiful-dnd";
import { Map, Contact, OrderEdit, OrderList, Support, OrderCancel } from "../assets";
export default function WidgetPreviewListItem(props) {

    //Get props form parent component
    const { id, index, title, image, length, toolTipText } = props;
    //Create images object for looping
    const images = {
        Map,
        Contact,
        OrderEdit,
        OrderList,
        Support,
        OrderCancel
    };

    return (
        <Draggable draggableId={id} index={index}>
            {(provided, snapshot) => {
                return (
                    <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={
                            snapshot.isDragging
                                ? { background: "white", ...provided.draggableProps.style }
                                : provided.draggableProps.style
                        }
                    >
                        <Box as={'div'} id={id} style={{ width: "100%" }}>
                            {/* Setting list Start*/}
                            <InlineStack alignment="center" blockAlign="center">
                                <Box as={'div'} paddingBlockStart="400" width="100%">
                                    <InlineStack alignment="center" gap={{"xs": "100", "lg":"400"}} blockAlign="center">
                                        <div {...provided.dragHandleProps} style={{ paddingBottom: "16px" }}>
                                            <Tooltip content={toolTipText}>
                                                <Icon source={DragHandleIcon} color="inkLightest" />
                                            </Tooltip>
                                        </div>
                                        <Box
                                            as={'div'}
                                            width="91%"
                                            paddingBlockEnd="400"
                                            borderBlockEndWidth="0165"
                                            borderColor={(index === length - 1) ? "transparent" : "bg-fill-selected"}
                                        >
                                            <InlineStack alignment="center" gap="300" blockAlign="center" align="space-between">
                                                <Box as={'div'}>
                                                    <InlineStack alignment="center" gap="300" blockAlign="center">
                                                        <img
                                                            src={images[image] || Support}
                                                            alt={image || 'Support'}
                                                            style={{ width: 14, height: 14 }}
                                                        />
                                                        <Text variant="headingMd" fontWeight="regular" as="h3">{title}</Text>
                                                    </InlineStack>
                                                </Box>
                                                <Box as={'div'}>
                                                    <Icon source={PlusIcon} color="inkLightest" />
                                                </Box>
                                            </InlineStack>
                                        </Box>
                                    </InlineStack>
                                </Box>
                            </InlineStack>
                            {/* Setting list endssss*/}
                        </Box>
                    </div>
                );
            }}
        </Draggable>
    );
}
