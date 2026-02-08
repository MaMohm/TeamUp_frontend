import { Link } from 'react-router-dom';
import { CheckCircle, Layout, Users, Shield, FolderKanban, MessageSquare, Calendar, Tags } from 'lucide-react';

const Landing = () => {
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <div className="relative isolate px-6 pt-14 lg:px-8 bg-gradient-to-br from-blue-50 to-indigo-100">
                <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center">
                    <div className="flex justify-center mb-6">
                        <FolderKanban className="h-16 w-16 text-blue-600" />
                    </div>
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
                        Manage Projects with <span className="text-blue-600">TeamUp</span>
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-gray-600">
                        A professional issue tracking system designed for teams to collaborate, track progress, and deliver results faster. Like Jira, but simpler.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link
                            to="/register"
                            className="rounded-lg bg-blue-600 px-6 py-3 text-sm font-semibold text-white shadow-lg hover:bg-blue-500 transition-all hover:scale-105 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        >
                            Get started for free
                        </Link>
                        <Link to="/login" className="text-sm font-semibold leading-6 text-gray-900 hover:text-blue-600 transition-colors">
                            Log in <span aria-hidden="true">→</span>
                        </Link>
                    </div>
                </div>
            </div>

            {/* Feature Section */}
            <div className="py-24 sm:py-32 bg-white">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl lg:text-center">
                        <h2 className="text-base font-semibold leading-7 text-blue-600">Professional Features</h2>
                        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                            Everything you need to manage your projects
                        </p>
                        <p className="mt-6 text-lg leading-8 text-gray-600">
                            TeamUp provides all the tools modern teams need to stay organized and productive.
                        </p>
                    </div>
                    <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
                        <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-4 lg:gap-y-16">
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <Layout className="h-6 w-6 text-white" />
                                    </div>
                                    Kanban Board
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Visualize your workflow with intuitive board and list views.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <MessageSquare className="h-6 w-6 text-white" />
                                    </div>
                                    Comments
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Collaborate with your team through ticket comments.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <Calendar className="h-6 w-6 text-white" />
                                    </div>
                                    Due Dates
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Set deadlines and track progress to stay on schedule.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <Tags className="h-6 w-6 text-white" />
                                    </div>
                                    Projects & Labels
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Organize tickets into projects with custom labels.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <Shield className="h-6 w-6 text-white" />
                                    </div>
                                    Secure Auth
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Industry-standard JWT authentication keeps your data safe.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <Users className="h-6 w-6 text-white" />
                                    </div>
                                    Role-Based Access
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Admin and User roles for fine-grained permissions.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <CheckCircle className="h-6 w-6 text-white" />
                                    </div>
                                    Priority Levels
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Mark issues as Low, Medium, or High priority.
                                </dd>
                            </div>
                            <div className="relative pl-16">
                                <dt className="text-base font-semibold leading-7 text-gray-900">
                                    <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600">
                                        <FolderKanban className="h-6 w-6 text-white" />
                                    </div>
                                    Search & Filter
                                </dt>
                                <dd className="mt-2 text-base leading-7 text-gray-600">
                                    Quickly find tickets with powerful search and filters.
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="bg-blue-600 py-16">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                        Ready to boost your team's productivity?
                    </h2>
                    <p className="mt-4 text-lg text-blue-100">
                        Start tracking issues in seconds. No credit card required.
                    </p>
                    <div className="mt-8">
                        <Link
                            to="/register"
                            className="rounded-lg bg-white px-8 py-4 text-sm font-semibold text-blue-600 shadow-lg hover:bg-gray-100 transition-all hover:scale-105"
                        >
                            Start for free →
                        </Link>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-gray-900 py-8">
                <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
                    <p className="text-gray-400 text-sm">
                        © 2026 TeamUp. Built for portfolio demonstration.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Landing;
