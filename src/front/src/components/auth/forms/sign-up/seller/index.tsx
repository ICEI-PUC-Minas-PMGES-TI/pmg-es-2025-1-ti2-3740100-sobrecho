'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import {
	StepButtons,
	StoreStep,
	UserStep
} from '@/components/auth/forms/sign-up/seller/steps';
import { AuthLayout } from '@/components/auth/layout';
import { Progress, Form } from '@/components/ui';

import { useTypedSelector } from '@/hooks';
import { AuthCreators } from '@/redux/reducers';
import { sellerSignUpFormSchema } from '@/schemas/auth/forms';
import { SellerSignUpFormType } from '@/types/auth/forms';
import { zodResolver } from '@hookform/resolvers/zod';

export function SellerSignUpForm() {
	const methods = useForm<SellerSignUpFormType>({
		resolver: zodResolver(sellerSignUpFormSchema),
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

		return methods.trigger(fields as (keyof SellerSignUpFormType)[]);
	};

	const isCurrentStepComplete = () => {
		const values = methods.getValues();

		if (currentStep === 1) {
			return Boolean(
				values.name && values.email && values.phone && values.birthdate && values.password
			);
		}
		if (currentStep === 2) {
			return Boolean(
				values.store.name &&
					values.document &&
					values.store.description &&
					values.store.image
			);
		}
		return false;
	};

	const handleNext = async () => {
		const valid = await validateCurrentStep();
		if (valid) nextStep();
	};

	const {
		signUpSeller: { loading }
	} = useTypedSelector((state) => state.auth);
	const dispatch = useDispatch();

	const onSubmit = async (data: SellerSignUpFormType) => {
		dispatch(AuthCreators.postAuthSignUpSellerRequest(data));
	};

	return (
		<>
			<AuthLayout
				title="Criar conta de vendedor"
				description="Preencha os campos abaixo para começar a vender seus produtos."
			>
				<FormProvider {...methods}>
					<Form {...methods}>
						<div className="space-y-4">
							<div className="space-y-2">
								<div className="flex items-center justify-between text-sm text-muted-foreground">
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
			</AuthLayout>
			<span className="flex w-full items-center justify-center text-sm text-muted-foreground">
				Já tem uma conta?{' '}
				<Link
					href="/sign-in"
					className="ml-1 text-primary underline-offset-4 hover:underline"
				>
					Entrar
				</Link>
			</span>
		</>
	);
}
