export interface GitHubSearchResponse {
  total_count: number;
  incomplete_results: boolean;
  items: GitHubRepoItem[];
}

export interface GitHubRepoItem {
  id: number;
  // node_id: string;
  name: string;
  full_name: string;
  private: boolean;
  html_url: string;
  description: string | null;
  // fork: boolean;
  // url: string;
  created_at: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  open_issues_count: number;
  score: number;
  owner: {
    login: string;
    avatar_url?: string;
  };
}
