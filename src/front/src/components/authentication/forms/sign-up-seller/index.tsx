'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
	StepButtons,
	StoreStep,
	UserStep
} from '@/components/authentication/forms/sign-up-seller/steps';
import { AuthenticationLayout } from '@/components/authentication/layout';
import { Progress, Form } from '@/components/ui';
import { useTypedSelector } from '@/hooks';
import { AuthCreators } from '@/redux/reducers';
import { signUpSellerFormSchema } from '@/schemas/authentication/forms';
import { SignUpSellerFormType } from '@/types/authentication/forms/sign-up-seller';

export function SignUpSellerForm() {
	const methods = useForm<SignUpSellerFormType>({
		resolver: zodResolver(signUpSellerFormSchema),
		mode: 'onChange',
		defaultValues: {
			name: '',
			email: '',
			password: '',
			birthdate: '',
			phone: '',
			document: '',
			store: {
				name: '',
				description: '',
				image: undefined
			}
		}
	});

	const [currentStep, setCurrentStep] = useState(1);
	const totalSteps = 2;
	const progressValue = (currentStep / totalSteps) * 100;

	const nextStep = () => currentStep < totalSteps && setCurrentStep((s) => s + 1);
	const prevStep = () => currentStep > 1 && setCurrentStep((s) => s - 1);

	const validateCurrentStep = async () => {
		const fields =
			currentStep === 1
				? ['name', 'email', 'password', 'birthdate', 'phone']
				: ['store.name', 'store.description', 'document', 'store.image'];

		return methods.trigger(fields as (keyof SignUpSellerFormType)[]);
	};

	const isCurrentStepComplete = () => {
		const values = methods.getValues();
		const errors = methods.formState.errors;

		const fields =
			currentStep === 1
				? ['name', 'email', 'password', 'birthdate', 'phone']
				: ['store.name', 'store.description', 'document', 'store.image'];

		return fields.every((field) => {
			if (field.includes('.')) {
				const [parent, child] = field.split('.') as [
					'store',
					keyof SignUpSellerFormType['store']
				];
				const hasError = errors?.[parent]?.[child];
				const hasValue = values?.[parent]?.[child];
				return !hasError && Boolean(hasValue);
			} else {
				const key = field as keyof SignUpSellerFormType;
				const hasError = errors?.[key];
				const hasValue = values?.[key];
				return !hasError && Boolean(hasValue);
			}
		});
	};

	const handleNext = async () => {
		const valid = await validateCurrentStep();
		if (valid) nextStep();
	};

	const { loading } = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	function onSubmit(data: SignUpSellerFormType) {
		dispatch(AuthCreators.authSignUpSellerRequest(data));
	}

	return (
		<>
			<AuthenticationLayout
				title="Criar conta de vendedor"
				description="Preencha os campos abaixo para começar a vender seus produtos."
			>
				<FormProvider {...methods}>
					<Form {...methods}>
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="text-muted-foreground flex items-center justify-between text-sm">
									<span>
										Etapa {currentStep} de {totalSteps}
									</span>
									<span>{Math.round(progressValue)}%</span>
								</div>
								<Progress value={progressValue} className="h-2" />
							</div>

							{currentStep === 1 && <UserStep />}
							{currentStep === 2 && <StoreStep />}

							<StepButtons
								current={currentStep}
								total={totalSteps}
								prev={prevStep}
								next={handleNext}
								loading={loading}
								isComplete={isCurrentStepComplete()}
								onSubmit={methods.handleSubmit(onSubmit)}
							/>
						</div>
					</Form>
				</FormProvider>
			</AuthenticationLayout>
			<span className="text-muted-foreground flex w-full items-center justify-center text-sm">
				Já tem uma conta?{' '}
				<Link
					href="/sign-in"
					className="text-primary ml-1 underline-offset-4 hover:underline"
				>
					Entrar
				</Link>
			</span>
		</>
	);
}
