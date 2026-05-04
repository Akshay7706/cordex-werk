import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '../ui/button';
import { cn } from '../../lib/utils';
import { MenuToggleIcon } from '../ui/menu-toggle-icon';
import { SubscribeModal } from '../ui/subscribe-modal';
import { createPortal } from 'react-dom';
import {
	NavigationMenu,
	NavigationMenuContent,
	NavigationMenuItem,
	NavigationMenuLink,
	NavigationMenuList,
	NavigationMenuTrigger,
} from '../ui/navigation-menu';
import {
	CodeIcon,
	GlobeIcon,
	LayersIcon,
	UserPlusIcon,
	Users,
	Star,
	FileText,
	Shield,
	RotateCcw,
	Handshake,
	Leaf,
	HelpCircle,
	BarChart,
	PlugIcon,
	LayoutGrid,
} from 'lucide-react';

export function Navbar() {
	const [open, setOpen] = React.useState(false);
	const [isSubscribeOpen, setIsSubscribeOpen] = React.useState(false);
	const scrolled = useScroll(10);
	const location = useLocation();

	// Close menu on route change
	React.useEffect(() => {
		setOpen(false);
	}, [location.pathname]);

	React.useEffect(() => {
		if (open) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = '';
		}
		return () => {
			document.body.style.overflow = '';
		};
	}, [open]);

	return (
		<header
			className={cn('fixed top-0 left-0 z-[100] w-full transition-all duration-300 border-b border-transparent', {
				'bg-brand-bg/95 backdrop-blur-xl border-brand-primary/20 py-2': scrolled,
				'bg-transparent py-4': !scrolled,
			})}
		>
			<nav className="mx-auto flex w-full container-large items-center justify-between px-6 md:px-12">
				<div className="flex items-center gap-8">
					<Link to="/" className="text-2xl font-serif font-black tracking-tighter text-brand-primary">
						Kreato Space
					</Link>
					<NavigationMenu className="hidden md:flex">
						<NavigationMenuList>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-brand-primary hover:text-brand-accent">
									Product
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-brand-surface p-1 pr-1.5 border border-brand-primary/20 rounded-md shadow-2xl">
									<ul className="grid w-[500px] grid-cols-2 gap-2 p-2">
										{productLinks.map((item, i) => (
											<li key={i}>
												<ListItem {...item} />
											</li>
										))}
									</ul>
									<div className="p-4 border-t border-brand-primary/10 mt-2">
										<p className="text-brand-primary/60 text-sm">
											Interested?{' '}
											<Link to="/contact" className="text-brand-primary font-medium hover:text-brand-accent transition-colors">
												Schedule a demo
											</Link>
										</p>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuItem>
								<NavigationMenuTrigger className="bg-transparent text-brand-primary hover:text-brand-accent">
									Company
								</NavigationMenuTrigger>
								<NavigationMenuContent className="bg-brand-surface p-1 pr-1.5 pb-1.5 border border-brand-primary/20 rounded-md shadow-2xl">
									<div className="grid w-[600px] grid-cols-2 gap-4 p-4">
										<ul className="space-y-2">
											{companyLinks.map((item, i) => (
												<li key={i}>
													<ListItem {...item} />
												</li>
											))}
										</ul>
										<ul className="space-y-1">
											{companyLinks2.map((item, i) => (
												<li key={i}>
													<NavigationMenuLink asChild>
														<Link
															to={item.href}
															className="flex p-3 hover:bg-brand-primary/10 rounded-md items-center gap-x-3 transition-colors text-brand-primary"
														>
															<item.icon className="size-4" />
															<span className="font-medium text-sm">{item.title}</span>
														</Link>
													</NavigationMenuLink>
												</li>
											))}
										</ul>
									</div>
								</NavigationMenuContent>
							</NavigationMenuItem>
							<NavigationMenuLink asChild>
								<Link to="/pricing" className="text-brand-primary text-sm font-medium hover:text-brand-accent transition-colors px-4 py-2">
									Pricing
								</Link>
							</NavigationMenuLink>
						</NavigationMenuList>
					</NavigationMenu>
				</div>
				<div className="hidden items-center gap-4 md:flex">
					<Button variant="ghost" onClick={() => setIsSubscribeOpen(true)}>
						Subscribe
					</Button>
					<Button asChild>
						<Link to="/contact">Get Started</Link>
					</Button>
				</div>
				<Button
					size="icon"
					variant="ghost"
					onClick={() => setOpen(!open)}
					className="md:hidden"
					aria-expanded={open}
					aria-controls="mobile-menu"
					aria-label="Toggle menu"
				>
					<MenuToggleIcon open={open} className="size-6 text-brand-primary" duration={300} />
				</Button>
			</nav>

			{/* Mobile Menu */}
			<MobileMenu open={open} className="flex flex-col justify-between gap-6 overflow-y-auto">
				<div className="flex w-full flex-col gap-y-6 mt-16">
					<div className="flex flex-col gap-2">
						<span className="text-xs uppercase tracking-widest text-brand-primary/50 font-bold px-2">Product</span>
						{productLinks.map((link) => (
							<MobileListItem key={link.title} {...link} />
						))}
					</div>
					<div className="flex flex-col gap-2">
						<span className="text-xs uppercase tracking-widest text-brand-primary/50 font-bold px-2">Company</span>
						{companyLinks.map((link) => (
							<MobileListItem key={link.title} {...link} />
						))}
						{companyLinks2.map((link) => (
							<MobileListItem key={link.title} {...link} />
						))}
					</div>
					<div className="flex flex-col gap-2 px-2">
						<span className="text-xs uppercase tracking-widest text-brand-primary/50 font-bold">More</span>
						<Link to="/pricing" className="text-brand-primary font-medium py-2">Pricing</Link>
					</div>
				</div>
				<div className="flex flex-col gap-4 mt-8 pb-8">
					<Button variant="outline" className="w-full justify-center" onClick={() => setIsSubscribeOpen(true)}>
						Subscribe
					</Button>
					<Button className="w-full justify-center" asChild>
						<Link to="/contact">Get Started</Link>
					</Button>
				</div>
			</MobileMenu>

			<SubscribeModal 
				isOpen={isSubscribeOpen} 
				onClose={() => setIsSubscribeOpen(false)} 
			/>
		</header>
	);
}

function MobileMenu({ open, children, className, ...props }) {
	if (!open || typeof window === 'undefined') return null;

	return createPortal(
		<div
			id="mobile-menu"
			className={cn(
				'bg-brand-bg/98 backdrop-blur-2xl border-t border-brand-primary/10',
				'fixed top-[72px] right-0 bottom-0 left-0 z-40 flex flex-col overflow-hidden md:hidden',
			)}
		>
			<div
				className={cn(
					'size-full p-6 animate-in slide-in-from-top-4 fade-in duration-300 ease-out',
					className,
				)}
				{...props}
			>
				{children}
			</div>
		</div>,
		document.body,
	);
}

function MobileListItem({ title, icon: Icon, href }) {
	return (
		<Link to={href} className="flex items-center gap-4 p-2 rounded-md hover:bg-brand-primary/10 transition-colors">
			<Icon className="size-5 text-brand-primary/70" />
			<span className="text-brand-primary font-medium">{title}</span>
		</Link>
	);
}

function ListItem({ title, description, icon: Icon, href, className, ...props }) {
	return (
		<NavigationMenuLink asChild>
			<Link 
				to={href} 
				className={cn(
					'flex items-start gap-4 p-3 rounded-md hover:bg-brand-primary/5 focus:bg-brand-primary/5 transition-colors group',
					className
				)} 
				{...props}
			>
				<div className="bg-brand-bg flex shrink-0 size-10 items-center justify-center rounded-md border border-brand-primary/10 shadow-sm group-hover:border-brand-accent/50 transition-colors">
					<Icon className="text-brand-primary size-5 group-hover:text-brand-accent transition-colors" />
				</div>
				<div className="flex flex-col gap-1">
					<span className="font-medium text-brand-primary text-sm leading-none">{title}</span>
					{description && <span className="text-brand-primary/60 text-xs leading-snug">{description}</span>}
				</div>
			</Link>
		</NavigationMenuLink>
	);
}

const productLinks = [
	{
		title: 'Services',
		href: '/services',
		description: 'Explore our full range of digital services',
		icon: LayersIcon,
	},
	{
		title: 'Portfolio',
		href: '/portfolio',
		description: 'View our curated gallery of successful projects',
		icon: LayoutGrid,
	},
];

const companyLinks = [
	{
		title: 'About Us',
		href: '/about',
		description: 'Learn more about our story and team',
		icon: Users,
	},
	{
		title: 'Case Studies',
		href: '/case-studies',
		description: 'Deep dives into our most successful projects',
		icon: BarChart,
	},
	{
		title: 'Customer Stories',
		href: '/customer-stories',
		description: 'See how we’ve helped our clients succeed',
		icon: Star,
	},
	{
		title: 'Partnerships',
		href: '/partnerships',
		icon: Handshake,
		description: 'Collaborate with us for mutual growth',
	},
];

const companyLinks2 = [
	{
		title: 'Terms of Service',
		href: '/terms',
		icon: FileText,
	},
	{
		title: 'Privacy Policy',
		href: '/privacy',
		icon: Shield,
	},
	{
		title: 'Refund Policy',
		href: '/refund',
		icon: RotateCcw,
	},
	{
		title: 'Blog',
		href: '/blog',
		icon: Leaf,
	},
	{
		title: 'Help Center',
		href: '/help-center',
		icon: HelpCircle,
	},
];

function useScroll(threshold) {
	const [scrolled, setScrolled] = React.useState(false);

	const onScroll = React.useCallback(() => {
		setScrolled(window.scrollY > threshold);
	}, [threshold]);

	React.useEffect(() => {
		window.addEventListener('scroll', onScroll);
		return () => window.removeEventListener('scroll', onScroll);
	}, [onScroll]);

	React.useEffect(() => {
		onScroll();
	}, [onScroll]);

	return scrolled;
}

export default Navbar;
