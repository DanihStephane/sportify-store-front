import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import { ProductServiceService } from '../service/product-service.service';
import { CategoryService } from '../service/service.category.service';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Product } from '../interfaces/product.interface';
import {Category} from '../interfaces/category.interface';
import {FormsModule} from '@angular/forms';
import {AuthService, User} from '../service/auth.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterModule,CommonModule,HttpClientModule,FormsModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  user: User | null = null;
  produits: Product[] = [];
  categories: Category[] = [];
  searchTerms = '';
  currentPage = 1;
  totalPages = 0;
  totalDocs = 0;

  // Pour éviter trop d'appels API
  private searchDebounce: any;

  constructor(
    private productService: ProductServiceService,
    private categoryService: CategoryService,
    private changeDetectorRef: ChangeDetectorRef,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadProducts();
    this.loadCategories();
    this.searchProducts();
    this.authService.user$.subscribe(
      user => this.user = user
    );
  }

  loadProducts() {
    this.productService.getProduits(this.currentPage).subscribe({
      next: (response) => {
        this.produits = response.data.data;
        this.totalPages = response.data.pagination.totalPages;
        this.totalDocs = response.data.pagination.totalDocs;
      },
      error: (error) => {
        console.error('Erreur de chargement', error);
      }
    });
  }

  changePage(page: number) {
    if (page > 0 && page <= this.totalPages) {
      this.currentPage = page;
      this.loadProducts();
      this.searchProducts();
    }
  }


  loadCategories() {
    this.categoryService.getCategory().subscribe({
      next: (response) => {
        console.log(response.data);
        this.categories = response.data;
      },
      error: (error) => {
        console.error('Erreur de chargement', error);
      }
    });
  }

  onSearchTermsChange() {
    // Annuler le précédent timeout
    if (this.searchDebounce) {
      clearTimeout(this.searchDebounce);
    }

    // Nouveau timeout pour éviter les appels API à chaque frappe
    this.searchDebounce = setTimeout(() => {
      this.currentPage = 1; // Réinitialiser à la première page
      this.searchProducts();
    }, 500); // 500ms de délai
  }

  searchProducts() {
    // Si pas de terme de recherche, ne rien faire
    if (!this.searchTerms.trim()) {
      this.produits = [];
      return;
    }

    this.productService.searchProducts(this.searchTerms, this.currentPage).subscribe({
      next: (response) => {
        this.produits = response.data.data;
        this.totalPages = response.data.pagination.totalPages;
        this.totalDocs = response.data.pagination.totalDocs;

        // Force update de la vue
        this.changeDetectorRef.detectChanges();
      },
      error: (error) => {
        console.error('Erreur de recherche', error);
        this.produits = [];
      }
    });
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
