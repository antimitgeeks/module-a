import { Card, Page, Layout, TextContainer, Text, InlineStack, Button, Icon, } from "@shopify/polaris";
import { TitleBar } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";

export default function PageName() {
  const { t } = useTranslation();
  return (
    <Page>
      <TitleBar />
      <Layout>
       <InlineStack wrap={false} align="start" blockAlign="center" gap="200">
             
                <Text variant="headingLg" as="h2">APP SETTINGS</Text>
      </InlineStack>
      </Layout>
    </Page>
    // <Page>
    //   <TitleBar title={t("PageName.title")}>
    //     <button variant="primary" onClick={() => console.log("Primary action")}>
    //       {t("PageName.primaryAction")}
    //     </button>
    //     <button onClick={() => console.log("Secondary action")}>
    //       {t("PageName.secondaryAction")}
    //     </button>
    //   </TitleBar>
    //   <Layout>
    //     <Layout.Section>
    //       <Card sectioned>
    //         <Text variant="headingMd" as="h2">
    //           {t("PageName.heading")}
    //         </Text>
    //         <TextContainer>
    //           <p>{t("PageName.body")}</p>
    //         </TextContainer>
    //       </Card>
    //       <Card sectioned>
    //         <Text variant="headingMd" as="h2">
    //           {t("PageName.heading")}
    //         </Text>
    //         <TextContainer>
    //           <p>{t("PageName.body")}</p>
    //         </TextContainer>
    //       </Card>
    //     </Layout.Section>
    //     <Layout.Section secondary>
    //       <Card sectioned>
    //         <Text variant="headingMd" as="h2">
    //           {t("PageName.heading")}
    //         </Text>
    //         <TextContainer>
    //           <p>{t("PageName.body")}</p>
    //         </TextContainer>
    //       </Card>
    //     </Layout.Section>
    //   </Layout>
    // </Page>
  );
}
