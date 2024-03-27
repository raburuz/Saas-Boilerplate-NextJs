import {
  Body,
  Link,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Tailwind,
  Text,
} from "@react-email/components";

export default function MagicLink({
  appName = "Founder",
  email = "example@example.com",
  url = "http://localhost:3000/api/auth/callback/email?callbackUrl=http%3A%2F%2Fapp.localhost%3A3000%2Flogin&token=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx&email=youremail@gmail.com",
}: {
  appName: string,
  email: string;
  url: string;
}) {
  return (
    <Html>
      <Head />
      <Preview>Your {appName} Login Link</Preview>
      <Tailwind>
        <Body className="mx-auto my-auto bg-white font-sans">
          <Container className="mx-auto my-10 max-w-[500px] rounded border border-solid border-gray-200 px-10 py-5">
            <Heading className="mx-0 my-7 p-0 text-center text-xl font-semibold text-black">
              Your {appName} Login Link
            </Heading>
            <Text className="text-sm leading-6 text-black">
              Welcome to {appName}!
            </Text>
            <Text className="text-sm leading-6 text-black">
              Please click the magic link below to sign in to your account.
            </Text>
            <Section className="my-8 text-center">
              <Link
                className="rounded-full bg-black px-6 py-3 text-center text-[12px] font-semibold text-white no-underline"
                href={url}
              >
                Sign in
              </Link>
            </Section>
            <Text className="text-sm leading-6 text-black">
              or copy and paste this URL into your browser:
            </Text>
            <Text className="max-w-sm flex-wrap break-words font-medium text-purple-600 no-underline">
              {url.replace(/^https?:\/\//, "")}
            </Text>
            <Hr className="mx-0 my-6 w-full border border-gray-200" />
            <Text className="text-[12px] leading-6 text-gray-500">
              This email was intended for{" "}
              <span className="text-black">{email}</span>. If you were not
              expecting this email, you can ignore this email. If you are
              concerned about your account&apos;s safety, please reply to this email
              to get in touch with us.
            </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}
