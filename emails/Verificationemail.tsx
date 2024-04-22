import React from 'react';
import { Html, Head, Font, Preview, Heading, Row, Section, Text, Button } from '@react-email/components';

interface VerificationEmailProps {
  username: string;
  otp: string;
}

export const VerificationEmail: React.FC<VerificationEmailProps> = ({ username, otp }) => {
  return (
  <Html lang='en' dir='ltr'>
  <Head>
    <title>Verification Code</title>
    <Font
    fontFamily='Roboto'
    fallbackFontFamily='Verdana'
    webFont={
        {
            url:'https://fonts.googleapis.com/css?family=Roboto',
            format:'woff2'
        }}
        fontWeight={400}
        fontStyle='normal'
    />
  </Head>
  <Preview>Here&apos;s your Verification code: {otp}</Preview>
  <Section>
    <Row>
        <Heading as='h2'>Hello {username},</Heading>
    </Row>
    <Row>
    <Text>
        Thankyou for registration, Please use the following verification code to complete your registration:
    </Text>
    </Row>
    <Row>
        <Text>{otp}</Text>
    </Row>
    <Row>
        <Text>
            If you did not request this code, please ignore this email
        </Text>
    </Row>
    {/* <Row>
        <Button href={`http://localhost:3000/verify/${username}`} style={{color:'#61dafb'}}>

        </Button>
    </Row> */}
   
  </Section>
  </Html>
  );
}



