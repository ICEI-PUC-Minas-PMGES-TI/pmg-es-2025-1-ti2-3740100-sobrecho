import {
	CategorySection,
	CtaSection,
	HeroSection,
	HowItWorksSection,
	SustainabilitySection
} from '@/components/landing/sections';

export function LandingPage() {
	return (
		<main>
			<HeroSection />
			<CategorySection />
			<SustainabilitySection />
			<HowItWorksSection />
			<CtaSection />
		</main>
	);
}
