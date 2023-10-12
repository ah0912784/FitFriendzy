import { NbAuthService, NbAuthOAuth2JWTToken } from '@nebular/auth';
import { Subject, BehaviorSubject } from 'rxjs';
import { map, takeUntil, share } from 'rxjs/operators';
import { Injectable, OnDestroy } from '@angular/core';

@Injectable()
export class ClaimService implements OnDestroy {
    static UserIdClaim: string = "http://schemas.microsoft.com/ws/2008/06/identity/claims/userdata";

    private currentUserId: string = null;

    // protected currentTenantId$ = new BehaviorSubject(this.currentTenantId);
    private destroy$: Subject<void> = new Subject<void>();

    constructor(private authService: NbAuthService) {
        this.authService.onTokenChange().pipe(takeUntil(this.destroy$))
            .subscribe((token: NbAuthOAuth2JWTToken) => {
                this.currentUserId = ClaimService.getCurrentUserIdFromToken(token);
                // this.currentTenantId$.next(this.currentTenantId);
            });
    }

    public getCurrentUserId() {
        return this.currentUserId;
    }

    ngOnDestroy() {
        this.destroy$.next();
        this.destroy$.complete();
    }

    private static getCurrentUserIdFromToken(token: NbAuthOAuth2JWTToken): string {
        const payload = token.getAccessTokenPayload();
        return !!(token.isValid() && payload) ?
            payload[ClaimService.UserIdClaim] : null;
    }
}
