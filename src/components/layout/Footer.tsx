
import { Github, Mail, Heart } from 'lucide-react';

export function Footer() {
    return (
        <footer className="bg-bg-secondary border-t border-bg-tertiary mt-auto">
            <div className="container mx-auto px-4 py-8">
                <div className="text-center space-y-4">
                    {/* Project Info */}
                    <div>
                        <p className="text-text-secondary text-sm">
                            © MLN111_SE1890-NET_Group6
                        </p>
                        <p className="text-text-primary font-semibold mt-1">
                            Project: Muôn Triết – Philosophy for Everyday Life
                        </p>
                    </div>

                    {/* Love Message */}
                    <div className="flex items-center justify-center gap-2 text-text-secondary text-sm">
                        <span>Được xây dựng với</span>
                        <Heart size={16} className="text-accent-red fill-accent-red" />
                        <span>bởi nhóm 6</span>
                    </div>

                    {/* Links */}
                    <div className="flex items-center justify-center gap-6">
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors"
                        >
                            <Github size={18} />
                            <span>GitHub</span>
                        </a>

                        <a
                            href="mailto:feedback@example.com"
                            className="flex items-center gap-2 text-text-secondary hover:text-accent-blue transition-colors"
                        >
                            <Mail size={18} />
                            <span>Feedback</span>
                        </a>

                        <a
                            href="#about"
                            className="text-text-secondary hover:text-accent-blue transition-colors"
                        >
                            About
                        </a>
                    </div>

                    {/* Divider */}
                    <div className="w-full h-px bg-bg-tertiary my-4" />

                    {/* Additional Info */}
                    <p className="text-xs text-text-tertiary">
                        Học triết học một cách nhẹ nhàng, thú vị mỗi ngày
                    </p>
                </div>
            </div>
        </footer>
    );
}
