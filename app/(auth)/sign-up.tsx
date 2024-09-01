import { Alert, Image, ScrollView, Text, View } from "react-native";
import { useSignUp } from '@clerk/clerk-expo
import { Link, router } from "expo-router";
import { icons, images } from "@/constants";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";
import InputField from "@/components/InputField";
import { useState } from "react";
export default function SignUp() {
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const { isLoaded, signUp, setActive } = useSignUp()
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
 const [pendingVerification, setPendingVerification]= useState(
  {
    state:'default',
    error:'',
    code:'',
  }
 );
  const onSignUpPress = async () => {
    if (!isLoaded) {
      return;
    }

    try {
      await signUp.create({
        emailAddress:form.email,
        password:form.password,
      });

      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setPendingVerification({
        ...pendingVerification,
        state:'pending'
      })
    } catch (err: any) {
      // See https://clerk.com/docs/custom-flows/error-handling
      // for more info on error handling
      console.error(JSON.stringify(err, null, 2));
    }
  };

  const onPressVerify = async () => {
    if (!isLoaded) return;
  
    try {
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code:pendingVerification.code
      });

      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
       setPendingVerification({...pendingVerification,
        state:'success'
       })
      } else {
          setPendingVerification({...pendingVerification, error:'verification failed',
        state:'failed'})
      }
    } catch (err: any) {
       setPendingVerification({...pendingVerification, error:err.errors[0].longMessage,
        state:'failed'})
    }
  };

  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[250px]">
          <Image source={images.signUpCar} className="z-0 w-full h-[250px]" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute bottom-5 left-5">
            Create Your Account
          </Text>
        </View>
        <View className="p-5">
          <InputField
            label="Name"
            placeholder="Enter name"
            icon={icons.person}
            value={form.name}
            onChangeText={(value) => setForm({ ...form, name: value })}
          />
          <InputField
            label="Email"
            placeholder="Enter email"
            icon={icons.email}
            textContentType="emailAddress"
            value={form.email}
            onChangeText={(value) => setForm({ ...form, email: value })}
          />
          <InputField
            label="Password"
            placeholder="Enter password"
            icon={icons.lock}
            secureTextEntry={true}
            textContentType="password"
            value={form.password}
            onChangeText={(value) => setForm({ ...form, password: value })}
          />
          <CustomButton
            title="Sign Up"
            onPress={onSignUpPress}
            className="mt-6"
          />
          {/* <OAuth /> */}
          <Link
            href="/sign-in"
            className="text-lg text-center text-general-200 mt-10"
          >
            Already have an account?{" "}
            <Text className="text-primary-500">Start your journey</Text>
          </Link>
        </View>
        {/* Verification modal */}
      </View>
    </ScrollView>
  );
};

