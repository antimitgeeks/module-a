import { Card, Page, Layout, TextContainer, Text, InlineStack, Button, Icon, Box, InlineGrid, BlockStack, } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom';
import APIServices from "../services/APIServices";
import WidgetPreviewList from '../components/WidgetPreviewList';




export default function PageName() {
  const { t, i18n } = useTranslation();

  const location = useLocation();
  const [shopUrl, setShopUrl] = useState('');
  const APIServ = new APIServices();
  const [appSettings, setAppSettings] = useState('');
  const [extensions, setExtensions] = useState(false);
  const [item, setItem] = useState([]);
  const [checked, setChecked] = useState(true);





  const [appSettingList, setAppSettingList] = useState([]);
  
  useEffect(() => {
    getShopUrl();
}, [location.search]);
const getShopUrl = () => {
  try {
      const params = new URLSearchParams(location.search);
      const shop = params.get('shop');

      if (!shop) {
          console.error('Shop URL parameter is missing');
          return;
      }

      setShopUrl(shop);

      getPartnerInfo(shop)
          .then(() => getOrderSettings())
          .then(() => getExtensionsList(shop))
          .catch(error => {
              console.error('Error fetching shop data:', error);
          });
  } catch (error) {
      console.error('Error parsing URL parameters:', error);
  }
};
const getExtensionsList = async (shop) => {
  try {
      const resp = await APIServ.getExtensions();
      console.log(resp)

      if (resp?.status && resp?.result) {
          const { checkoutPageId } = resp.result;
          const menuItems = [];

          const shopName = shop.replace(".myshopify.com", "");
          const thankYouPageUrl = `https://admin.shopify.com/store/${shopName}/settings/checkout/editor/profiles/${checkoutPageId}?page=thank-you&context=apps`;
          const customerPageUrl = `https://admin.shopify.com/store/${shopName}/settings/checkout/editor/profiles/${checkoutPageId}?page=customer-account-order-status&context=apps`;
          menuItems.push({
              content: t("Setting.thankyouPage"),
              onAction: () => handleExtensionsAction(thankYouPageUrl),
          });
          menuItems.push({
              content: t("Setting.orderStatus"),
              onAction: () => handleExtensionsAction(customerPageUrl),
          });
          setExtensions(menuItems);
      } else {
          console.warn('No extensions found or status is not successful');
      }
  } catch (error) {
      console.error('Error fetching extensions list:', error.response || error.message);
  }
};

const getOrderSettings = async () => {
  try {
      const resp = await APIServ.getSettings();
      if (resp?.status && resp?.result) {
          const { result } = resp;
          setAppSettings(result);

          const { orderManage = {}, contactInformation, shippingDetails, orderItems, cancelOrder, support } = result;
          const dynamicItems = [];
          const settingsConfig = [
              { condition: contactInformation?.isOn, id: "3", title: t("Setting.constctInformation"), image: "Contact", positionKey: "contactInformation" },
              { condition: shippingDetails?.isOn, id: "4", title: t("Setting.updateAddress"), image: "Map", positionKey: "updateAddress" },
              { condition: orderItems?.isOn, id: "5", title: t("Setting.orderItems"), image: "OrderEdit", positionKey: "orderItems" },
              { condition: cancelOrder?.isOn, id: "6", title: t("Setting.orderCancel"), image: "OrderCancel", positionKey: "cancelOrder" },
              { condition: false, id: "1", title: t("Setting.orderActions"), image: "OrderList", positionKey: "orderActions" },
              { condition: support?.isOn, id: "2", title: t("Setting.contactSupport"), image: "Support", positionKey: "contactSupport" },
          ];
          settingsConfig.forEach(({ condition, id, title, image, positionKey }) => {
              if (condition) {
                  dynamicItems.push({
                      position: orderManage[positionKey] ?? dynamicItems.length,
                      item: { id, title, image }
                  });
              }
          });
          const updatedItems = dynamicItems
              .sort((a, b) => a.position - b.position)
              .map(({ item }) => item);

          setItem(updatedItems);
      } else {
          console.warn('Settings not available or invalid response');
      }
  } catch (error) {
      console.error('Error fetching order settings:', error?.response || error?.message || error);
  }
};


// Fetch and update partner information based on the shop identifier
const getPartnerInfo = async (shop) => {
  try {
      const resp = await APIServ.getPartnerInfoData();
      const shopName = shop.replace(".myshopify.com", "");

      const returnUrl = `https://admin.shopify.com/store/${shopName}/apps/account-editor`;
      if (resp?.status && resp?.result !== null) {
          const languageKey = resp?.result?.languageId?.key;
          if (languageKey) {
              i18n.changeLanguage(languageKey);

              // App settings box list
              const appSetting = [
                  {
                      title: t("Setting.boxOneTitle"),
                      description: t("Setting.boxOneDesc"),
                      // icon: AppSetting1,
                      url: "orderediting"
                  },
                  {
                      title: t("Setting.boxTwoTitle"),
                      description: t("Setting.boxTwoDesc"),
                      // icon: AppSetting2,
                      url: "ordercancellation"
                  }
              ];

              if (resp?.result?.planName === 'enterprise') {
                  appSetting.push({
                      title: t("Setting.boxThreeTitle"),
                      description: t("Setting.boxThreeDesc"),
                      // icon: AppSetting3,
                      url: "upsell"
                  });     
              }
              setAppSettingList(appSetting);
          } else {
              console.warn('No language key found in partner information');
          }
      } else {
          window.open(returnUrl, '_parent');
      }
  } catch (error) {
      console.error('Error fetching partner information:', error.response || error.message);
      window.open(returnUrl, '_parent');
  }
};


  return (
    <Page>
      <Layout  >
       <InlineStack wrap={false} align="start" blockAlign="center" gap="400">
        <Text  variant="headingLg" as="h2">APP SETTINGS</Text>
      </InlineStack>
      </Layout>
      <div style={{ width: "100%", margin: "20px",  }}>

      {
     !checked ?

      <Box  as={'div'} >
          {/*App settings card grid start*/}
           <InlineGrid gap="600" columns={{ "xs": 1, "lg": 2 }}>
            {appSettingList.map((setting, index) => (
                <Box key={index} as={'div'} className="ace-settings-box" >
                    <Box key={index} background="bg-surface-active" as={'div'} padding="300" borderRadius="200" >
                        <Box as={'div'}>
                            <InlineStack wrap={false} blockAlign="center" gap="600">
                                <Box as={'div'} >
                                    <InlineStack wrap={false} blockAlign="center" gap="200">
                                        {/* <Image source={setting.icon} alt="setting" /> */}
                                        <BlockStack gap="100">
                                            <Text variant="headingXs" as="h5">{setting.title}</Text>
                                            <Text variant="bodySm" as="p" tone="subdued">{setting.description}</Text>
                                        </BlockStack>
                                    </InlineStack>
                                </Box>
                                <Box as={'div'} >
                                    <Button variant="plain" onClick={() => handleUrlOpen(setting.url)}>
                                      {/* <Icon source={ArrowRightIcon} tone="base" /> */}
                                      </Button>
                                </Box>
                            </InlineStack>
                        </Box>
                    </Box>
                </Box>
            ))}
        </InlineGrid>
        {/*App settings card grid end*/}
    </Box> :
    <Box as={'div'} >
   {/*App settings card inline grid start*/}
   <InlineGrid gap="600" columns={{ "xs": 1, "lg": 2 }}>
     
       <Box  as={'div'} >
           <BlockStack gap="400">
               {appSettingList.map((setting, index) => (
                   <Box key={index} as={'div'} className="ace-settings-box" >
                       <Box key={index} background="bg-surface-active" as={'div'} padding="300" borderRadius="200" onClick={() => handleUrlOpen(setting.url)}>
                           <Box as={'div'} >
                               <InlineStack wrap={false} blockAlign="center" gap="600">
                                   <Box as={'div'} >
                                       <InlineStack wrap={false} blockAlign="center" gap="200">
                                           {/* <Image source={setting.icon} alt="setting" /> */}
                                           <BlockStack gap="100">
                                               <Text variant="headingXs" as="h5">{setting.title}</Text>
                                               <Text variant="bodySm" as="p" tone="subdued">{setting.description}</Text>
                                           </BlockStack>
                                       </InlineStack>
                                   </Box>
                                   <Box as={'div'} >
                                       <Button variant="plain" onClick={() => handleUrlOpen(setting.url)}>ICON</Button>
                                   </Box>
                               </InlineStack>
                           </Box>
                       </Box>
                   </Box>
               ))}
           </BlockStack>
       </Box>
       {/*Enable settings list start*/}
       <Box as={'div'} padding="400" borderRadius="200" borderWidth="0165">
           {
               (item.length > 0 && checked) && <WidgetPreviewList ITEMS={item}  />
           }
       </Box>
       {/*Enable settings list end*/}
   </InlineGrid>
   {/*App settings card inline grid end*/}
</Box>}
</div>
    </Page>
    
  );
}
