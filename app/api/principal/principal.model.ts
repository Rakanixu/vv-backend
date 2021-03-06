export interface Principal {
    id?: number;
    name: string;
    domain: string;
    subdomain: string;
    description: string;
    design: string;
    primary_color: string;
    secondary_color: string;
    tags: string;
    design_notes: string;
    logo: string;
    background: string;
    default_image: string;
    created_at: number;
    enabled: boolean;
}
